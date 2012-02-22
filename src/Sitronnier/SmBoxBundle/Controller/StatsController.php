<?php

namespace Sitronnier\SmBoxBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;

use Sitronnier\SmBoxBundle\Entity\Sprint;
use Sitronnier\SmBoxBundle\Entity\Project;
use Sitronnier\SmBoxBundle\Entity\Day;
use Sitronnier\SmBoxBundle\Form\DayType;

/**
 * Stats controller.
 */
class StatsController extends Controller
{
    /**
     * Sprint graph include
     */
    public function sprintAction($sprint_id) {
        $em = $this->getDoctrine()->getEntityManager();

        $sprint = $em->getRepository('SitronnierSmBoxBundle:Sprint')->find($sprint_id);

        return $this->render('SitronnierSmBoxBundle:Stats:sprint.html.twig', array(
            'sprint' => $sprint,
        ));
    }

    /**
     * Stats for a sprint
     */
    public function sprintDataAction($sprint)
    {
        //$em = $this->getDoctrine()->getEntityManager();

        $sprint_entity = $this->getDoctrine()->getRepository('SitronnierSmBoxBundle:Sprint')->findOneWithOrderedDays($sprint);
        $sprint_json = $sprint_entity->toJson();

        return new Response(
            json_encode(array('sprint' => $sprint_json)),
            200,
            array('Content-Type' => 'application/json')
        );
    }

    /**
     * Edits an existing Day entity.
     */
    public function updateDayAction(Request $request)
    {
        $securityContext = $this->get('security.context');
        $user = $securityContext->getToken()->getUser();

        $em = $this->getDoctrine()->getEntityManager();

        $jsonData = $request->getContent();
        if (!$jsonData) {
            return new Response(json_encode(array('error' => 'no day found')), 400);
        }
        $newDay = json_decode($jsonData);

        $day = $this->getDoctrine()->getRepository('SitronnierSmBoxBundle:Day')->findOneWithOwner($newDay->id, $user->getId());

        if (!$day) {
            return new Response(json_encode(array('error' => 'no day found')), 400);
        }

        $day->setNbHours($newDay->nbHours);
        $day->setNbStoryPoints($newDay->nbSP);
        $day->setNbBusinessValue($newDay->nbBV);
        $day->setCreatedBy('user');

        $em->persist($day);
        $em->flush();

        return new Response(json_encode($day->toJson()), 200);
    }
}

