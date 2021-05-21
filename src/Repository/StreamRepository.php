<?php

namespace App\Repository;

use App\Entity\Stream;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\Normalizer\UidNormalizer;
use Symfony\Component\Uid\Uuid;
use Psr\Log\LoggerInterface;


/**
 * @method Stream|null find($id, $lockMode = null, $lockVersion = null)
 * @method Stream|null findOneBy(array $criteria, array $orderBy = null)
 * @method Stream[]    findAll()
 * @method Stream[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class StreamRepository extends ServiceEntityRepository
{
    private $logger;
    public function __construct(ManagerRegistry $registry, LoggerInterface $logger)
    {
        parent::__construct($registry, Stream::class);
        $this->logger = $logger;
    }

    //Returns a JSON array
    public function getRandom($count=5)
    {
        $arr = $this->createQueryBuilder('s')
        ->orderBy('s.id', 'ASC')
        ->setMaxResults($count)
        ->getQuery()
        ->getResult();

        $barr = array();
        foreach($arr as &$a)
        {
            $b = ["string_id" =>"".$a->getId()->__toString(),
                  "streamer" => [
                      "id" => $a->getStreamer()->getId(),
                      "username" => $a->getStreamer()->getUsername()
            ]];
            
            array_push($barr,$b);
        }
        return(json_encode($barr));
    }

    // /**
    //  * @return Stream[] Returns an array of Stream objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('s.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Stream
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
