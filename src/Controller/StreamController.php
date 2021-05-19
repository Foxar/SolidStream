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


use Symfony\Component\Console\Output\OutputInterface;


class StreamController extends AbstractController
{
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
     * @Route("/api/createstream", name="createstream", methods={"POST"})
     */
    public function createStream(Request $request): Response
    {
        //Get the manager for Stream entity
        $streamManager = $this->getDoctrine()->getManager();

        //Create new object of Stream entity
        $stream = new Stream();
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
            return Response("Invalid stream key!",Response::HTTP_FORBIDDEN);
        }
        return new Response("Valid stream key!",Response::HTTP_OK);
    }
}
