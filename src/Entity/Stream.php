<?php

namespace App\Entity;

use App\Repository\StreamRepository;
use Doctrine\ORM\Mapping as ORM;

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
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="guid", unique=true)
     * @Assert\Uuid
     */
    private $StreamKey;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getStreamKey(): ?string
    {
        return $this->StreamKey;
    }

    public function setStreamKey(string $StreamKey): self
    {
        $this->StreamKey = $StreamKey;

        return $this;
    }
}
