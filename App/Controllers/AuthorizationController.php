<?php
namespace App\Controllers;

use Core\Request;
use Core\Controller;
use App\Model\User;
use Core\Jwt;

class AuthorizationController extends Controller
{
    /**
     * @var Jwt
     */
    private $jwt;

    /**
     * @var User
     */
    private $user;

    public function __construct() {
        $this->jwt = new Jwt();
        $this->user = new User();
    }

    public function login()
    {
        $requestData = $this->getPostData();
        if (
            $user = $this->user->login(
                $requestData['email'],
                md5($requestData['password'])
            )
        ) {
            $headers = ['alg' => 'HS256', 'typ' => 'JWT'];
            $payload = ['user' => $user];
            $jwtToken = $this->jwt->generate_jwt($headers, $payload);
            $this->return_json(['status' => $jwtToken]);
        }
    }

    public function register()
    {
        $requestData = $this->getPostData();
        $user = [
            'firstname' => $requestData['firstname'],
            'lastname' => $requestData['lastname'],
            'password' => md5($requestData['password']),
            'email' => $requestData['email'],
            'birth_date' => date('Y-m-d', strtotime($requestData['birth_date'])),
        ];
        // TODO: refactoring
        if($containsEmpty = in_array("", $user)){
            return false;
        }
        if ($user_id = $this->user->create($user)) {
            $user['id'] = $user_id;
            $headers = ['alg' => 'HS256', 'typ' => 'JWT'];
            $payload = ['user' => $user];
            $jwtToken = $this->jwt->generate_jwt($headers, $payload);
            $this->return_json(['status' => $jwtToken]);
        }
    }
}
