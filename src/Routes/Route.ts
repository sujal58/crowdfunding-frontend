import {createBrowserRouter} from "react-router-dom"
import Homepage from "../components/Pages/Homepage";
import Login from "../components/Pages/Auth/Login";
import Register from "../components/Pages/Auth/Register"
import DashboardPage from "../components/Pages/DashboardPage/DashboardPage";
import CreateCampaignPage from "../components/Pages/Campaign/CreateCampaignPage";

export const router = createBrowserRouter([
    {
      path: "/",
      Component: Homepage,
      
    },
    {
      path: "/login",
      Component: Login,
    },
    {
      path: "/register",
      Component: Register,
    },
    {
      path: "/dashboard",
      Component: DashboardPage,
    },
    {
      path: "/create-campaign",
      Component: CreateCampaignPage,
    },
  ]);