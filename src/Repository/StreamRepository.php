<?php

namespace App\Repository;

use App\Entity\Stream;
use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Uid\Uuid;
use Psr\Log\LoggerInterface;
use Doctrine\ORM\EntityManagerInterface;



/**
 * @method Stream|null find($id, $lockMode = null, $lockVersion = null)
 * @method Stream|null findOneBy(array $criteria, array $orderBy = null)
 * @method Stream[]    findAll()
 * @method Stream[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class StreamRepository extends ServiceEntityRepository
{
    private $logger;
    private $em;
    public function __construct(ManagerRegistry $registry, LoggerInterface $logger, EntityManagerInterface $em)
    {
        parent::__construct($registry, Stream::class);
        $this->logger = $logger;
        $this->em = $em;
    }

    public function createStream($userID)
    {
        if($userID == null)
            throw new Exception("Invalid userID!");
        
        $streamer = $this->em->getRepository(User::class)->find($userID);
        $newStream = new Stream();
        $newStream->setStreamer($streamer);
        
        $this->em->persist($newStream);
        $this->em->flush();
        return $newStream;
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

}
