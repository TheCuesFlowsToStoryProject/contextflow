import React, { useContext } from "react";
import "./header.css";
import { Link } from "react-router-dom";
import { UserContext } from "../../provider/UserProvider";
import { useHistory } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import logo from "../../assets/logo.png";

const Header = () => {
  const history = useHistory();
  const value = useContext(UserContext);
  const [userData, setUserData] = value.user;
  const LogOut = () => {
    const user2 = {
      _id: "demo",
      name: "demo",
      email: "demo@gmail.com",
    };
    setUserData({
      token: undefined,
      user: undefined,
      user2,
    });
    localStorage.setItem("auth-token", "");
    history.push("/");
  };
  return (
    <Navbar collapseOnSelect expand="lg" className="nav" variant="dark">
      <Navbar.Brand>
        <Link style={{ textDecoration: "none" }} to="/">
          <img className="logo-wrapper" src={logo} alt="logo" />
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link
            as={Link}
            to="/contextlist"
            style={{
              textDecoration: "none",
              color: "white",
              fontSize: "15px",
            }}
          >
            Context List
          </Nav.Link>

          <Nav.Link
            as={Link}
            to="/anchor"
            style={{
              textDecoration: "none",
              color: "white",
              fontSize: "15px",
            }}
          >
            Anchor
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/search-context"
            style={{
              textDecoration: "none",
              color: "white",
              fontSize: "15px",
            }}
          >
            Search context
          </Nav.Link>
        </Nav>
        <Nav>
          {userData.user ? (
            <>
              <li
                style={{
                  cursor: "pointer",
                  textDecoration: "none",
                }}
                onClick={LogOut}
              >
                Logout
              </li>
            </>
          ) : (
            <>
              <Nav.Link
                as={Link}
                to="login"
                style={{
                  cursor: "pointer",
                  textDecoration: "none",
                }}
              >
                <li>Sign in</li>
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default Header;
