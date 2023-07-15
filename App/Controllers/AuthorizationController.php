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

    public function __construct()
    {
        $this->jwt = new Jwt();
        $this->user = new User();
    }

    /**
     * Login user.
     *
     * @return array
     * @access  public
     */
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

            $this->return_json(
                ['userToken' => $jwtToken],
                'You have successfully logged in',
                true
            );
        } else {
            $this->return_json(
                null,
                'Failed to log in, check if your login/password is correct',
                false
            );
        }
    }

    /**
     * Register user.
     *
     * @return array
     * @access  public
     */
    public function register()
    {
        $requestData = $this->getPostData();
        $user = [
            'firstname' => $requestData['firstname'],
            'lastname' => $requestData['lastname'],
            'password' => md5($requestData['password']),
            'email' => $requestData['email'],
            'birth_date' => date(
                'Y-m-d',
                strtotime($requestData['birth_date'])
            ),
        ];
        if ($this->validator->isContainsEmptyValues($user)) {
            $this->return_json(null, 'Specify a valid login/password', false);
        }
        if ($user_id = $this->user->create($user)) {
            $user['id'] = $user_id;
            $headers = ['alg' => 'HS256', 'typ' => 'JWT'];
            $payload = ['user' => $user];
            $jwtToken = $this->jwt->generate_jwt($headers, $payload);

            $this->return_json(
                ['userToken' => $jwtToken],
                'You have successfully created a new account',
                true
            );
        } else {
            $this->return_json(
                null,
                'There is already a user with this email address',
                false
            );
        }
    }
}
