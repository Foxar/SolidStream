<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

use App\Entity\Chat;
use App\Entity\Stream;

class ChatController extends AbstractController
{
    /**
     * @Route("/api/createStreamChat", name="createStreamChat", methods={"POST"})
     */
    public function createStreamChat(Request $request): Response
    {
        //Move most of this stuff to chatrepository soon.
        $chat = new Chat();
        $stream = $this->getDoctrine()
                        ->getRepository(Stream::class)
                        ->find($request->request->get('streamID'));
        $chat->setStream($stream);
        $manager = $this->getDoctrine()->getManager();
        $manager->persist($chat);
        $manager->flush($chat);

        return new JsonResponse(
            [   "chatID"=>$chat->getId(),
                "stream id"=>$chat->getStream()->getId()],
            Response::HTTP_CREATED);
    }

    /**
     * @Route("/api/getStreamChat", name="getStreamChat", methods={"GET"})
     */
    public function getStreamChat(Request $request): Response
    {
        $chat = $this->getDoctrine()->getRepository(Chat::class)->find($request->request->get('streamID'));
        return new JsonResponse($chat);

    }
}
