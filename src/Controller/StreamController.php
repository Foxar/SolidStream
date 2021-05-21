<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Psr\Log\LoggerInterface;
use App\Entity\Stream;
use Symfony\Component\Uid\Uuid;
use App\Service\UserService;

use Symfony\Component\Console\Output\OutputInterface;


class StreamController extends AbstractController
{
    /**
     * @Route("/api/randomstreams", name="randomstreams")
     */
    public function listStreams(): Response
    {
        $streams = $this->getDoctrine()->getRepository(Stream::class)->getRandom(5);
        if(!$streams)
        {
            return new Response("Couldn't find any streams!", Response::HTTP_NOT_FOUND);
        }
        else
        {
            return new JsonResponse(["streams"=>$streams]);
        }
    }
    /**
     * @Route("/api/deletestream", name="deletestream", methods={"POST"})
     */
    public function deleteStream(Request $request): Response
    {
        //Try validating nginx-rtmp request's 'name', which is the stream key
        try{
            $id = Uuid::fromString($request->request->get('name'));
        }
        catch(\Throwable $t){
            return new Response("Invalid Stream UUID requested!", Response::HTTP_BAD_REQUEST);
        }

        //Find the stream by the stream key, which is also it's id
        $stream = $this->getDoctrine()->getRepository(Stream::class)->find($id);

        //Return if not found
        if($stream == null)
        {
            return new Response("Failed to find stream '" . $id . "' !", Response::HTTP_NOT_FOUND);
        }
        else
        {
            $this->getDoctrine()->getManager()->remove($stream);
            $this->getDoctrine()->getManager()->flush();
            return new Response("Deleted stream " . $id);
        }
    }
    /**
     * @Route("/secureapi/createstream", name="createstream", methods={"POST"})
     */
    public function createStream(Request $request, UserService $userService): Response
    {
        //Get current user
        $user = $userService->getCurrentUser();
        if($user == null)
            return new Response("Failed to authorize user!",Response::HTTP_UNAUTHORIZED);

        //Get the manager for Stream entity
        $streamManager = $this->getDoctrine()->getManager();

        //Create new object of Stream entity
        $stream = new Stream();
        $stream->setStreamer($user);
        $streamManager->persist($stream);
        $streamManager->flush();
    
        return new JsonResponse(["message"=>"Created stream.","id" => $stream->getId()]);
    }


    /**
     * @Route("/api/checkstream", name="checkstream", methods={"POST"})
     */
    public function checkstream(Request $request, LoggerInterface $logger): Response
    {
        try{
            $id = Uuid::fromString($request->request->get('name'));
            $stream = $this->getDoctrine()->getRepository(Stream::class)->find($id);
        }
        catch(\Throwable $t){
            return new Response("Invalid stream key!",Response::HTTP_FORBIDDEN);
        }
        if($stream == null)
        {
            return new Response("Stream not found!",Response::HTTP_NOT_FOUND);
        }
        else
            return new Response("Valid stream key!",Response::HTTP_OK);
    }
}
