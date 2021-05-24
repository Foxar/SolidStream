<?php

namespace App\Entity;

use App\Repository\StreamRepository;
use Doctrine\ORM\Mapping as ORM;

//UUID
use Symfony\Bridge\Doctrine\IdGenerator\UuidV4Generator;
use Symfony\Component\Uid\Uuid;



//Validation
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=StreamRepository::class)
 * @UniqueEntity("StreamKey")
 */
class Stream
{
     /**
     * @ORM\Id
     * @ORM\Column(type="uuid", unique=true)
     * @ORM\GeneratedValue(strategy="CUSTOM")
     * @ORM\CustomIdGenerator(class=UuidV4Generator::class)
     */
    private $id;

    /**
     * @ORM\OneToOne(targetEntity=User::class, inversedBy="stream", cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $Streamer;

    /**
     * @ORM\OneToOne(targetEntity=Chat::class, mappedBy="stream", cascade={"persist", "remove"})
     */
    private $chat;

    public function getId(): ?Uuid
    {
        return $this->id;
    }

    public function getStreamer(): ?User
    {
        return $this->Streamer;
    }

    public function setStreamer(User $Streamer): self
    {
        $this->Streamer = $Streamer;

        return $this;
    }

    public function getChat(): ?Chat
    {
        return $this->chat;
    }

    public function setChat(Chat $chat): self
    {
        // set the owning side of the relation if necessary
        if ($chat->getStream() !== $this) {
            $chat->setStream($this);
        }

        $this->chat = $chat;

        return $this;
    }
}
