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
     * @var string $zebra_url
     */
    private $zebra_url;

    /**
     * @var string $jira_url
     */
    private $jira_url;


    public function __construct()
    {
        $this->sprints = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    public function setId($id)
    {
        $this->id = $id;
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

    /**
     * Set zebra_url
     *
     * @param string $zebraUrl
     */
    public function setZebraUrl($zebraUrl)
    {
        $this->zebra_url = $zebraUrl;
    }

    /**
     * Get zebra_url
     *
     * @return string
     */
    public function getZebraUrl()
    {
        return $this->zebra_url;
    }

    /**
     * Set jira_url
     *
     * @param string $jiraUrl
     */
    public function setJiraUrl($jiraUrl)
    {
        $this->jira_url = $jiraUrl;
    }

    /**
     * Get jira_url
     *
     * @return string
     */
    public function getJiraUrl()
    {
        return $this->jira_url;
    }

    public function __toString()
    {
        return $this->title;
    }
}
