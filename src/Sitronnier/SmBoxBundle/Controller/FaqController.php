<?php

namespace Sitronnier\SmBoxBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class FaqController extends Controller
{
    public function indexAction()
    {
        return $this->render('SitronnierSmBoxBundle:Faq:index.html.twig', array());
    }
}

