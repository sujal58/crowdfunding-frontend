import "./App.css";
import "react-tooltip/dist/react-tooltip.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Route.tsx";
import useAuth from "./Context/AuthContext.tsx";
import useNotification from "./hooks/useNotification.ts";

function App() {
  const { userId } = useAuth();
  useNotification(userId);
  return <>{<RouterProvider router={router} />}</>;
}

export default App;
