<?php
namespace Sitronnier\SmBoxBundle\Entity;

use Doctrine\ORM\EntityRepository;
use Sitronnier\SmBoxBundle\Entity\Sprint;

class SprintRepository extends EntityRepository
{
    public function findOneWithOrderedDays($id)
    {
        $query = $this->sprintWithOrderedDays($id)->getQuery();

        try {
            return $query->getSingleResult();
        } catch (\Doctrine\ORM\NoResultException $e) {
            return null;
        }
    }

    public function findOneWithOrderedDaysAndOwner($id, $owner)
    {
        $qb = $this->sprintWithOrderedDays($id)
            ->join('s.project', 'p')
            ->andWhere('p.owner = :owner')
            ->setParameter('owner', $owner);
        $query = $qb->getQuery();

        try {
            return $query->getSingleResult();
        } catch (\Doctrine\ORM\NoResultException $e) {
            return null;
        }
    }

    public function findAllForProject($project)
    {
        $query = $this->getEntityManager()
            ->createQuery('
                SELECT s FROM SitronnierSmBoxBundle:Sprint s
                WHERE s.project = :project
                ORDER BY s.index'
            )->setParameter('project', $project);

        try {
            return $query->getResult();
        } catch (\Doctrine\ORM\NoResultException $e) {
            return null;
        }
    }

    public function findAllOwned($owner)
    {
        $qb = $this->getEntityManager()->createQueryBuilder()
            ->from('SitronnierSmBoxBundle:Sprint', 's')
            ->select('s')
            ->join('s.project', 'p')
            ->where('p.owner = :owner')
            ->orderBy('p.title', 'ASC')
            ->addOrderBy('s.index', 'DESC')
            ->setParameter('owner', $owner);

        $query = $qb->getQuery();

        try {
            return $query->getResult();
        } catch (\Doctrine\ORM\NoResultException $e) {
            return null;
        }
    }

    protected function sprintWithOrderedDays($id)
    {
        $qb = $this->getEntityManager()->createQueryBuilder()
            ->from('SitronnierSmBoxBundle:Sprint', 's')
            ->select('s, d')
            ->join('s.days', 'd')
            ->where('s.id = :id')
            ->orderBy('d.date', 'ASC')
            ->setParameter('id', $id);
        return $qb;
    }
}

