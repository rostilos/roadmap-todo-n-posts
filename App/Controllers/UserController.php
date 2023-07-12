<?php
namespace App\Controllers;

use Core\Request;
use Core\Controller;
use App\Model\User as UserModel;
use Core\Jwt;
use Core\Validator;

class UserController extends Controller
{
    /**
     * @var Jwt
     */
    private $jwt;

    /**
     * @var UserModel
     */
    private $userModel;

    /**
     * @var Validator
     */
    private $validator;
    

    public function __construct() {
        $this->jwt = new Jwt();
        $this->userModel = new UserModel();
        $this->validator = new Validator();
    }

    public function update()
    {
        $bearer_token = $this->jwt->get_bearer_token();
        $is_jwt_valid = isset($bearer_token) ? $this->jwt->is_jwt_valid($bearer_token) : false;

        if(!$is_jwt_valid){
            return false;
        }
        $userId = $this->jwt->getPayload($bearer_token)->user->id;

        $postData = $this->getPostData();
        $userData = [
            'firstname' => $postData['firstname'],
            'lastname' => $postData['lastname'],
            'birth_date' => date('Y-m-d', strtotime($postData['birth_date']))
        ];
        if(isset($postData['password']) && isset($postData['current_password'])){
            $userData['password'] = md5($postData['password']);
            $userData['current_password'] = md5($postData['current_password']);
        }
        if($this->validator->isContainsEmptyValues($userData)){
            return false;
        }
        if ($updatedUserData = $this->userModel->update($userData, $userId)) {
            $headers = ['alg' => 'HS256', 'typ' => 'JWT'];
            $payload = ['user' => $updatedUserData];
            $jwtToken = $this->jwt->generate_jwt($headers, $payload);
            $this->return_json(['status' => $jwtToken]);
        }
    }

    public function updatePassword()
    {
        $bearer_token = $this->jwt->get_bearer_token();
        $is_jwt_valid = isset($bearer_token) ? $this->jwt->is_jwt_valid($bearer_token) : false;

        if(!$is_jwt_valid){
            return false;
        }
        $userId = $this->jwt->getPayload($bearer_token)->user->id;

        $postData = $this->getPostData();

        if(isset($postData['new_password']) && isset($postData['current_password'])){
            $passwordData['new_password'] = md5($postData['new_password']);
            $passwordData['current_password'] = md5($postData['current_password']);

            if ($passwordData = $this->userModel->updateUserPassword($passwordData, $userId)) {
                return true;
            }
        }
        return false;
        
    }

    public function getAllUsersData()
    {
        $bearer_token = $this->jwt->get_bearer_token();
        $is_jwt_valid = isset($bearer_token) ? $this->jwt->is_jwt_valid($bearer_token) : false;
        if(!$is_jwt_valid){
            return false;
        }
        $postData = $this->getPostData();
        $page = 1;
        $limit = 5;
        if(isset($postData['page'])){
            $page = $postData['page'];
        }
        if(isset($postData['limit'])){
            $limit = $postData['limit'];
        }
        $offset = ($page-1) * $limit;
        
        $users = $this->userModel->getAll($page,$offset,$limit);
        $this->return_json($users);
    }
}
