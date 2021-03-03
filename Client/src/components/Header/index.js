import React, {useContext} from 'react';
import './header.css';
import {Link} from 'react-router-dom';
import {UserContext} from '../../provider/UserProvider';
import {useHistory} from 'react-router-dom';

const Header = () => {
  const history = useHistory();
  const value = useContext(UserContext);
  const [userData, setUserData] = value.user;
  const LogOut = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem('auth-token', '');
    history.push('/');
  };
  return (
    <div className="header-wrapper">
      <Link style={{textDecoration: 'none'}} to="/">
        <div className="logo">logo</div>
      </Link>
      <div className="navbar">
        <ul>
          <Link style={{textDecoration: 'none'}} to="/">
            <li>Home</li>
          </Link>
          <Link style={{textDecoration: 'none'}} to="/anchor">
            <li>Anchor</li>
          </Link>
          <Link style={{textDecoration: 'none'}} to="/wordphrase">
            <li>Word Phrase</li>
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
