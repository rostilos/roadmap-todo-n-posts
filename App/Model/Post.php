<?php 
namespace App\Model;

use Core\Model;

class Post extends Model
{
    public function __construct() {
        parent::__construct("posts");
    }

    /**
     * Method create new post.
     *
     * @return int
     * @access  public
     */

    public function create($newPost)
    {
        $row = $this->insert($newPost);
        return $row;
    }

     /**
     * Method getting all posts
     *
     * @return array
     * @access  public
     */

    public function getAll($page,$offset, $limit)
    {
        $query =
            'SELECT DISTINCT * ' .
            'FROM `posts` ';
        $totalRows = $this->DB()
            ->query($query)
            ->rowCount();
        $totalPages = ceil($totalRows / $limit);

        $query =
            'SELECT DISTINCT posts.title, posts.content, posts.created_at, users.firstname, users.lastname ' .
            'FROM `posts` ' .
            'LEFT JOIN `users` '.
            'ON posts.user_id=users.id '. 
            'LIMIT ' .
            $offset .
            ',' .
            $limit;

        $rows = $this->DB()
            ->query($query)
            ->fetchAll(\PDO::FETCH_ASSOC);

        $users = [
            'data' => [],
            'pagination' => [],
        ];
        foreach ($rows as $row) {
            array_push($users['data'], [
                'firstname' => $row['firstname'],
                'lastname' => $row['lastname'],
                'title' => $row['title'],
                'content' => $row['content'],
                'created_at' => $row['created_at'],
            ]);
        }
        $users['pagination'] = [
            'total' => $totalPages,
            'page' => $page,
            'limit' => $limit,
        ];

        return $users;
    }
}