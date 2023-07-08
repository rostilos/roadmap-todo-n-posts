<?php
namespace App\Controllers;

use Core\Request;
use Core\Controller;
use App\Model\UserNote;
use Core\Jwt;

class Notes extends Controller
{
    /**
     * @var Jwt
     */
    private $jwt;

    /**
     * @var UserNote
     */
    private $userNote;

    public function __construct() {
        $this->jwt = new Jwt();
        $this->noteModel = new UserNote();
    }

    public function user_notes()
    {
        $bearer_token = $this->jwt->get_bearer_token();
        $is_jwt_valid = isset($bearer_token) ? $this->jwt->is_jwt_valid($bearer_token) : false;
        $userId = $this->jwt->getPayload($bearer_token)->user->id;
        if (!$userId) {
            return false;
        }
        $userNotes = $this->noteModel->getAll($userId);
        $this->return_json($userNotes);
    }

    public function create_note()
    {
        $bearer_token = $this->jwt->get_bearer_token();
        $is_jwt_valid = isset($bearer_token) ? $this->jwt->is_jwt_valid($bearer_token) : false;
        $userId = $this->jwt->getPayload($bearer_token)->user->id;

        $postData = $this->getPostData();
        $noteData = [
            'user_id' => $userId,
            'title' => $postData['title'],
            'content' => $postData['content'],
            'priority' => $postData['priority'],
            'created_at' => date('Y-m-d'),
        ];
        $noteId = $this->noteModel->create($noteData);
        $this->return_json($noteId);
    }

    public function update_note()
    {
        $bearer_token = $this->jwt->get_bearer_token();
        $is_jwt_valid = isset($bearer_token) ? $this->jwt->is_jwt_valid($bearer_token) : false;

        if(!$is_jwt_valid){
            return false;
        }

        $userId = $this->jwt->getPayload($bearer_token)->user->id;
        $postData = $this->getPostData();
        $noteData = [
            'id' => $postData['id'],
            'title' => $postData['title'],
            'content' => $postData['content'],
            'priority' => $postData['priority']
        ];
        $noteId = $this->noteModel->update($noteData, $userId);
        $this->return_json($noteId);
    }

    public function delete_note()
    {
        $bearer_token = $this->jwt->get_bearer_token();
        $is_jwt_valid = isset($bearer_token) ? $this->jwt->is_jwt_valid($bearer_token) : false;
        if(!$is_jwt_valid){
            return false;
        }
        $userId = $this->jwt->getPayload($bearer_token)->user->id;
        $postData = $this->getPostData();
        $this->noteModel->delete($postData['id'], $userId);
    }


}
