<?php
namespace App\Model;

use Core\Model;

class Post extends Model
{
    public function __construct()
    {
        parent::__construct('posts');
    }

    /**
     * Method create new post.
     *
     * @return int
     * @access  public
     */

    public function create($newPost)
    {
        $newPostId = $this->insert($newPost);
        return $newPostId;
    }

    /**
     * Method getting all posts
     *
     * @param int $page Current page ( configuration for pagination )
     * @param int $offset Offset from zero index
     * @param int $limit  Limit on the number of outputs per page
     * @param string $sortOrder DESC/ASC
     * @param bool $currentUserOnly Parameter to filter posts for the current user only
     * @param null|int $userId
     *
     * @return array
     * @access  public
     */

    //  TODO : refactoring this method ...
    public function getPostsCollection(
        $page,
        $offset,
        $limit,
        $sortOrder,
        $currentUserOnly = false,
        $userId = null
    ) {
        $filterQueryPart = $currentUserOnly
            ? 'WHERE user_id=' . "$userId "
            : '';

        $query = 'SELECT DISTINCT * ' . 'FROM `posts` ' . $filterQueryPart;
        $totalRows = $this->DB()
            ->query($query)
            ->rowCount();
        $totalPages = ceil($totalRows / $limit);

        $filterQueryPart = $currentUserOnly
            ? 'WHERE posts.user_id=' . "$userId "
            : '';

        $query =
            'SELECT DISTINCT posts.id, posts.user_id, posts.title, posts.content, posts.created_at, users.firstname, users.lastname ' .
            'FROM `posts` ' .
            'LEFT JOIN `users` ' .
            'ON posts.user_id=users.id ' .
            $filterQueryPart .
            'ORDER by posts.created_at ' .
            "$sortOrder " .
            'LIMIT ' .
            $offset .
            ',' .
            $limit;

        $rows = $this->DB()
            ->query($query)
            ->fetchAll(\PDO::FETCH_ASSOC);

        $posts = [
            'data' => [],
            'pagination' => [],
        ];
        foreach ($rows as $row) {
            array_push($posts['data'], [
                'id' => $row['id'],
                'firstname' => $row['firstname'],
                'lastname' => $row['lastname'],
                'title' => $row['title'],
                'content' => $row['content'],
                'created_at' => $row['created_at'],
            ]);
        }
        $posts['pagination'] = [
            'total' => $totalPages,
            'page' => $page,
            'limit' => $limit,
        ];

        return $posts;
    }

    /**
     * Method getting recent posts
     *
     * @return array
     * @access  public
     */

    public function getRecentPostsCollection()
    {
        $query = 'SELECT DISTINCT posts.id, posts.user_id, posts.title, posts.content, posts.created_at, users.firstname, users.lastname ' .
        'FROM `posts` ' .
        'LEFT JOIN `users` ' .
        'ON posts.user_id=users.id ' . 
        'ORDER BY created_at DESC LIMIT 5 ';

        $rows = $this->DB()
            ->query($query)
            ->fetchAll(\PDO::FETCH_ASSOC);

        return $rows ?? [];
    }

    /**
     * Method getting post by id
     *
     * @param int $id
     *
     * @return array
     * @access  public
     */

    public function getPostById($id)
    {
        $query =
            'SELECT DISTINCT posts.id, posts.title, posts.content, posts.created_at, users.firstname, users.lastname ' .
            'FROM `posts` ' .
            'LEFT JOIN `users` ' .
            'ON posts.user_id=users.id ' .
            'WHERE ' .
            'posts.id=' .
            "'$id' ";
        $row = $this->DB()
            ->query($query)
            ->fetchAll(\PDO::FETCH_ASSOC);

        if ($row) {
            $post = $row[0];
            return $post;
        }
        return [];
    }
}
