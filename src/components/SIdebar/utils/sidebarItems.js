import user from "../../../assets/images/sidebar/user.svg";

const sidebarItems = [
  {
    label: "Information",
    icon: user,
    path: "/",
    loginRequired: true,
  },
  {
    label: "My Notes",
    icon: user,
    path: "/notes",
    loginRequired: true,
  },
  {
    label: "Posts",
    icon: user,
    path: "/",
    loginRequired: false,
  },
  {
    label: "Community",
    icon: user,
    path: "/",
    loginRequired: true,
  },
];

export default sidebarItems;
