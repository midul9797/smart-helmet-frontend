import { createBrowserRouter } from "react-router-dom";
import App from "../App";

import PrivateRoute from "./privateRoute";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },

  {
    path: "*",
    element: <App />,
  },
]);

export default routes;
