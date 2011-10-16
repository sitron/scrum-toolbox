<?php

namespace Sitronnier\SmBoxBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Sitronnier\SmboxBundle\Entity\Project;

/**
 * Sitronnier\SmBoxBundle\Entity\Sprint
 */
class Sprint
{
    /**
     * @var integer $id
     */
    private $id;

    /**
     * @var integer $index
     */
    private $index;

    /**
     * @var float $story_points
     */
    private $story_points;

    /**
     * @var float $business_value
     */
    private $business_value;

    /**
     * @var Project $project
     */
    private $project;


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
     * Set index
     *
     * @param integer $index
     */
    public function setIndex($index)
    {
        $this->index = $index;
    }

    /**
     * Get index
     *
     * @return integer 
     */
    public function getIndex()
    {
        return $this->index;
    }

    /**
     * Set story_points
     *
     * @param float $storyPoints
     */
    public function setStoryPoints($storyPoints)
    {
        $this->story_points = $storyPoints;
    }

    /**
     * Get story_points
     *
     * @return float 
     */
    public function getStoryPoints()
    {
        return $this->story_points;
    }

    /**
     * Set business_value
     *
     * @param float $businessValue
     */
    public function setBusinessValue($businessValue)
    {
        $this->business_value = $businessValue;
    }

    /**
     * Get business_value
     *
     * @return float 
     */
    public function getBusinessValue()
    {
        return $this->business_value;
    }

    /**
     * Set project
     *
     * @param Project $project
     */
    public function setProject($project)
    {
        $this->project = $project;
    }

    /**
     * Get project
     *
     * @return Project
     */
    public function getProject()
    {
        return $this->project;
    }

    public function __toString()
    {
        return $this->title;
    }
}
