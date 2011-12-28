<?php

namespace Sitronnier\SmBoxBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilder;

class ProjectType extends AbstractType
{
    public function buildForm(FormBuilder $builder, array $options)
    {
        $builder
            ->add('title', null, array(
                'label' => 'Project\'s name'
            ))
            ->add('zebra_url', null, array(
                'label' => 'Url in Zebra (optional)',
                'required' => false,
                'attr' => array('class' => 'large'),
            ))
            ->add('jira_url', null, array(
                'label' => 'Url in Jira (optional)',
                'required' => false,
                'attr' => array('class' => 'large'),
            ))
        ;
    }

    public function getName()
    {
        return 'sitronnier_smboxbundle_projecttype';
    }
}
