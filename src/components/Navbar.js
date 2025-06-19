import { useEffect } from "react";
import "../styles/navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const path = location.pathname.toLowerCase();
  
  if (!token && path !== "/login" && path !== "/register") {
    navigate("/login");
  }
  console.log("Current Path:", location.pathname);
  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <nav>
        <ul>
          {token ? (
            <>
              <li>
                <Link className="link" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="link" to="/users">
                  Users
                </Link>
              </li>
              <li>
                <Link className="link" to="/profile">
                  Profile
                </Link>
              </li>
              <li>
                <Link className="link" to="/posts">
                  Posts
                </Link>
              </li>
              <li>
                <Link className="link" onClick={handleLogOut}>
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <>
              <div style={{ float: "right" }}>
                <li>
                  <Link className="link" to="/register">
                    Register
                  </Link>
                </li>
                <li>
                  <Link className="link" to="/login">
                    Login
                  </Link>
                </li>
              </div>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
