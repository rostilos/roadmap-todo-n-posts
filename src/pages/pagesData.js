import Login from "../pages/Login/Login";
import Notes from "./Notes/Notes";
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
    element: <Notes/>,
    title: "notes"
  }
];

export default pagesData;
