<?php 
namespace App\Model;

use Core\Model;

class Note extends Model
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
     * @return int
     * @access  public
     */

    public function create($noteData)
    {
        $row = $this->insert($noteData);
        return $row;
    }

    /**
     * Method edit existed user note.
     *
     * @return void
     * @access  public
     */
    public function delete($noteId)
    {
        $rows = $this->DB()
                        ->query('DELETE FROM `user_notes` WHERE `id`= ' . "$noteId")
                        ->fetchAll(\PDO::FETCH_ASSOC);
    }

    /**
     * Method edit existed user note.
     *
     * @return array
     * @access  public
     */
    public function update($noteData, $userId)
    {
        [
            'id' => $id,
            'title' => $title,
            'content' => $content,
            'priority' => $priority
        ] = $noteData;

        $query = 'UPDATE `user_notes` SET '
                . '`title`=' . "'$title',"
                . '`content`=' . "'$content',"
                . '`priority`=' . "$priority "
                . 'WHERE `user_id`=' . "$userId "
                . 'AND `id`=' . "$id";
        $rows = $this->DB()
                        ->query($query)
                        ->fetchAll(\PDO::FETCH_ASSOC);
        return $this->DB()->lastInsertId();
    }
}