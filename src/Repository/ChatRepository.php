<?php

namespace App\Repository;

use App\Entity\Chat;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Chat|null find($id, $lockMode = null, $lockVersion = null)
 * @method Chat|null findOneBy(array $criteria, array $orderBy = null)
 * @method Chat[]    findAll()
 * @method Chat[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ChatRepository extends ServiceEntityRepository
{
    private $em
    public function __construct(ManagerRegistry $registry, EntityManager $em)
    {
        parent::__construct($registry, Chat::class);
        $this->em = $em;
    }

    public function createChat($streamID)
    {
        if($streamID == null)
            throw new \Exception('Attempted to create chat with null streamID!');
        
        $newChat = new Chat();
        $stream = $this->em->getRepository(Stream::class)->find($streamID);
        $newChat->setStream($stream);

        $this->em->persist($newChat);
        $this->em->flush();
        return $newChat;
    }

}
