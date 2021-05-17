<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Psr\Log\LoggerInterface;


class StreamController extends AbstractController
{
    /**
     * @Route("/api/checkstream", name="checkstream", methods={"POST"})
     */
    public function index(Request $request, LoggerInterface $logger): Response
    {

        //For now, the function returns the stream key provided to it by nginx-rtmp.
        //TO-DO: Integrate it with key-checking system to authorize or unauthorize the stream,
        //depending on if correct key was provided.
        $logger->info("Stream key: " . $request->request->get('name'));
        return new Response(implode($request->request->all()));
    }
}
