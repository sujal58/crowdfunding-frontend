import {createBrowserRouter} from "react-router-dom"
import Homepage from "../components/Pages/Homepage";
import Login from "../components/Pages/Auth/Login";
import Register from "../components/Pages/Auth/Register"
import DashboardPage from "../components/Pages/DashboardPage/DashboardPage";
import CreateCampaignPage from "../components/Pages/Campaign/CreateCampaignPage";
import AdminDashboardPage from "../components/Pages/AdminDashboardPage";
import CampaignTable from "../components/common/Campaign/CampignTable/CampaignTable";
import DonationFeed from "../components/ui/Donation/DonationFeed";
import DashboardCampign from "../components/common/User-dashboard/DashboardCampign/DashboardCampaign";
import Settings from "../components/common/User-dashboard/Setting/Setting";
import Notifications from "../components/ui/Notification/Notification";
import Profile from "../components/common/User-dashboard/Setting/Profile";
import Security from "../components/common/User-dashboard/Setting/Security";
import KYCForm from "../components/common/KycForm/KycForm";

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
  ]);