<?php

namespace Sitronnier\SmBoxBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Sitronnier\SmBoxBundle\Entity\Day
 */
class Day
{
    /**
     * @var integer $id
     */
    private $id;

    /**
     * @var float $nb hours
     */
    private $nb_hours;

    /**
     * @var float $nb hours estimate
     */
    private $nb_hours_estimate;

    /**
     * @var float $nb business value
     */
    private $nb_business_value;

    /**
     * @var float $nb story points
     */
    private $nb_story_points;

    /**
     * @var Sprint $sprint id
     */
    private $sprint;

    /**
     * @var date $date
     */
    private $date;

    /**
     * @var boolean $visible
     */
    private $visible = true;

    public function toJson()
    {
        $json = array(
            'id' => $this->id,
            'nbHours' => $this->nb_hours,
            'nbHoursEstimate' => $this->nb_hours_estimate,
            'nbBV' => $this->nb_business_value,
            'nbSP' => $this->nb_story_points,
            'date' => $this->date->format('D d/m'),
            'visible' => $this->visible,
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
     * Set nb hours
     *
     * @param float $nbHours
     */
    public function setNbHours($nbHours)
    {
        $this->nb_hours = $nbHours;
    }

    /**
     * Get nb hours
     *
     * @return float 
     */
    public function getNbHours()
    {
        return $this->nb_hours;
    }

    /**
     * Set nb hours estimate
     *
     * @param float $nbHours
     */
    public function setNbHoursEstimate($nbHours)
    {
        $this->nb_hours_estimate = $nbHours;
    }

    /**
     * Get nb hours estimate
     *
     * @return float 
     */
    public function getNbHoursEstimate()
    {
        return $this->nb_hours_estimate;
    }

    /**
     * Set nb business value
     *
     * @param float $nbBusinessValue
     */
    public function setNbBusinessValue($nbBusinessValue)
    {
        $this->nb_business_value = $nbBusinessValue;
    }

    /**
     * Get nb business value
     *
     * @return float 
     */
    public function getNbBusinessValue()
    {
        return $this->nb_business_value;
    }

    /**
     * Set nb story points
     *
     * @param float $nbStoryPoints
     */
    public function setNbStoryPoints($nbStoryPoints)
    {
        $this->nb_story_points = $nbStoryPoints;
    }

    /**
     * Get nb story points
     *
     * @return float 
     */
    public function getNbStoryPoints()
    {
        return $this->nb_story_points;
    }

    /**
     * Set sprint id
     *
     * @param object $sprintId
     */
    public function setSprint($sprint)
    {
        $this->sprint = $sprint;
    }

    /**
     * Get sprint id
     *
     * @return object 
     */
    public function getSprint()
    {
        return $this->sprint;
    }

    /**
     * Set date
     *
     * @param date $date
     */
    public function setDate($date)
    {
        $this->date = $date;
    }

    /**
     * Get date
     *
     * @return date
     */
    public function getDate()
    {
        return $this->date;
    }

    /**
     * Set visible
     * @param boolean $visible
     */
    public function setVisible($visible)
    {
        $this->visible = $visible;
    }

    /**
     * Get visible
     * @return visible
     */
    public function getVisible()
    {
        return $this->visible;
    }
}
