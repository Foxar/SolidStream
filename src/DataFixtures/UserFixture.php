<?php

namespace App\DataFixtures;

use App\Entity\User;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class UserFixture extends Fixture
{
    private $passwordHasher;

    public function __construct(UserPasswordEncoderInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }
    public function load(ObjectManager $manager)
    {
        $this->makeDummyUser("John Garcin", "garcia1234",$manager);
        $this->makeDummyUser("WOPR", "joshua",$manager);
        $this->makeDummyUser("Gordon Freeman", "crowbar1234",$manager);

        $manager->flush();
    }

    public function makeDummyUser($username, $password, $manager)
    {
        $user = new User();
        $user->setUsername($username);
        $user->setPassword($this->passwordHasher->encodePassword($user,$password));
        $manager->persist($user);
    }
}
