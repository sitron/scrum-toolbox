<?php

namespace Sitronnier\SmBoxBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilder;

class SprintType extends AbstractType
{
    private $owner;

    public function __construct($owner = null)
    {
        $this->owner = $owner;
    }

    public function buildForm(FormBuilder $builder, array $options)
    {
        $owner = $this->owner;

        $builder
            ->add('project',
              'entity',
               array(
                     'class'=>'Sitronnier\SmBoxBundle\Entity\Project',
                     'property'=>'title',
                     'multiple' => false,
                     'query_builder' => function (\Doctrine\ORM\EntityRepository $repository) use ($owner)
                     {
                         return $repository->createQueryBuilder('p')
                                ->where('p.owner = ?1')
                                ->orderBy('p.title', 'ASC')
                                ->setParameter(1, $owner);
                     }
            ))
            ->add('index')
            ->add('man_days', null, array(
                'label' => 'sprint_form.label.md',
            ))
            ->add('story_points', null, array(
                'label' => 'sprint_form.label.sp',
            ))
            ->add('business_value', null, array(
                'label' => 'sprint_form.label.bv',
            ))
            ->add('start_date', 'date', array(
                'required' => false,
                'widget' => 'choice',
                'format' => 'dd-MM-yyyy',
                'label' => 'sprint_form.label.start_date',
            ))
            ->add('end_date', 'date', array(
                'required' => false,
                'widget' => 'choice',
                'format' => 'dd-MM-yyyy',
                'label' => 'sprint_form.label.end_date',
            ))
        ;
    }

    public function getName()
    {
        return 'sitronnier_smboxbundle_sprinttype';
    }
}
