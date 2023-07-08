<?php 
namespace App\Model;

use Core\Model;

class UserNote extends Model
{
    public function __construct() {
        parent::__construct("user_notes");
    }

    /**
     * Method getting all user notes for current user from database.
     *
     * @return array
     * @access  public
     */

    public function getUserNotes($userId)
    {
        $rows = $this->DB()
                        ->query('SELECT DISTINCT * FROM `user_notes` WHERE `user_id`= ' . "$userId")
                        ->fetchAll(\PDO::FETCH_ASSOC);

        // Insert data from database
        $userNotes = [];
        foreach ($rows as $row) {
            array_push($userNotes, [
                'id' => $row['id'],
                'title' => $row['title'],
                'content' => $row['content'],
                'priority' => $row['priority'],
                'created_at' => $row['created_at'],
            ]);
        }

        return $userNotes;
    }

    /**
     * Method create new user note.
     *
     * @return array
     * @access  public
     */

    public function createNote($userId, $noteData)
    {
        $row = $this->insert($noteData);
        return $row;
    }

    /**
     * Method edit existed user note.
     *
     * @return array
     * @access  public
     */
    public function updateUserNote($noteId, $userId)
    {
        
    }
}