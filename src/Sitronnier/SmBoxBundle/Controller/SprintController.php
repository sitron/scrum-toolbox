<?php

namespace Sitronnier\SmBoxBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

use Sitronnier\SmBoxBundle\Entity\Sprint;
use Sitronnier\SmBoxBundle\Form\SprintType;

/**
 * Sprint controller.
 *
 */
class SprintController extends Controller
{
    /**
     * Lists all Sprint entities.
     *
     */
    public function indexAction()
    {
        $request = $this->get('request');
        $securityContext = $this->get('security.context');
        $user = $securityContext->getToken()->getUser();

        $em = $this->getDoctrine()->getEntityManager();

        if ($request->query->get('project')) {
            $project_id = $request->query->get('project');
            $project = $em->getRepository('SitronnierSmBoxBundle:Project')->findOneBy(array('id' => $project_id, 'owner' => $user->getId()));
            $sprints = $em->getRepository('SitronnierSmBoxBundle:Sprint')->findAllBy(array('project' => $project));
        } else {
            $sprints = $em->getRepository('SitronnierSmBoxBundle:Sprint')->findAll();
        }

        return $this->render('SitronnierSmBoxBundle:Sprint:index.html.twig', array(
            'entities' => $sprints,
        ));
    }

    /**
     * Finds and displays a Sprint entity.
     *
     */
    public function showAction($id)
    {
        $em = $this->getDoctrine()->getEntityManager();

        $sprint = $em->getRepository('SitronnierSmBoxBundle:Sprint')->find($id);

        if (!$sprint) {
            throw $this->createNotFoundException('Unable to find Sprint entity.');
        }

        $deleteForm = $this->createDeleteForm($id);

        $jsSprint = json_encode($sprint->toJson());

        return $this->render('SitronnierSmBoxBundle:Sprint:show.html.twig', array(
            'entity'      => $sprint,
            'delete_form' => $deleteForm->createView(),
            'jsSprint'    => $jsSprint,
        ));
    }

    /**
     * Displays a form to create a new Sprint entity.
     *
     */
    public function newAction()
    {
        $request = $this->get('request');

        $em = $this->getDoctrine()->getEntityManager();

        $securityContext = $this->get('security.context');
        $user = $securityContext->getToken()->getUser();

        $sprint = new Sprint();

        if ($request->query->get('project')) {
            $project_id = $request->query->get('project');
            $project = $em->getRepository('SitronnierSmBoxBundle:Project')->findOneBy(array('id' => $project_id, 'owner' => $user->getId()));
            if (!$project) {
                throw $this->createNotFoundException('Unable to find Project entity.');
            }
            $nb_sprints = count($project->getSprints());
            $sprint->setProject($project);
        };

        $sprint->setIndex(isset($nb_sprints) ? $nb_sprints + 1 : 1);
        $form = $this->createForm(new SprintType($user->getId()), $sprint);

        return $this->render('SitronnierSmBoxBundle:Sprint:new.html.twig', array(
            'entity' => $sprint,
            'form'   => $form->createView()
        ));
    }

    /**
     * Creates a new Sprint entity.
     *
     */
    public function createAction()
    {
        $securityContext = $this->get('security.context');
        $user = $securityContext->getToken()->getUser();

        $entity  = new Sprint();
        $request = $this->getRequest();
        $form    = $this->createForm(new SprintType($user->getId()), $entity);
        $form->bindRequest($request);

        if ($form->isValid()) {
            $entity->setStatus('CREATED');
            $em = $this->getDoctrine()->getEntityManager();
            $em->persist($entity);
            $em->flush();

            return $this->redirect($this->generateUrl('sprint_show', array('id' => $entity->getId())));
            
        }

        return $this->render('SitronnierSmBoxBundle:Sprint:new.html.twig', array(
            'entity' => $entity,
            'form'   => $form->createView()
        ));
    }

    /**
     * Displays a form to edit an existing Sprint entity.
     *
     */
    public function editAction($id)
    {
        $em = $this->getDoctrine()->getEntityManager();

        $entity = $em->getRepository('SitronnierSmBoxBundle:Sprint')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Sprint entity.');
        }

        $editForm = $this->createForm(new SprintType(), $entity);
        $deleteForm = $this->createDeleteForm($id);

        return $this->render('SitronnierSmBoxBundle:Sprint:edit.html.twig', array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Edits an existing Sprint entity.
     *
     */
    public function updateAction($id)
    {
        $em = $this->getDoctrine()->getEntityManager();

        $entity = $em->getRepository('SitronnierSmBoxBundle:Sprint')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Sprint entity.');
        }

        $editForm   = $this->createForm(new SprintType(), $entity);
        $deleteForm = $this->createDeleteForm($id);

        $request = $this->getRequest();

        $editForm->bindRequest($request);

        if ($editForm->isValid()) {
            $em->persist($entity);
            $em->flush();

            return $this->redirect($this->generateUrl('sprint_edit', array('id' => $id)));
        }

        return $this->render('SitronnierSmBoxBundle:Sprint:edit.html.twig', array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Deletes a Sprint entity.
     *
     */
    public function deleteAction($id)
    {
        $form = $this->createDeleteForm($id);
        $request = $this->getRequest();

        $form->bindRequest($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getEntityManager();
            $entity = $em->getRepository('SitronnierSmBoxBundle:Sprint')->find($id);

            if (!$entity) {
                throw $this->createNotFoundException('Unable to find Sprint entity.');
            }

            $em->remove($entity);
            $em->flush();
        }

        return $this->redirect($this->generateUrl('sprint'));
    }

    private function createDeleteForm($id)
    {
        return $this->createFormBuilder(array('id' => $id))
            ->add('id', 'hidden')
            ->getForm()
        ;
    }

    public function printAction($id)
    {
        $securityContext = $this->get('security.context');
        $user = $securityContext->getToken()->getUser();

        $sprint = $this->getDoctrine()->getRepository('SitronnierSmBoxBundle:Sprint')->findOneWithOrderedDaysAndOwner($id, $user->getId());
        $project = $sprint->getProject();

        if (!$sprint) {
            throw $this->createNotFoundException('Unable to find Sprint entity.');
        }

        $jsSprint = json_encode($sprint->toJson());

        return $this->render('SitronnierSmBoxBundle:Sprint:print.html.twig', array(
            'project' => $project,
            'sprint' => $sprint,
            'jsSprint' => $jsSprint,
        ));
    }
}
