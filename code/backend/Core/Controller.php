<?php

namespace Core;


abstract class Controller {
    public function return_json($arr)
    {
        echo json_encode($arr);
        exit();
    }

    public function getPostData()
    {
        $rest_json = file_get_contents('php://input');
        return json_decode($rest_json, true);
    }
}
