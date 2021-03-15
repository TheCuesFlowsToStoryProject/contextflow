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
        const userRes = await Axios.get('http://localhost:8080/auth/user', {
          headers: {'x-auth-token': token},
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
      if (!tokenRes.data) {
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
      }
      // else {
      //   const obj = {
      //     _id: 'demo',
      //     name: 'demo',
      //     mail: 'demo@gmail.com',
      //   };
      //   setUserData({
      //     user: obj,
      //   });
      // }
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

// import React, {useEffect, createContext, useState} from 'react';
// import Axios from 'axios';
// export const UserContext = createContext();

// export default function UserProvider(props) {
//   const [userData, setUserData] = useState('');
//   const [state, setState] = useState(false);

//   useEffect(() => {
//     const checkLoggedIn = async () => {
//       let token = localStorage.getItem('auth-token');
//       if (token === null) {
//         localStorage.setItem('auth-token', '');
//         token = '';
//       }
//       const tokenRes = await Axios.post(
//         'http://localhost:8080/tokenIsValid',
//         null,
//         {headers: {'x-auth-token': token}}
//       );

//       if (tokenRes.data) {
//         setState(true);
//         const userRes = await Axios.get('http://localhost:8080/auth/user', {
//           headers: {'x-auth-token': token},
//         });
//         setUserData({
//           token,
//           user: userRes.data,
//         });
//       } else {
//         setState(false);
//         const obj = {
//           _id: 'demo',
//           name: 'demo',
//           mail: 'demo@gmail.com',
//         };
//         setUserData({
//           user: obj,
//         });
//       }
//     };

//     checkLoggedIn();
//   }, [state]);
//   const value = {
//     user: [userData, setUserData],
//   };
//   return (
//     <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
//   );
// }
