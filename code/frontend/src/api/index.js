import ajaxLogin from "./user/login";
import register from "./user/register";
import updateUser from "./user/update";
import updateUserPassword from "./user/updatePassword";
import fetchAllUsers from "./user/fetchAll";

import fetchNotes from "./notes/fetch/";
import createNote from "./notes/create";
import editNote from "./notes/edit";
import deleteNote from "./notes/delete";

import createPost from "./posts/create";
import fetchAllPosts from "./posts/fetchAll";
import fetchPostView from "./posts/fetchPostView";


export const ajaxLoginRequest = ajaxLogin;
export const registerRequest = register;
export const updateUserRequest = updateUser;
export const updateUserPasswordRequest = updateUserPassword;
export const fetchAllUsersRequest = fetchAllUsers;

export const fetchNotesRequest = fetchNotes;
export const createNoteRequest = createNote;
export const editNoteRequest = editNote;
export const deleteNoteRequest = deleteNote;

export const createPostRequest = createPost;
export const fetchAllPostsRequest = fetchAllPosts;
export const fetchPostViewRequest = fetchPostView;