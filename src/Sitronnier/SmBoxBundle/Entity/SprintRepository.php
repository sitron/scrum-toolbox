<?php
namespace Sitronnier\SmBoxBundle\Entity;

use Doctrine\ORM\EntityRepository;

class SprintRepository extends EntityRepository
{
    public function findOneWithOrderedDays($id)
    {
        $query = $this->getEntityManager()
            ->createQuery('
                SELECT s, d FROM SitronnierSmBoxBundle:Sprint s
                JOIN s.days d
                WHERE s.id = :id
                ORDER BY d.date'
            )->setParameter('id', $id);

            try {
                return $query->getSingleResult();
            } catch (\Doctrine\ORM\NoResultException $e) {
                return null;
            }
    }
}

