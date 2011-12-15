<?php
namespace Sitronnier\SmBoxBundle\Entity;

use Doctrine\ORM\EntityRepository;
use Sitronnier\SmBoxBundle\Entity\Project;
use Sitronnier\SmBoxBundle\Entity\Day;
use Sitronnier\SmBoxBundle\Entity\Sprint;

class DayRepository extends EntityRepository
{
    public function findOneWithOwner($id, $owner)
    {
        $qb = $this->getEntityManager()->createQueryBuilder()
            ->from('SitronnierSmBoxBundle:Day', 'd')
            ->select('d, s, p')
            ->join('d.sprint', 's')
            ->join('s.project', 'p')
            ->where('d.id = :id')
            ->andWhere('p.owner = :owner')
            ->setParameter('owner', $owner)
            ->setParameter('id', $id);

        $query = $qb->getQuery();

        try {
            return $query->getSingleResult();
        } catch (\Doctrine\ORM\NoResultException $e) {
            return null;
        }
    }

    public function findAllForSprint($sprint_id, $owner)
    {
        $qb = $this->findAllByOwner($owner)
            ->andWhere('s.id = :sprint')
            ->setParameter('sprint', $sprint_id);

        $query = $qb->getQuery();

        try {
            return $query->getResult();
        } catch (\Doctrine\ORM\NoResultException $e) {
            return null;
        }
    }

    public function findAllForOwner($owner)
    {
        $qb = $this->findAllByOwner($owner);
        $query = $qb->getQuery();

        try {
            return $query->getResult();
        } catch (\Doctrine\ORM\NoResultException $e) {
            return null;
        }
    }

    protected function findAllByOwner($owner)
    {
        $qb = $this->getEntityManager()->createQueryBuilder()
            ->from('SitronnierSmBoxBundle:Project', 'p')
            ->select('p.id as project_id, p.title, s.id as sprint_id, s.index, d.id as day_id, d.nb_hours, d.nb_business_value, d.nb_story_points, d.date')
            ->where('p.owner = :owner')
            ->join('p.sprints', 's')
            ->join('s.days', 'd')
            // TODO: isn't there a way to group days in different projects and sprints?
//            ->groupBy('p.id')
//            ->addGroupBy('s.index')
//            ->addGroupBy('d.date, d.nb_hours, d.nb_business_value, d.nb_story_points, d.id, p.title')
            ->orderBy('p.id', 'DESC')
            ->addOrderBy('s.index', 'DESC')
            ->addOrderBy('d.date', 'DESC')
            ->setParameter('owner', $owner);

        return $qb;
    }
}

