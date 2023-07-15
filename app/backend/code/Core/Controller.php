<?php

namespace Core;


abstract class Controller 
{
    const SUCCESS = 'success';
    const ERROR = 'error';

    public function return_json($arr, $message, $status)
    {
        if($status){
            $response = array_merge($arr ?? [] , [
                'status' => self::SUCCESS, 
                'message' => $message ?? 'Request successfully processed.'
            ]);
        } else{
            $response = array_merge($arr ?? [], [
                'status' => self::ERROR,
                'message' => $message ?? 'Something went wrong.'
            ]);
        }
        echo json_encode($response);
        exit();
    }

    public function getPostData()
    {
        $rest_json = file_get_contents('php://input');
        return json_decode($rest_json, true);
    }
}
