<?php

return [
    'POST' => [
        '/api/user_notes' => 'NotesController@user_notes',
        '/api/create_note' => 'NotesController@create',
        '/api/edit_note' => 'NotesController@update',
        '/api/delete_note' => 'NotesController@delete',
        '/api/login' => 'AuthorizationController@login',
        '/api/register' => 'AuthorizationController@register',
        '/api/user_update' => 'UserControllerupdate',
        '/api/update_password' => 'UserControllerupdatePassword',
        '/api/fetch_users' => 'UserControllergetAllUsersData'
    ],
];
