<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class HomeController extends AbstractController
{
    /**
     * @Route("/", name="home")
     */
    public function index(): Response
    {
        return $this->render('index.html.twig');
    }

    //A catch-all for all calls to unknown API URI's
    public function unknownApiEndpoint(): Response
    {
        return new Response("Unknown API endpoint reached!",Response::HTTP_NOT_FOUND);
    }
}
