<?php
namespace App\Controllers;

use Core\Request;
use Core\Controller;
use App\Model\Post;
use Core\Jwt;
use Core\Validator;

class PostsController extends Controller
{
    /**
     * @var Jwt
     */
    private $jwt;

    /**
     * @var Post
     */
    private $postModel;

    /**
     * @var Validator
     */
    private $validator;

    public function __construct()
    {
        $this->jwt = new Jwt();
        $this->postModel = new Post();
        $this->validator = new Validator();
    }

    /**
     * Create post
     *
     * @return array
     * @access  public
     */
    public function createPost()
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

        $newPost = [
            'user_id' => $userId,
            'title' => $requestData['title'],
            'content' => $requestData['content'],
            'created_at' => date('Y-m-d H:i:s'),
        ];

        if ($this->validator->isContainsEmptyValues($newPost)) {
            $this->return_json(null, 'Check that the data is correct', false);
        }
        if ($postId = $this->postModel->create($newPost)) {
            $this->return_json(
                null,
                'The new post has been successfully posted',
                true
            );
        }
        $this->return_json(null, 'Something went wrong', false);
    }

    /**
     * Get posts collection ( Pagination is used )
     *
     * @return array
     * @access  public
     */
    // TODO : refactoring this method 
    public function getPosts()
    {
        $requestData = $this->getPostData();
        $page = 1;
        $limit = 5;
        $sortOrder = 'DESC';
        $currentUserOnly = false;
        $userId = null;

        if (isset($requestData['page'])) {
            $page = $requestData['page'];
        }
        if (isset($requestData['limit'])) {
            $limit = $requestData['limit'];
        }
        if (isset($requestData['sort'])) {
            $sortOrder = $requestData['sort'];
        }
        if (isset($requestData['userPostsOnly'])) {
            $currentUserOnly = $requestData['userPostsOnly'];
        }

        if($currentUserOnly){
            $bearer_token = $this->jwt->get_bearer_token();
            $is_jwt_valid = isset($bearer_token)
                ? $this->jwt->is_jwt_valid($bearer_token)
                : false;

            if (!$is_jwt_valid) {
                $this->return_json(null, 'Invalid token provided', false);
            }
            $userId = $this->jwt->getPayload($bearer_token)->user->id;
        }
        $offset = ($page - 1) * $limit;

        if (
            !($posts = $this->postModel->getPostsCollection(
                $page,
                $offset,
                $limit,
                $sortOrder,
                $currentUserOnly,
                $userId
            ))
        ) {
            $this->return_json(null, null, false);
        }
        $this->return_json($posts, null, true);
    }

    /**
     * Get posts by post id
     *
     * @return array
     * @access  public
     */
    public function getPostById()
    {
        $requestData = $this->getPostData();
        $postIdFromRequest = $requestData['id'];

        if ($postData = $this->postModel->getPostById($postIdFromRequest)) {
            $this->return_json(['data' => $postData], null, true);
        }

        $this->return_json(null, 'Something went wrong', false);
    }
}
