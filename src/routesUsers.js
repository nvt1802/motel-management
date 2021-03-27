// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard"
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js"
// core components/views for RTL layout

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/users"
  }
];

export default dashboardRoutes;
