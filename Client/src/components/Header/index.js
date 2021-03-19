import React, {useContext} from 'react';
import './header.css';
import {Link} from 'react-router-dom';
import {UserContext} from '../../provider/UserProvider';
import {useHistory} from 'react-router-dom';
import logo from '../../assets/logo.png';
const Header = () => {
  const history = useHistory();
  const value = useContext(UserContext);
  const [userData, setUserData] = value.user;
  const LogOut = () => {
    const user2 = {
      _id: 'demo',
      name: 'demo',
      email: 'demo@gmail.com',
    };
    setUserData({
      token: undefined,
      user: undefined,
      user2,
    });
    localStorage.setItem('auth-token', '');
    history.push('/');
  };
  return (
    <div className="header-wrapper">
      <div className="logo-wrapper">
        <Link style={{textDecoration: 'none'}} to="/">
          <img className="logo-wrapper" src={logo} alt="logo" />
        </Link>
      </div>
      <div className="navbar">
        <ul>
          <Link style={{textDecoration: 'none'}} to="/contextflow">
            <li>Contextflow</li>
          </Link>
          <Link style={{textDecoration: 'none'}} to="/anchor">
            <li>Anchor</li>
          </Link>
          {userData.user ? (
            <>
              <li style={{cursor: 'pointer'}} onClick={LogOut}>
                Logout
              </li>
            </>
          ) : (
            <>
              <Link style={{textDecoration: 'none'}} to="login">
                <li>Sign in</li>
              </Link>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};
export default Header;
