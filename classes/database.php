<?php

class Database
{
    private $server_name = 'localhost';
    private $database_username = 'root';
    private $database_password = '12117aA';
    private $database_name = 'roadmap';
    private $connection = null;

    public function register($user)
    {
        $this->connection = new mysqli(
            $this->server_name,
            $this->database_username,
            $this->database_password,
            $this->database_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'INSERT INTO users (`firstname`, `lastname`, `password`, `email`, `birth_date`) VALUES (?,?,?,?,?)'
        );
        $sql->bind_param(
            'sssss',
            $user['firstname'],
            $user['lastname'],
            $user['password'],
            $user['email'],
            $user['birth_date']
        );
        if ($sql->execute()) {
            $id = $this->connection->insert_id;
            $sql->close();
            $this->connection->close();
            return $id;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    public function loginUser($email, $password)
    {
        $this->connection = new mysqli(
            $this->server_name,
            $this->database_username,
            $this->database_password,
            $this->database_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'SELECT * FROM `users` WHERE email=? AND password=?'
        );
        $sql->bind_param('ss', $email, $password);
        $sql->execute();
        $result = $sql->get_result();
        if ($result->num_rows > 0) {
            $user = $result->fetch_assoc();
            $sql->close();
            $this->connection->close();
            return $user;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    public function getUserByEmail($email)
    {
        $this->connection = new mysqli(
            $this->server_name,
            $this->database_username,
            $this->database_password,
            $this->database_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'SELECT DISTINCT * FROM `user` WHERE username=? OR email=?'
        );
        $sql->bind_param('ss', $username, $username);
        $sql->execute();
        $result = $sql->get_result();
        if ($result->num_rows > 0) {
            $user = $result->fetch_assoc();
            $sql->close();
            $this->connection->close();
            return $user;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    public function createNote($userId, $postData)
    {
        $this->connection = new mysqli(
            $this->server_name,
            $this->database_username,
            $this->database_password,
            $this->database_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'INSERT INTO user_notes (`user_id`, `title`, `content`, `priority`, `created_at`) VALUES (?,?,?,?,?)'
        );
        $sql->bind_param(
            'sssss',
            $userId,
            $postData['title'],
            $postData['content'],
            $postData['priority'],
            $postData['created_at']
        );
        if ($sql->execute()) {
            $id = $this->connection->insert_id;
            $sql->close();
            $this->connection->close();
            return $id;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    public function getUserNotes($userId)
    {
        $this->connection = new mysqli(
            $this->server_name,
            $this->database_username,
            $this->database_password,
            $this->database_name
        );
        $this->connection->set_charset('utf8');
        $sql = $this->connection->prepare(
            'SELECT DISTINCT * FROM `user_notes` WHERE `user_id`=?'
        );
        $sql->bind_param('s', $userId);
        $sql->execute();
        $userNotes = [];
        $result = $sql->get_result();
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_array()) {
                array_push($userNotes, [
                    'id' => $row['id'],
                    'title' => $row['title'],
                    'content' => $row['content'],
                    'priority' => $row['priority'],
                ]);
            }
            $sql->close();
            $this->connection->close();
            return $userNotes;
        }
        $sql->close();
        $this->connection->close();
        return false;
    }

    // public function updateUser($user)
    // {
    //     $this->connection = new mysqli(
    //         $this->server_name,
    //         $this->database_username,
    //         $this->database_password,
    //         $this->database_name
    //     );
    //     $this->connection->set_charset('utf8');
    //     $sql = $this->connection->prepare(
    //         'UPDATE `user` SET `name` = ?,`lastname`=?,`username`=?,`password`=?,`email`=? WHERE id=?'
    //     );
    //     $sql->bind_param(
    //         'sssssi',
    //         $user['name'],
    //         $user['lastname'],
    //         $user['username'],
    //         $user['password'],
    //         $user['email'],
    //         $user['id']
    //     );
    //     if ($sql->execute()) {
    //         $sql->close();
    //         $this->connection->close();
    //         return true;
    //     }
    //     $sql->close();
    //     $this->connection->close();
    //     return false;
    // }
}
