<?php

namespace Sitronnier\SmBoxBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilder;

class ProjectType extends AbstractType
{
    public function buildForm(FormBuilder $builder, array $options)
    {
        $builder
            ->add('title')
            ->add('owner')
        ;
    }

    public function getName()
    {
        return 'sitronnier_smboxbundle_projecttype';
    }
}
