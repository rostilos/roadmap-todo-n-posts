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


    public function __construct() {
        $this->jwt = new Jwt();
        $this->postModel = new Post();
        $this->validator = new Validator();
    }

    public function create()
    {
        $bearer_token = $this->jwt->get_bearer_token();
        $is_jwt_valid = isset($bearer_token) ? $this->jwt->is_jwt_valid($bearer_token) : false;

        if(!$is_jwt_valid){
            return false;
        }

        $userId = $this->jwt->getPayload($bearer_token)->user->id;

        $requestData = $this->getPostData();

        $newPost = [
            'user_id' => $userId,
            'title' => $requestData['title'],
            'content' => $requestData['content'],
            'created_at' => date('Y-m-d H:i:s'),
        ];
        // TODO: refactoring
        if($this->validator->isContainsEmptyValues($newPost)){
            return false;
        }
        $postId = $this->postModel->create($newPost);
        $this->return_json($postId);
    }


    public function getAllPostsData()
    {
        $requestData = $this->getPostData();
        $page = 1;
        $limit = 5;
        $sortOrder = 'DESC';
        
        if(isset($requestData['page'])){
            $page = $requestData['page'];
        }
        if(isset($requestData['limit'])){
            $limit = $requestData['limit'];
        }
        if(isset($requestData['sort'])){
            $sortOrder = $requestData['sort'];
        }
        $offset = ($page-1) * $limit;
        
        $posts = $this->postModel->getAll($page,$offset,$limit,$sortOrder);
        $this->return_json($posts);
    }

    public function getPostById()
    {
        $requestData = $this->getPostData();
        $postIdFromRequest = $requestData['id'];
        $postData = $this->postModel->getPostById($postIdFromRequest);

        $this->return_json(['data' => $postData]);

    }
}
