import user from "../../../assets/images/sidebar/user.svg";
import notes from "../../../assets/images/sidebar/notes.svg";
import news from "../../../assets/images/sidebar/news.svg";
import community from "../../../assets/images/sidebar/community.svg";

const sidebarItems = [
  {
    label: "Information",
    icon: user,
    path: "/",
    loginRequired: true,
  },
  {
    label: "My Notes",
    icon: notes,
    path: "/notes",
    loginRequired: true,
  },
  {
    label: "Posts",
    icon: news,
    path: "/posts",
    loginRequired: false,
  },
  {
    label: "Community",
    icon: community,
    path: "/community",
    loginRequired: true,
  },
];

export default sidebarItems;
