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
            ->add('man_days')
            ->add('story_points')
            ->add('business_value')
            ->add('start_date', 'date', array(
                'required' => false,
                'widget' => 'single_text',
                'format' => 'dd-MM-yyyy',
                'label' => 'start_date_label',
            ))
            ->add('end_date', 'date', array(
                'required' => false,
                'widget' => 'single_text',
                'format' => 'dd-MM-yyyy',
                'label' => 'end_date_label',
            ))
        ;
    }

    public function getName()
    {
        return 'sitronnier_smboxbundle_sprinttype';
    }
}
