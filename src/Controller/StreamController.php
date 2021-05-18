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



class StreamController extends AbstractController
{
    /**
     * @Route("/api/deletestream", name="deletestream", methods={"POST"})
     */
    public function deleteStream(Request $request): Response
    {
        $streamDoctrine = $this->getDoctrine();
        $streamManager = $streamDoctrine->getManager();

        try{
            $id = Uuid::fromString($request->request->get('id'));
        }
        catch(\InvalidArgumentException $ex){
            return new Response("Invalid Stream UUID requested!", Response::HTTP_BAD_REQUEST);
        }
        $stream = $streamDoctrine->getRepository(Stream::class)->find($id);
        if($stream == null)
        {
            return new Response("Failed to find stream '" . $id . "' !", Response::HTTP_NOT_FOUND);
        }
        else
        {
            $streamManager->remove($stream);
            $streamManager->flush();
            return new Response("Deleted stream " . $id);
        }
    }
    /**
     * @Route("/api/createstream", name="createstream", methods={"POST"})
     */
    public function createStream(Request $request, LoggerInterface $logger): Response
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
    public function checkstream(Request $request): Response
    {
        try{
            $UUID = Uuid::fromString($request->request->get('id'));
            $streams = $this->
            getDoctrine()->
            getRepository(Stream::class)->
            findOneBy(['id' => $UUID]);
        }
        catch(\InvalidArgumentException $ex){
            $streams = NULL;
        }
        
        if($streams == NULL)
        {
            $response = new Response("Invalid stream key!",Response::HTTP_FORBIDDEN);
        }
        else
        {
            $response = new Response("Valid stream key!",Response::HTTP_OK);
        }
        return $response;
        
    }
}
