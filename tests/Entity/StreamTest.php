<?php

namespace App\Tests\Entity;

use PHPUnit\Framework\TestCase;
use App\Entity\Stream;
use App\Entity\User;
use App\Entity\Chat;

class StreamTest extends TestCase
{
    public function testStreamSettingAndGettingChat(): void
    {
        $stream = new Stream();
        $chat = new Chat();
        $stream->setChat($chat);
        $streamchat = $stream->getChat();
        $this->assertEquals($chat,$streamchat);
    }

    public function testStreamSettingAndGettingStreamer(): void
    {
        $stream = new Stream();
        $user = new User();
        $stream->setStreamer($user);
        $streamer = $stream->getStreamer();
        $this->assertEquals($user,$streamer);
    }
}
