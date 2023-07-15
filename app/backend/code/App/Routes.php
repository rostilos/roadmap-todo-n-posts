<?php

return [
    'POST' => [
        '/api/user_notes' => 'NotesController@getUserNotes',
        '/api/create_note' => 'NotesController@createNote',
        '/api/edit_note' => 'NotesController@updateNote',
        '/api/delete_notes_group' => 'NotesController@deleteNotesByGroup',
        '/api/delete_note' => 'NotesController@deleteNote',
        '/api/login' => 'AuthorizationController@login',
        '/api/register' => 'AuthorizationController@register',
        '/api/user_update' => 'UserController@updateUserData',
        '/api/update_password' => 'UserController@updateUserPassword',
        '/api/fetch_users' => 'UserController@getAllUsersData',
        '/api/create_post' => 'PostsController@createPost',
        '/api/fetch_posts' => 'PostsController@getPosts',
        '/api/fetch_post_view' => 'PostsController@getPostById',
    ],
];
