<?php
namespace App\Controllers;

use Core\Request;
use Core\Controller;
use App\Model\User;
use Core\Jwt;

class Register extends Controller
{
    /**
     * @var Jwt
     */
    private $jwt;

    /**
     * @var User
     */
    private $user;

    public function __construct()
    {
        $this->jwt = new Jwt();
        $this->user = new User();
    }

    public function register()
    {
        $postData = $this->getPostData();
        $user = [
            'firstname' => $postData['firstname'],
            'lastname' => $postData['lastname'],
            'password' => md5($postData['password']),
            'email' => $postData['email'],
            'birth_date' => date('Y-m-d'),
        ];
        if ($user_id = $this->user->create($user)) {
            $user['id'] = $user_id;
            $headers = ['alg' => 'HS256', 'typ' => 'JWT'];
            $payload = ['user' => $user];
            $jwtToken = $this->jwt->generate_jwt($headers, $payload);
            $this->return_json(['status' => $jwtToken]);
        }
    }
}