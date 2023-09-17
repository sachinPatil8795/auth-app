// import React, { useState } from 'react';

// const AuthContext = React.createContext({
//     token: '',
//     isLoggedIn: false,
//     login: (token) => {},
//     logout: () => {}
// });

// export const AuthContextProvider = (props) => {
//     const [token, setToken] = useState(null);

//     const userIsLoggedIn = !!token;

//     const loginHandler = (token) => {
//         setToken(token);
//     }

//     const logoutHandler = () => {
//         setToken(null);
//     }

//     const contextValue = {
//         token: token,
//         isLoggedIn: userIsLoggedIn,
//         login: loginHandler,
//         logout: logoutHandler
//     }
//   return (
//     <AuthContext.Provider value={contextValue}>
//       {props.children}
//     </AuthContext.Provider>
//   )
// }

// export default AuthContext;


import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [loginTime, setLoginTime] = useState(null);

  useEffect(() => {
    // Check if the token is expired on initial load
    const tokenExpirationTime = 300000; // 5 minutes in milliseconds
    const storedToken = localStorage.getItem("token");
    const storedLoginTime = localStorage.getItem("loginTime");

    if (storedToken && storedLoginTime) {
      const expirationTime = parseInt(storedLoginTime) + tokenExpirationTime;
      if (Date.now() < expirationTime) {
        setToken(storedToken);
        setIsLoggedIn(true);
        setLoginTime(storedLoginTime);
        startLogoutTimer();
      } else {
        logoutHandler();
      }
    }
  }, []);

  const loginHandler = (token) => {
    setToken(token);
    setIsLoggedIn(true);
    setLoginTime(Date.now().toString());
    localStorage.setItem("token", token);
    localStorage.setItem("loginTime", Date.now().toString());
    startLogoutTimer();
  };

  const logoutHandler = () => {
    setToken(null);
    setIsLoggedIn(false);
    setLoginTime(null);
    localStorage.removeItem("token");
    localStorage.removeItem("loginTime");
  };

  const startLogoutTimer = () => {
    const tokenExpirationTime = 300000; // 5 minutes in milliseconds
    setTimeout(() => {
      logoutHandler();
    }, tokenExpirationTime);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
        token: token,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
