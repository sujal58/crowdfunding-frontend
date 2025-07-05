import RequireAuth from "../components/RequireAuth";
import { createBrowserRouter } from "react-router-dom";
import Homepage from "../components/Pages/Homepage";
import Login from "../components/Pages/Auth/Login";
import Register from "../components/Pages/Auth/Register";
import DashboardPage from "../components/Pages/DashboardPage/DashboardPage";
import AdminDashboardPage from "../components/Pages/DashboardPage/AdminDashboardPage";
import CampaignTable from "../components/common/Campaign/CampignTable/CampaignTable";
import DonationFeed from "../components/ui/Donation/DonationFeed";
import DashboardCampign from "../components/common/User-dashboard/DashboardCampign/DashboardCampaign";
import Settings from "../components/common/User-dashboard/Setting/Setting";
import Notifications from "../components/ui/Notification/Notification";
import Profile from "../components/common/User-dashboard/Setting/Profile";
import Security from "../components/common/User-dashboard/Setting/Security";
import KYCForm from "../components/common/KycForm/KycForm";
import AdminLogin from "@/components/Pages/Auth/AdminLogin";
import AuthLayout from "@/components/Layout/AuthLayout";
import CampaignForm from "@/components/common/Campaign/CampaignForm/CampaignForm";
import MetricsPanel from "@/components/common/Admin-Dashboard/MetricsPanel";
import NotificationPanel from "@/components/common/Admin-Dashboard/NotificationPanel";
import UserIndex from "@/components/common/Admin-Dashboard/user/Index";
import CampaignIndex from "@/components/common/Admin-Dashboard/campaign/Index";
import FundIndex from "@/components/common/Admin-Dashboard/fund/Index";
import VerifiedUsers from "@/components/common/Admin-Dashboard/user/VerifiedUser";
import UnverifiedUsers from "@/components/common/Admin-Dashboard/user/UnverifiedUser";
import ApprovedCampaigns from "@/components/common/Admin-Dashboard/campaign/ActiveCampaign";
import UnapprovedCampaigns from "@/components/common/Admin-Dashboard/campaign/UnapprovedCampaign";
import SuspiciousCampaigns from "@/components/common/Admin-Dashboard/campaign/SuspiousCampaign";
import ReleasedFunds from "@/components/common/Admin-Dashboard/fund/ReleasedFunds";
import PendingReleases from "@/components/common/Admin-Dashboard/fund/PendingReleases";
import RejectedUser from "@/components/common/Admin-Dashboard/user/RejectedUser";
import CompletedCampaign from "@/components/common/Admin-Dashboard/campaign/CompletedCampaign";
import ActiveCampaign from "@/components/common/Admin-Dashboard/campaign/ActiveCampaign";
import PendingCampaign from "@/components/common/Admin-Dashboard/campaign/PendingCampaign";

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
    children: [
      {
        element: <RequireAuth allowedRole={["ROLE_USER", "ROLE_CREATOR"]} />,
        children: [
          {
            path: "/user-dashboard",
            Component: DashboardPage,
            children: [
              { index: true, Component: CampaignTable },
              { path: "donations", Component: DonationFeed },
              { path: "campaigns", Component: DashboardCampign },
              {
                path: "setting",
                Component: Settings,
                children: [
                  { index: true, Component: Profile },
                  { path: "security", Component: Security },
                  { path: "kyc", Component: KYCForm },
                ],
              },
              { path: "notification", Component: Notifications },
              { path: "create-campaign", Component: CampaignForm },
            ],
          },
        ],
      },
      {
        element: <RequireAuth allowedRole={["ROLE_ADMIN"]} />,
        children: [
          {
            path: "/admin-dashboard",
            Component: AdminDashboardPage,
            children: [
              { index: true, Component: MetricsPanel },
              { path: "notification", Component: NotificationPanel },
              {
                path: "user",
                Component: UserIndex,
                children: [
                  { index: true, Component: VerifiedUsers },
                  { path: "unverified", Component: UnverifiedUsers },
                  { path: "rejected", Component: RejectedUser },
                ],
              },
              {
                path: "campaign",
                Component: CampaignIndex,
                children: [
                  { index: true, Component: ActiveCampaign },
                  { path: "unapproved", Component: UnapprovedCampaigns },
                  { path: "suspious", Component: SuspiciousCampaigns },
                  { path: "completed", Component: CompletedCampaign },
                  { path: "pending", Component: PendingCampaign },
                ],
              },
              { path: "notification", Component: Notifications },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/admin-dashboard",
    Component: AdminDashboardPage,
    children: [
      { index: true, Component: MetricsPanel },
      { path: "notification", Component: NotificationPanel },
      {
        path: "user",
        Component: UserIndex,
        children: [
          { index: true, Component: VerifiedUsers },
          { path: "unverified", Component: UnverifiedUsers },
        ],
      },
      {
        path: "campaign",
        Component: CampaignIndex,
        children: [
          { index: true, Component: ApprovedCampaigns },
          { path: "unapproved", Component: UnapprovedCampaigns },
          { path: "suspicious", Component: SuspiciousCampaigns },
        ],
      },
      {
        path: "fund",
        Component: FundIndex,
        children: [
          { index: true, Component: ReleasedFunds },
          { path: "pending", Component: PendingReleases },
        ],
      },
      { path: "notifications", Component: Notifications },
    ],
  },
]);
