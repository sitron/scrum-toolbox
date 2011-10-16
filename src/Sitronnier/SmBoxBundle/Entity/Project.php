<?php

namespace Sitronnier\SmBoxBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Sitronnier\MyUserBundle\Entity\MyUser;

/**
 * Sitronnier\SmBoxBundle\Entity\Project
 */
class Project
{
    /**
     * @var integer $id
     */
    private $id;

    /**
     * @var MyUser $owner
     */
    private $owner;

    /**
     * @var string $title
     */
    private $title;

    private $sprints;


    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set owner
     *
     * @param MyUser $owner
     */
    public function setOwner($owner)
    {
        $this->owner = $owner;
    }

    /**
     * Get owner
     *
     * @return MyUser 
     */
    public function getOwner()
    {
        return $this->owner;
    }

    /**
     * Set title
     *
     * @param string $title
     */
    public function setTitle($title)
    {
        $this->title = $title;
    }

    /**
     * Get title
     *
     * @return string 
     */
    public function getTitle()
    {
        return $this->title;
    }

    public function addSprint($sprint)
    {
        $this->sprints[] = $sprint;
    }

    public function getSprints()
    {
        return $this->sprints;
    }

    public function setSprints($sprints)
    {
        foreach ($sprints as $item) {
            $this->addSprint($item);
        }
    }

    public function __toString()
    {
        return $this->title;
    }
}
