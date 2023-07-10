<?php

return [
    'POST' => [
        '/api/user_notes' => 'Notes@user_notes',
        '/api/create_note' => 'Notes@create_note',
        '/api/edit_note' => 'Notes@update_note',
        '/api/delete_note' => 'Notes@delete_note',
        '/api/login' => 'Authorization@login',
        '/api/register' => 'Authorization@register',
        '/api/user_update' => 'User@update',
        '/api/update_password' => 'User@updatePassword',
    ],
];
