import Login from "../pages/Login/Login";
import Community from "./Community/Community";
import Notes from "./Notes/Notes";
import Posts from "./Posts/Posts";
import UserAccount from "./UserAccount/UserAccount";
// import Notes from "../pages/Notes/Notes";
// import PostList from "../pages/Posts/PostList";
// import PostView from "../pages/Posts/PostView";
// import UserAccount from "../pages/UserAccount/UserAccount";

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
];

export default pagesData;
