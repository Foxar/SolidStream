<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Psr\Log\LoggerInterface;
use App\Entity\Stream;
use Symfony\Component\Uid\Uuid;



class StreamController extends AbstractController
{
    /**
     * @Route("/api/checkstream", name="checkstream", methods={"POST"})
     */
    public function checkstream(Request $request): Response
    {
        try{
            $streamKeyUUID = Uuid::fromString($request->request->get('stream_key'));
            $streams = $this->
            getDoctrine()->
            getRepository(Stream::class)->
            findOneBy(['StreamKey' => $streamKeyUUID]);
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
