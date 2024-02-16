import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="navbar-test">
      <Link to={"/"}>Little Moments</Link>
      <p>My albums</p>
      <Link to={"/login"}>Log in</Link>
      <Link to={"/signup"}>Sign up</Link>
    </div>
  );
}

export default NavBar;
