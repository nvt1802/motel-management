// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard"
import Person from "@material-ui/icons/Person"
import LibraryBooks from "@material-ui/icons/LibraryBooks"
import BubbleChart from "@material-ui/icons/BubbleChart"
import LocationOn from "@material-ui/icons/LocationOn"
import Notifications from "@material-ui/icons/Notifications"
// core components/views for Admin layout
import DashboardPage from "views/Admin/Dashboard/Dashboard.js"
import UserProfile from "views/Admin/UserProfile/UserProfile.js"
import AccountManagement from "views/Admin/AccountManagement"
import Typography from "views/Admin/Typography/Typography.js"
import Icons from "views/Admin/Icons/Icons.js"
import Maps from "views/Admin/Maps/Maps.js"
import NotificationsPage from "views/Admin/Notifications/Notifications.js"
// core components/views for RTL layout

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "User Profile",
    icon: Person,
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/table",
    name: "Account Management",
    icon: "content_paste",
    component: AccountManagement,
    layout: "/admin"
  },
  {
    path: "/typography",
    name: "Typography",
    icon: LibraryBooks,
    component: Typography,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Icons",
    icon: BubbleChart,
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Maps",
    rtlName: "خرائط",
    icon: LocationOn,
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/admin"
  }
];

export default dashboardRoutes;
