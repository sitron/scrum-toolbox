<?php

namespace Sitronnier\SmBoxBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilder;

class DayType extends AbstractType
{
    public function buildForm(FormBuilder $builder, array $options)
    {
        $builder
            ->add('date')
            ->add('nb_hours')
            ->add('nb_business_value')
            ->add('nb_story_points')
            ->add('sprint')
        ;
    }

    public function getName()
    {
        return 'sitronnier_smboxbundle_daytype';
    }
}
