import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function NavBar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext)
  return (
    <div className="navbar-test">

      {isLoggedIn && (
        <>
          <Link to={"/dashboard"}>Little Moments</Link>
          <p>My albums</p>
          <button onClick={logOutUser}>Logout</button>
        </>
      )}

      {!isLoggedIn && (
        <>
          <p>Little Moments</p>
          <Link to={"/login"}>Log in</Link>
          <Link to={"/signup"}>Sign up</Link>
        </>
      )}
    </div>
  );
}

export default NavBar;
