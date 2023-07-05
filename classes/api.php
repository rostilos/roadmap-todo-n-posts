<?php
include './database.php';
include './jwt.php';

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode('/', $uri);

$action = $uri[2];

$bearer_token = get_bearer_token();
$is_jwt_valid = isset($bearer_token) ? is_jwt_valid($bearer_token) : false;

$database = new Database();

if ($action === 'register') {
    $rest_json = file_get_contents('php://input');
    $_POST = json_decode($rest_json, true);
    $user = [
        'firstname' => $_POST['firstname'],
        'lastname' => $_POST['lastname'],
        'password' => md5($_POST['password']),
        'email' => $_POST['email'],
        'birth_date' => date('Y-m-d'),
    ];

    if ($user_id = $database->register($user)) {
        $user['id'] = $user_id;
        // if ($code = $database->generateConfirmCode($user_id)) {
            //send generated code by email to user
            $headers = ['alg' => 'HS256', 'typ' => 'JWT'];
            $payload = ['user' => $user];
            $jwt = generate_jwt($headers, $payload);
            return_json(['status' => $jwt]);
        // }
    }
} elseif ($action === 'login') {
    $rest_json = file_get_contents('php://input');
    $_POST = json_decode($rest_json, true);

    if (
        $user = $database->loginUser(
            $_POST['email'],
            md5($_POST['password'])
        )
    ) {
        $headers = ['alg' => 'HS256', 'typ' => 'JWT'];
        $payload = ['user' => $user];
        $jwt = generate_jwt($headers, $payload);
        return_json(['status' => $jwt]);
        // return_json(['status' => $payload['user']]);
    }
} elseif ($action === 'user') {
    if ($is_jwt_valid) {
        $username = getPayload($bearer_token)->user->username;
        if ($user = $database->getUserByEmail($username)) {
            return_json(['status' => $user]);
        }
    }
} elseif($action === 'create_note') {
    $rest_json = file_get_contents('php://input');
    $_POST = json_decode($rest_json, true);
    $postData = [
        'title' => $_POST['title'],
        'content' => $_POST['content'],
        'priority' => $_POST['priority'],
        'created_at' => date('Y-m-d'),
    ];
    if ($is_jwt_valid) {
        $userId = getPayload($bearer_token)->user->id;
        if (!$userId) {
            return false;
        }
        if ($postId = $database->createNote($userId, $postData)) {
            return_json(['status' => 'success']);
        }
        return false;
    }
} elseif($action === 'user_notes') {
    if ($is_jwt_valid) {
        $userId = getPayload($bearer_token)->user->id;
        if (!$userId) {
            return false;
        }
        if ($userNotes = $database->getUserNotes($userId)) {
            return_json($userNotes);
        }
        return false;   
    }
}
return_json(['status' => 0]);

function return_json($arr)
{
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: *');
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($arr);
    exit();
}