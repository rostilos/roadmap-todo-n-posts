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
     * @return mixed
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
     * @return int
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
     * @return mixed
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
     * @return bool
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
     * Method getting all users data ( except password )
     *
     * @return array
     * @access  public
     */

    public function getAll()
    {
        $query = 'SELECT DISTINCT firstname,lastname,email,birth_date '
        . 'FROM `users` ';
        $rows = $this->DB()
                        ->query($query)
                        ->fetchAll(\PDO::FETCH_ASSOC);

        // Insert data from database
        $users = [];
        foreach ($rows as $row) {
            array_push($users, [
                // 'id' => $row['id'],
                'firstname' => $row['firstname'],
                'lastname' => $row['lastname'],
                'email' => $row['email'],
                'birth_date' => $row['birth_date'],
            ]);
        }

        return $users;
    }

    /**
     * Get User data by email
     *
     * @return mixed
     * @access  public
     */

    public function getUserByEmail($email)
    {
        $query =
            'SELECT DISTINCT firstname,lastname,email,birth_date ' 
            . 'FROM `users` '
            . 'WHERE ' . '`email`=' . "'$email' ";
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
     * @return mixed
     * @access  private
     */

    private function getUserById($id)
    {
        $query =
            'SELECT DISTINCT firstname,lastname,email,birth_date '
            . 'FROM `users` '
            . 'WHERE ' . '`id`=' . "'$id' ";
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
     * @return mixed
     * @access  private
     */

    private function getUserPasswordById($id)
    {
        $query =
            'SELECT `password` ' .
            'FROM `users` '
            .'WHERE ' . '`id`=' . "'$id' ";
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