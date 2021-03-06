<?php

namespace Sitronnier\SmBoxBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilder;

class DayType extends AbstractType
{
    private $project;

    // TODO: find a better way to pass the project
    public function __construct($project = null)
    {
        if (!is_null($project)) {
            $this->project = $project;
        }
    }

    public function buildForm(FormBuilder $builder, array $options, $project = null)
    {
        $project = $this->project;

        $builder
            ->add('date', null, array(
                'attr' => array('class' => 'day-date'),
                'format' => 'dd-MM-yyyy',
            ))
            ->add('nb_hours_estimate', null, array(
                'label' => 'day_form.label.nb_hours_estimate'
            ))
            ->add('nb_hours', null, array(
                'label' => 'day_form.label.nb_hours'
            ))
            ->add('nb_business_value', null, array(
                'label' => 'day_form.label.nb_business_value'
            ))
            ->add('nb_story_points', null, array(
                'label' => 'day_form.label.nb_story_points'
            ))
            ->add('visible')
            ->add('sprint',
              'entity',
               array(
                     'class'=>'Sitronnier\SmBoxBundle\Entity\Sprint',
                     'property'=>'index',
                     'multiple' => false,
                     'query_builder' => function (\Doctrine\ORM\EntityRepository $repository) use ($project)
                     {
                         return $repository->createQueryBuilder('s')
                                ->where('s.project = ?1')
                                ->orderBy('s.index', 'DESC')
                                ->setParameter(1, $project);
                     }
            ))
        ;
    }

    public function getName()
    {
        return 'sitronnier_smboxbundle_daytype';
    }
}
