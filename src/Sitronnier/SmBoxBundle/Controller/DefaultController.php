<?php

namespace Sitronnier\SmBoxBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;


class DefaultController extends Controller
{
    
    public function indexAction()
    {
        return $this->render('SitronnierSmBoxBundle:Default:index.html.twig', array());
    }

    public function breadcrumbAction($project = null, $sprint = null, $day = null)
    {
        $em = $this->getDoctrine()->getEntityManager();

        $items = array();

        if (isset($day)) {
            $dayObj = $em->getRepository('SitronnierSmBoxBundle:Day')->findOneBy(array('id' => $day));
            $sprintObj = $dayObj->getSprint();
            $projectObj = $sprintObj->getProject();
            $items[] = array('title' => $projectObj->getTitle(), 'link' => $this->getProjectLink($projectObj->getId()));
            $items[] = array('title' => 'Sprint ' . $sprintObj->getIndex(), 'link' => $this->getSprintLink($sprintObj->getId()));
        }
        else if (isset($sprint)) {
            $sprintObj = $em->getRepository('SitronnierSmBoxBundle:Sprint')->findOneBy(array('id' => $sprint));
            $items[] = array('title' => $sprintObj->getProject()->getTitle(), 'link' => $this->getProjectLink($sprintObj->getProject()->getId()));
        }
        else {}

        return $this->render('SitronnierSmBoxBundle:Default:breadcrumb.html.twig', array(
            'items' => $items,
        ));
    }

    private function getProjectLink($project_id)
    {
        $link = $this->get('router')->generate('project_show', array('id' => $project_id));
        return $link;
    }

    private function getSprintLink($sprint_id)
    {
        $link = $this->get('router')->generate('sprint_show', array('id' => $sprint_id));
        return $link;
    }

    private function getDayLink($day_id)
    {
        $link = $this->get('router')->generate('day_show', array('id' => $day_id));
        return $link;
    }
}

