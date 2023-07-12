<?php
namespace App\Controllers;

use Core\Request;
use Core\Controller;
use App\Model\Note;
use Core\Jwt;

class NotesController extends Controller
{
    /**
     * @var Jwt
     */
    private $jwt;

    /**
     * @var Note
     */
    private $userNote;

    public function __construct() {
        $this->jwt = new Jwt();
        $this->noteModel = new Note();
    }

    public function user_notes()
    {
        $bearer_token = $this->jwt->get_bearer_token();
        $is_jwt_valid = isset($bearer_token) ? $this->jwt->is_jwt_valid($bearer_token) : false;
        $userId = $this->jwt->getPayload($bearer_token)->user->id;
        if (!$userId) {
            return false;
        }
        $userNotes = $this->noteModel->getUserNotes($userId);
        $this->return_json($userNotes);
    }

    public function create()
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
        // TODO: refactoring
        if($containsEmpty = in_array("", $noteData)){
            return false;
        }
        $noteId = $this->noteModel->create($noteData);
        $this->return_json($noteId);
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
        $noteData = [
            'id' => $postData['id'],
            'title' => $postData['title'],
            'content' => $postData['content'],
            'priority' => $postData['priority']
        ];
        // TODO: refactoring
        if($containsEmpty = in_array("", $noteData)){
            return false;
        }
        $noteId = $this->noteModel->update($noteData, $userId);
        $this->return_json($noteId);
    }

    public function delete()
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
