<?php

namespace Sitronnier\SmBoxBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;

use Sitronnier\SmBoxBundle\Entity\Sprint;
use Sitronnier\SmBoxBundle\Entity\Project;
use Sitronnier\SmBoxBundle\Entity\Day;

/**
 * Stats controller.
 *
 */
class StatsController extends Controller
{
    public function projectAction($project_id) {
        $em = $this->getDoctrine()->getEntityManager();

        $project = $em->getRepository('SitronnierSmBoxBundle:Project')->find($project_id);

        return $this->render('SitronnierSmBoxBundle:Stats:project.html.twig', array(
            'project' => $project,
            'sprints' => $project->getSprints(),
        ));
    }

    /**
     * Stats for a sprint
     *
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

//        $serializer = $this->container->get('serializer');
//        $sprinttest = new Sprint();
//        $sprinttest->setIndex(1);
//        $test = $serializer->serialize($sprint_entity, 'json');

//        $response = new Response(json_encode(array(
//            'days' => $days,
//            'sprint' => $sprint_entity,
//            'project' => $project_entity,
//            'project_sprints' => $project_entity->getSprints(),
//        )));
//        $response->headers->set('Content-Type', 'application/json');
//        return $this->render('SitronnierSmBoxBundle:Stats:sprint.json.twig', array('days' => $days), $response); 
//
//        return $response;

//        return $this->render('SitronnierSmBoxBundle:Stats:sprint.html.twig', array(
//            'days' => $days,
//            'sprint' => $sprint_entity,
//            'project' => $project_entity,
//            'project_sprints' => $project_entity->getSprints(),
//        ));
    }
}

