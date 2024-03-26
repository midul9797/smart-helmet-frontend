import { Navigate } from "react-router-dom";
import "./App.css";
import { isLoggedIn } from "./service/auth.service";

function App() {
  const loggedIn = isLoggedIn();
  return (
    <>
      {loggedIn ? (
        <Navigate to={"/dashboard"} replace={true} />
      ) : (
        <Navigate to={"/login"} replace={true} />
      )}
    </>
  );
}

export default App;
