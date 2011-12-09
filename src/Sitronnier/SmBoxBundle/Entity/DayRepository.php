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
}

