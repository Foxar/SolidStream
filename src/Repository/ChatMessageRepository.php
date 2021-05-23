<?php

namespace App\Repository;

use App\Entity\ChatMessage;
use App\Entity\Chat;
use App\Entity\Stream;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\ORM\EntityManagerInterface;


/**
 * @method ChatMessage|null find($id, $lockMode = null, $lockVersion = null)
 * @method ChatMessage|null findOneBy(array $criteria, array $orderBy = null)
 * @method ChatMessage[]    findAll()
 * @method ChatMessage[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ChatMessageRepository extends ServiceEntityRepository
{
    private $em;
    public function __construct(ManagerRegistry $registry, EntityManagerInterface $em)
    {
        parent::__construct($registry, ChatMessage::class);
        $this->em = $em;
    }

    //This function will add the message to a given stream's chat.
    public function addMessageToStream($streamID, $msg)
    {
        $chat = $this->em->getRepository(Stream::class)->find($streamID)->getChat();
        $this->addMessageToChat($chat->getId(),$msg);
    }

    //This method will add a message to given chat.
    public function addMessageToChat($chatID, $msg)
    {
        if($chatID == null)
            throw new Exception('Attempted to create message with null chatID!');
        $chat = $this->em->getRepository(Chat::class)->find($chatID);
        if($chat == null)
            throw new Exception('Attempted to create message with non-existant chat!');
        

        $chatMessage = new ChatMessage();
        $chatMessage->setText($msg);
        $chat->addMessage($chatMessage);

        $this->em->persist($chatMessage);
        $this->em->flush();
    }

    /**
     * @return ChatMessage[] Returns an array of ChatMessage objects
     */
    public function getLastChatMessages($chatID, $count=10)
    {
        if($chatID == null)
            throw new Exception('Attempted to get messages with invalid chat ID!');
        
        return $this->createQueryBuilder('c')
            ->andWhere('c.chat = :chatID')
            ->setParameter('chatID', $chatID)
            ->setMaxResults($count)
            ->orderBy('c.id', 'ASC')
            ->getQuery()
            ->getResult();
    }
}
