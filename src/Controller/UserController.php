<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Psr\Log\LoggerInterface;
use App\Service\UserService;


class UserController extends AbstractController
{
    /**
     * @Route("/secureapi/currentUser", name="user")
     */
    public function currentUser(UserService $userService): Response
    {
        $user = $userService->getCurrentUser();
        if($user == null)
            return new Response("Failed to retrieve current user!",Response::HTTP_NOT_FOUND);
        else
            return new JsonResponse([
                "username"=>$user->getUsername(),
                "id"=>$user->getId()
                ]);
    }
}
