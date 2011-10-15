<?php
namespace Sitronnier\MyUserBundle\Entity;

use FOS\UserBundle\Entity\User as BaseUser;
use Doctrine\ORM\Mapping as ORM;
use SitronnierSmBox\Entity\Project;

/**
 * @ORM\Entity
 */
class MyUser extends BaseUser
{
    /**
    * @ORM\id
    * @ORM\Column(type="integer")
    * @ORM\generatedValue(strategy="AUTO")
    */
    protected $id;

    protected $projects;

    public function __construct()
    {
        parent::__construct();
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

    public function addProject($project)
    {
        $this->projects[] = $project;
    }

    public function getProjects()
    {
        return $this->projects;
    }

    public function setProjects($projects)
    {
        foreach ($projects as $item) {
            $this->addProject($item);
        }
    }
}
