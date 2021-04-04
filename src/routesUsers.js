// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard"
// core components/views for Admin layout
import DashboardPage from "views/Users/Dashboard/Dashboard.js"
import UserProfile from "views/Admin/UserProfile/UserProfile.js"
import { InfoOutlined } from "@material-ui/icons"

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/users"
  },
  {
    path: "/profile",
    name: "Profile",
    icon: InfoOutlined,
    component: UserProfile,
    layout: "/users"
  },
];

export default dashboardRoutes;
