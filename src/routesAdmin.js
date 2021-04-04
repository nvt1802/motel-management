// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard"
import Person from "@material-ui/icons/Person"
// core components/views for Admin layout
import DashboardPage from "views/Admin/Dashboard/Dashboard.js"
import AccountManagement from "views/Admin/AccountManagement"
import UserProfile from "views/Admin/UserProfile/UserProfile.js"
import { InfoOutlined } from "@material-ui/icons"

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/account-management",
    name: "Account Management",
    icon: Person,
    component: AccountManagement,
    layout: "/admin"
  },
  {
    path: "/profile",
    name: "Profile",
    icon: InfoOutlined,
    component: UserProfile,
    layout: "/admin"
  },
];

export default dashboardRoutes;
