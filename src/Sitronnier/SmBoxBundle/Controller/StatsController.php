<?php

namespace Sitronnier\SmBoxBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

use Sitronnier\SmBoxBundle\Entity\Sprint;
use Sitronnier\SmBoxBundle\Entity\Project;
use Sitronnier\SmBoxBundle\Entity\Day;

/**
 * Stats controller.
 *
 */
class StatsController extends Controller
{
    /**
     * Stats for a sprint
     *
     */
    public function sprintAction($sprint)
    {
        $em = $this->getDoctrine()->getEntityManager();

        $sprint_entity = $em->getRepository('SitronnierSmBoxBundle:Sprint')->find($sprint);
        $project_entity = $sprint_entity->getProject();
        $days = $sprint_entity->getDays();

        return $this->render('SitronnierSmBoxBundle:Stats:sprint.html.twig', array(
            'days' => $days,
            'sprint' => $sprint_entity,
            'project' => $project_entity,
            'project_sprints' => $project_entity->getSprints(),
        ));
    }
}

