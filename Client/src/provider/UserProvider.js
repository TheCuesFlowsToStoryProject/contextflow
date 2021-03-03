import React, {useEffect, createContext, useState} from 'react';
import Axios from 'axios';
export const UserContext = createContext();

export default function UserProvider(props) {
  const [userData, setUserData] = useState('');

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem('auth-token');
      if (token === null) {
        localStorage.setItem('auth-token', '');
        token = '';
      }
      const tokenRes = await Axios.post(
        'http://localhost:8080/tokenIsValid',
        null,
        {headers: {'x-auth-token': token}}
      );
      if (tokenRes.data) {
        const userRes = await Axios.get('http://localhost:8080/user', {
          headers: {'x-auth-token': token},
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };

    checkLoggedIn();
  }, []);
  const value = {
    user: [userData, setUserData],
  };
  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
}
