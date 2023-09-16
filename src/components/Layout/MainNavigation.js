import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { useContext} from "react";
import AuthContext from "../../store/auth-context";
import {useHistory} from 'react-router-dom';

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory()
  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout(null);
    history.replace('/auth');
  }

  return (
    <header className={classes.header}>
      <NavLink activeClassName={classes.active} to="/">
        <div className={classes.logo}>React Auth</div>
      </NavLink>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <NavLink activeClassName={classes.active} to="/auth">
                Login
              </NavLink>
            </li>
          )}

          {isLoggedIn && (
            <li>
              <NavLink activeClassName={classes.active} to="/profile">
                Profile
              </NavLink>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
