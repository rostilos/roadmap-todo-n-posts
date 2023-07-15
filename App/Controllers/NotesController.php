<?php
namespace App\Controllers;

use Core\Request;
use Core\Controller;
use App\Model\Note;
use Core\Jwt;
use Core\Validator;

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

    /**
     * @var Validator
     */
    private $validator;

    public function __construct()
    {
        $this->jwt = new Jwt();
        $this->noteModel = new Note();
        $this->validator = new Validator();
    }

    /**
     * Get all user notes
     *
     * @return array
     * @access  public
     */
    public function getUserNotes()
    {
        $bearer_token = $this->jwt->get_bearer_token();
        $is_jwt_valid = isset($bearer_token)
            ? $this->jwt->is_jwt_valid($bearer_token)
            : false;

        if (!$is_jwt_valid) {
            $this->return_json(null, 'Invalid token provided', false);
        }
        $userId = $this->jwt->getPayload($bearer_token)->user->id;
        $userNotes = $this->noteModel->getUserNotes($userId);

        $this->return_json(['data' => $userNotes], null, true);
    }

    /**
     * Create new user note
     *
     * @return array
     * @access  public
     */
    public function createNote()
    {
        $bearer_token = $this->jwt->get_bearer_token();
        $is_jwt_valid = isset($bearer_token)
            ? $this->jwt->is_jwt_valid($bearer_token)
            : false;

        if (!$is_jwt_valid) {
            $this->return_json(null, 'Invalid token provided', false);
        }

        $userId = $this->jwt->getPayload($bearer_token)->user->id;

        $requestData = $this->getPostData();
        $noteData = [
            'user_id' => $userId,
            'title' => $requestData['title'],
            'content' => $requestData['content'],
            'priority' => $requestData['priority'],
            'created_at' => date('Y-m-d H:i:s'),
        ];

        if ($this->validator->isContainsEmptyValues($noteData)) {
            $this->return_json(null, 'Check that the data is correct', false);
        }
        if ($this->noteModel->create($noteData)) {
            $this->return_json(null, 'Note successfully added', true);
        }
        $this->return_json(null, 'Something went wrong', false);
    }

    /**
     * Update existing user note
     *
     * @return array
     * @access  public
     */
    public function updateNote()
    {
        $bearer_token = $this->jwt->get_bearer_token();
        $is_jwt_valid = isset($bearer_token)
            ? $this->jwt->is_jwt_valid($bearer_token)
            : false;

        if (!$is_jwt_valid) {
            $this->return_json(null, 'Invalid token provided', false);
        }

        $userId = $this->jwt->getPayload($bearer_token)->user->id;
        $requestData = $this->getPostData();
        $noteData = [
            'id' => $requestData['id'],
            'title' => $requestData['title'],
            'content' => $requestData['content'],
            'priority' => $requestData['priority'],
        ];

        if ($this->validator->isContainsEmptyValues($noteData)) {
            $this->return_json(
                null,
                'Check that your e-mail and password are correct',
                false
            );
        }

        $this->noteModel->update($noteData, $userId);
        $this->return_json(null, 'The note has been successfully edited', true);
    }

    /**
     * Delete existing user note
     *
     * @return array
     * @access  public
     */
    public function deleteNote()
    {
        $bearer_token = $this->jwt->get_bearer_token();
        $is_jwt_valid = isset($bearer_token)
            ? $this->jwt->is_jwt_valid($bearer_token)
            : false;
        if (!$is_jwt_valid) {
            $this->return_json(null, 'Invalid token provided', false);
        }
        $userId = $this->jwt->getPayload($bearer_token)->user->id;
        $requestData = $this->getPostData();
        $this->noteModel->delete($requestData['id'], $userId);
        $this->return_json(
            null,
            'The note has been successfully deleted',
            true
        );
    }
}
