<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

use App\Entity\ChatMessage;
use App\Entity\Chat;

class ChatMessageController extends AbstractController
{

    /**
     * @Route("/api/postMessageTo", name="postMessageTo", methods={"POST"})
     */
    public function sendMessage(Request $request): Response
    {
        $repo = $this->getDoctrine()->getRepository(ChatMessage::class);
        try{
            $repo->addMessageToChat($request->request->get('chatID'),
                                    $request->request->get('message'));
        }catch(\Exception $e){
            return new JsonResponse(
                [   "message"=>"Failed to create chat message!"
                    "error"=>$e->getMessage()],
                Response::HTTP_BAD_REQUEST);
        }
        return new JsonResponse("Posted message!",Response::HTTP_CREATED);

    }
    /**
     * @Route("/api/getChatMessages", name="getChatMessages", methods={"GET"})
     */
    public function getChatMessages(Request $request): Response
    {
        try{
            $messages = $this->getDoctrine()
                            ->getRepository(ChatMessage::class)
                            ->getLastChatMessages($request->request->get('chatID'), 10);
        }catch(\Exception $e){
            return new JsonResponse(
                [   "message"=>"Failed to get chat messages!"
                    "error"=>$e->getMessage()],
                Response::HTTP_BAD_REQUEST);
        }
        return new JsonResponse(json_encode($messages));
    }

}
