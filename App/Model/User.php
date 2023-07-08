<?php 
namespace App\Model;

use Core\Model;

class User extends Model
{
    public function __construct() {
        parent::__construct("users");
    }

    /**
     * Login user.
     *
     * @return array
     * @access  public
     */

    public function login($email, $password)
    {
        $query = 'SELECT * FROM `users` WHERE '
                . '`email`=' . "'$email' " . 'AND '
                . '`password`=' . "'$password'";
        $row = $this->DB()
                        ->query($query)
                        ->fetch(\PDO::FETCH_DEFAULT);
        if ($row) {
            $user = $row;
            return $user;
        }
        return false;
    }

    /**
     * Create new user.
     *
     * @return array
     * @access  public
     */

    public function create($user)
    {                 
        $userId = $this->insert($user);
        return $userId;
    }

    /**
     * Get User data
     *
     * @return array
     * @access  public
     */

    public function getUserByEmail($email)
    {
        $query = 'SELECT DISTINCT * FROM `user` WHERE '
                . '`email`=' . "'$email' ";
        $row = $this->DB()
                    ->query($query)
                    ->fetch(\PDO::FETCH_DEFAULT);
        if ($row) {
            $user = $row;
            return $user;
        }
        return false;
    }

    /**
     * Update User data
     *
     * @return array
     * @access  public
     */

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