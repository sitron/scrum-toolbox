<?php

namespace Sitronnier\SmBoxBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;

use Sitronnier\SmBoxBundle\Entity\Sprint;
use Sitronnier\SmBoxBundle\Entity\Project;
use Sitronnier\SmBoxBundle\Entity\Day;

/**
 * Stats controller.
 */
class StatsController extends Controller
{
    /**
     * Project page
     */
    public function projectAction($project_id) {
        $em = $this->getDoctrine()->getEntityManager();

        $securityContext = $this->get('security.context');
        $user = $securityContext->getToken()->getUser();

        $project = $em->getRepository('SitronnierSmBoxBundle:Project')->findOneBy(array('id' => $project_id, 'owner' => $user->getId()));
        if (is_null($project)) {
            throw new AccessDeniedException();
        }
        $sprints = $this->getDoctrine()->getRepository('SitronnierSmBoxBundle:Sprint')->findAllForProject($project);

        return $this->render('SitronnierSmBoxBundle:Stats:project.html.twig', array(
            'project' => $project,
            'sprints' => $sprints,
            'lastSprint' => $sprints[count($sprints) - 1],
        ));
    }

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
}

