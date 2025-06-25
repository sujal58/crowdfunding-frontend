import {createBrowserRouter} from "react-router-dom"
import Homepage from "../components/Pages/Homepage";
import Login from "../components/Pages/Auth/Login";
import Register from "../components/Pages/Auth/Register"
import DashboardPage from "../components/Pages/DashboardPage/DashboardPage";
import AdminDashboardPage from "../components/Pages/AdminDashboardPage";
import CampaignTable from "../components/common/Campaign/CampignTable/CampaignTable";
import DonationFeed from "../components/ui/Donation/DonationFeed";
import DashboardCampign from "../components/common/User-dashboard/DashboardCampign/DashboardCampaign";
import Settings from "../components/common/User-dashboard/Setting/Setting";
import Notifications from "../components/ui/Notification/Notification";
import Profile from "../components/common/User-dashboard/Setting/Profile";
import Security from "../components/common/User-dashboard/Setting/Security";
import KYCForm from "../components/common/KycForm/KycForm";
import AdminLogin from "@/components/Pages/Auth/AdminLogin";
import AuthLayout from "@/Layout/AuthLayout";

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
      path: "/admin-login",
      Component: AdminLogin,
    },
    {
      path: "/register",
      Component: Register,
    },
    {
      Component: AuthLayout,
      children:[
        {
          path: "/user-dashboard",
          Component: DashboardPage,
          children: [
            {
              
              // path: "my-campaigns",
              index: true,
              Component: CampaignTable,
            },
            {
              path: "donations",
              Component: DonationFeed,
            },
            {
              path: "campaigns",
              Component: DashboardCampign,
            },
            {
              path: "setting",
              Component: Settings,
              children: [
                {
                  // path: "profile",
                  index: true,
                  Component: Profile
                },
                {
                  path: "security",
                  Component: Security
                },
                {
                  path: "kyc",
                  Component: KYCForm
                }
              ]
            },
            {
              path: "notification",
              Component: Notifications,
            },
          ]
        },
        {
          path: "/admin-dashboard",
          Component: AdminDashboardPage,
        },
      ]

    },
   
   
  ]);