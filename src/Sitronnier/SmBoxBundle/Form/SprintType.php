<?php

namespace Sitronnier\SmBoxBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilder;

class SprintType extends AbstractType
{
    public function buildForm(FormBuilder $builder, array $options)
    {
        $builder
            ->add('project')
            ->add('index')
            ->add('man_days')
            ->add('story_points')
            ->add('business_value')
        ;
    }

    public function getName()
    {
        return 'sitronnier_smboxbundle_sprinttype';
    }
}
