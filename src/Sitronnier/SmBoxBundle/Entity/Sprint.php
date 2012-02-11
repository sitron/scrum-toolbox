<?php

namespace Sitronnier\SmBoxBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Sitronnier\SmboxBundle\Entity\Project;
use Doctrine\Common\Collections\ArrayCollection;

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
     * @var float $man_days
     */
    private $man_days;

    /**
     * @var Project $project
     */
    private $project;

    /**
     * @var string $status
     */
    private $status;

    private $days;

    /**
     * @var date $start_date
     */
    private $start_date;

    /**
     * @var date $end_date
     */
    private $end_date;

    public function __construct()
    {
        $this->days = new ArrayCollection();
    }

    public function toJson()
    {
        $jsondays = array();
        foreach ($this->days as $day) {
            $jsondays[] = $day->toJson();
        }

        $json = array(
            'id' => $this->id,
            'index' => $this->index,
            'nbMD' => $this->man_days,
            'nbBV' => $this->business_value,
            'nbSP' => $this->story_points,
            'startDate' => $this->start_date,
            'endDate' => $this->end_date,
            'days' => $jsondays,
        );

        return $json;
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
     * Set man_days
     *
     * @param float $man_days
     */
    public function setManDays($manDays)
    {
        $this->man_days= $manDays;
    }

    /**
     * Get man_days
     *
     * @return float 
     */
    public function getManDays()
    {
        return $this->man_days;
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

    public function setStatus($status)
    {
        $this->status = $status;
    }

    public function getStatus()
    {
        return $this->status;
    }

    public function setDays($days)
    {
        $this->days = $days;
    }

    public function getDays()
    {
        return $this->days;
    }

    public function addDay($day)
    {
        $this->days[] = $day;
    }

    /**
     * Set start date
     * @param date $date
     */
    public function setStartDate($date)
    {
        $this->start_date = $date;
    }

    /**
     * Get start date
     * @return date
     */
    public function getStartDate()
    {
        return $this->start_date;
    }

    /**
     * Set end date
     * @param date $date
     */
    public function setEndDate($date)
    {
        $this->end_date = $date;
    }

    /**
     * Get end date
     * @return date
     */
    public function getEndDate()
    {
        return $this->end_date;
    }

    public function getHash($secret)
    {
        if(!$this->getId()) {
            return '';
        }
        return hash('sha256', $this->getId() . $secret);
    }

    public function __toString()
    {
        return (string) $this->index;
    }
}
