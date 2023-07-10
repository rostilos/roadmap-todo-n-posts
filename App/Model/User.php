<?php
namespace App\Model;

use Core\Model;

class User extends Model
{
    public function __construct()
    {
        parent::__construct('users');
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
     * Update User data
     *
     * @return array
     * @access  public
     */

    public function update($userData, $userId)
    {
        [
            'firstname' => $firstname,
            'lastname' => $lastname,
            'birth_date' => $birthDate,
        ] = $userData;
        $changePasswordQueryPart = '';
        $password = isset($userData['password']) ? $userData['password'] : null;
        $currentPassword = isset($userData['current_password']) ? $userData['current_password'] : null;  

        if($password && $currentPassword){

        }      

        $changePasswordQueryPart = '`password`=' . "'$password',";

        $query = 'UPDATE `users` SET '
                . '`firstname`=' . "'$firstname',"
                . '`lastname`=' . "'$lastname',"
                . $changePasswordQueryPart
                . '`birth_date`=' . "'$birthDate' "
                . 'WHERE `id`=' . "$userId ";

        $this->DB()->query($query);
        
        return $this->getUserById($userId);
    }


    /**
     * Update User password
     *
     * @return array
     * @access  public
     */

    public function updateUserPassword($passwordData, $userId)
    {
        if($passwordData['current_password'] === $this->getUserPasswordById($userId)){
            $newPassword = $passwordData['new_password'];

            $query = 'UPDATE `users` SET '
            . '`password`=' . "'$newPassword' "
            . 'WHERE `id`=' . "$userId ";
            $this->DB()->query($query);

            return true;
        }
        return false;
    }

    /**
     * Get User data by email
     *
     * @return array
     * @access  public
     */

    public function getUserByEmail($email)
    {
        $query =
            'SELECT DISTINCT * FROM `users` WHERE ' . '`email`=' . "'$email' ";
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
     * Get User data by id
     *
     * @return array
     * @access  private
     */

    private function getUserById($id)
    {
        $query =
            'SELECT DISTINCT * FROM `users` WHERE ' . '`id`=' . "'$id' ";
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
     * Get User password by id
     *
     * @return array
     * @access  private
     */

    private function getUserPasswordById($id)
    {
        $query =
            'SELECT `password` FROM `users` WHERE ' . '`id`=' . "'$id' ";
        $row = $this->DB()
            ->query($query)
            ->fetch(\PDO::FETCH_DEFAULT);
        if ($row) {
            $userPassword = $row['password'];
            return $userPassword;
        }
        return false;
    }
}