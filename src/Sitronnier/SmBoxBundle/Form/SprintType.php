<?php

namespace Sitronnier\SmBoxBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilder;

class SprintType extends AbstractType
{
    public function buildForm(FormBuilder $builder, array $options)
    {
        $builder
            ->add('index')
            ->add('story_points')
            ->add('business_value')
            ->add('man_days')
            ->add('project')
        ;
    }

    public function getName()
    {
        return 'sitronnier_smboxbundle_sprinttype';
    }
}
