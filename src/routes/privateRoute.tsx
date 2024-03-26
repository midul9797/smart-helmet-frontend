import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../service/auth.service";

const PrivateRoute = ({ children }) => {
  const loggedIn = isLoggedIn();

  if (loggedIn) {
    return children;
  } else return <Navigate to={"/"} replace={true} />;
};
export default PrivateRoute;
