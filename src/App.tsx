import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Route.ts";


function App() {
  return <>{<RouterProvider router={router} />}</>;
}

export default App;
