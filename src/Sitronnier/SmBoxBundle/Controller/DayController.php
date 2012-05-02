<?php

namespace Sitronnier\SmBoxBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

use Sitronnier\SmBoxBundle\Entity\Day;
use Sitronnier\SmBoxBundle\Entity\Project;
use Sitronnier\SmBoxBundle\Form\DayType;

/**
 * Day controller.
 *
 */
class DayController extends Controller
{
    /**
     * Lists all Day entities.
     *
     */
    public function indexAction()
    {
        $request = $this->get('request');
        $securityContext = $this->get('security.context');
        $user = $securityContext->getToken()->getUser();

        $em = $this->getDoctrine()->getEntityManager();

        if ($request->query->get('sprint')) {
            $sprint_id = $request->query->get('sprint');
            $days = $this->getDoctrine()->getRepository('SitronnierSmBoxBundle:Day')->findAllForSprint($sprint_id, $user->getId());
        } else {
            $days = $this->getDoctrine()->getRepository('SitronnierSmBoxBundle:Day')->findAllForOwner($user->getId());
        }

        // TODO find a better way to do this
//        $splitted = array();
//        foreach($days as $day) {
//            if (!isset($splitted[$day['project_id']])) {
//                $splitted[$day['project_id']] = array(); 
//            } 
//            if (!isset($splitted[$day['project_id']][$day['sprint_id']])) {
//                $splitted[$day['project_id']][$day['sprint_id']] = array();
//            }
//            $splitted[$day['project_id']][$day['sprint_id']][] = $day;
//        }
        //var_dump($days); exit;

        return $this->render('SitronnierSmBoxBundle:Day:index.html.twig', array(
            'days' => $days,
        ));
    }

    /**
     * Finds and displays a Day entity.
     *
     */
    public function showAction($id)
    {
        $em = $this->getDoctrine()->getEntityManager();

        $entity = $em->getRepository('SitronnierSmBoxBundle:Day')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Day entity.');
        }

        $deleteForm = $this->createDeleteForm($id);

        return $this->render('SitronnierSmBoxBundle:Day:show.html.twig', array(
            'entity'      => $entity,
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Displays a form to create a new Day entity.
     *
     */
    public function newAction()
    {
        $request = $this->get('request');

        $day = new Day();
        $em = $this->getDoctrine()->getEntityManager();

        if ($request->query->get('sprint')) {
            $sprint_id = $request->query->get('sprint');
            $sprint = $em->getRepository('SitronnierSmBoxBundle:Sprint')->find($sprint_id);
            $project = $sprint->getProject();
            $day->setSprint($sprint);
        } else if ($request->query->get('project')) {
            $project_id = $request->query->get('project');
            $project = $em->getRepository('SitronnierSmBoxBundle:Project')->find($project_id);
        } else {
            throw $this->createNotFoundException('Either a project or a sprint must be specified');
        }
        $day->setDate(new \DateTime);
        $form = $this->createForm(new DayType($project), $day);

        return $this->render('SitronnierSmBoxBundle:Day:new.html.twig', array(
            'entity' => $day,
            'form'   => $form->createView(),
            'project'=> $project,
        ));
    }

    /**
     * Creates a new Day entity.
     *
     */
    public function createAction()
    {
        $entity  = new Day();
        $request = $this->getRequest();

        $project_id = $request->query->get('project');
        $em = $this->getDoctrine()->getEntityManager();
        $project = $em->getRepository('SitronnierSmBoxBundle:Project')->find($project_id);

        $form    = $this->createForm(new DayType($project), $entity);
        $form->bindRequest($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getEntityManager();
            $em->persist($entity);
            $em->flush();

            return $this->redirect($this->generateUrl('sprint_show', array('id' => $entity->getSprint()->getId())));
            
        }

        return $this->render('SitronnierSmBoxBundle:Day:new.html.twig', array(
            'entity' => $entity,
            'form'   => $form->createView()
        ));
    }

    /**
     * Displays a form to edit an existing Day entity.
     *
     */
    public function editAction($id)
    {
        $securityContext = $this->get('security.context');
        $user = $securityContext->getToken()->getUser();

        $day = $this->getDoctrine()->getRepository('SitronnierSmBoxBundle:Day')->findOneWithOwner($id, $user->getId());
        $project = $day->getSprint()->getProject();

        if (!$day) {
            throw $this->createNotFoundException('Unable to find Day entity.');
        }

        $editForm = $this->createForm(new DayType($day->getSprint()->getProject()), $day);
        $deleteForm = $this->createDeleteForm($id);

        return $this->render('SitronnierSmBoxBundle:Day:edit.html.twig', array(
            'entity'      => $day,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
            'project'     => $project,
        ));
    }

    /**
     * Edits an existing Day entity.
     *
     */
    public function updateAction($id)
    {
        $securityContext = $this->get('security.context');
        $user = $securityContext->getToken()->getUser();

        $em = $this->getDoctrine()->getEntityManager();

        $day = $this->getDoctrine()->getRepository('SitronnierSmBoxBundle:Day')->findOneWithOwner($id, $user->getId());
        $project = $day->getSprint()->getProject();

        if (!$day) {
            throw $this->createNotFoundException('Unable to find Day entity.');
        }

        $editForm   = $this->createForm(new DayType($day->getSprint()->getProject()), $day);
        $deleteForm = $this->createDeleteForm($id);

        $request = $this->getRequest();

        $editForm->bindRequest($request);

        if ($editForm->isValid()) {
            $em->persist($day);
            $em->flush();

            return $this->redirect($this->generateUrl('day_show', array('id' => $id)));
        }

        return $this->render('SitronnierSmBoxBundle:Day:edit.html.twig', array(
            'entity'      => $day,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
            'project'     => $project,
        ));
    }

    /**
     * Deletes a Day entity.
     *
     */
    public function deleteAction($id)
    {
        $form = $this->createDeleteForm($id);
        $request = $this->getRequest();

        $form->bindRequest($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getEntityManager();
            $entity = $em->getRepository('SitronnierSmBoxBundle:Day')->find($id);

            if (!$entity) {
                throw $this->createNotFoundException('Unable to find Day entity.');
            }

            $em->remove($entity);
            $em->flush();
        }

        return $this->redirect($this->generateUrl('day'));
    }

    private function createDeleteForm($id)
    {
        return $this->createFormBuilder(array('id' => $id))
            ->add('id', 'hidden')
            ->getForm()
        ;
    }
}
