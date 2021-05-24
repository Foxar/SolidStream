<?php

namespace App\Tests\Entity;

use PHPUnit\Framework\TestCase;
use App\Entity\User;
use App\Entity\ChatMessage;

class UserTest extends TestCase
{
    public function testAddGetChatMessages()
    {
        $user = new User();
        $chatMessage1 = new ChatMessage();
        $chatMessage2 = new ChatMessage();
        $user->addchatMessages($chatMessage1);
        $user->addchatMessages($chatMessage2);
        $returnedChatMessages = $user->getchatMessages();

        $this->assertContainsOnlyInstancesOf(ChatMessage::class,$returnedChatMessages);
        $this->assertCount(2,$returnedChatMessages);
        $this->assertContains($chatMessage1,$returnedChatMessages);
        $this->assertContains($chatMessage2,$returnedChatMessages);

    }
}
