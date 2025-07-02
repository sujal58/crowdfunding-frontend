import "./App.css";
import "react-tooltip/dist/react-tooltip.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Route.tsx";
import AdminDashboardPage from "./components/Pages/DashboardPage/AdminDashboardPage.tsx";

function App() {
  return <>{<RouterProvider router={router} />}</>;
}

export default App;
