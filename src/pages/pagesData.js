import Login from "../pages/Login/Login";
import Community from "./Community/Community";
import Notes from "./Notes/Notes";
import Posts from "./Posts/Posts";
import PostView from "./Posts/PostView";
import UserAccount from "./UserAccount/UserAccount";

const pagesData = [
  {
    path: "/login",
    element: <Login />,
    title: "login",
  },
  {
    path: "/",
    element: <UserAccount />,
    title: "user Account",
  },
  {
    path: "/notes",
    element: <Notes />,
    title: "notes",
  },
  {
    path: "/posts",
    element: <Posts />,
    title: "Posts",
  },
  {
    path: "/community",
    element: <Community />,
    title: "Community",
  },
  {
    path: "/posts/view/:id",
    element: <PostView />,
    title: "View Post",
  },
];

export default pagesData;
