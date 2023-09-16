import { NavLink } from 'react-router-dom';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <NavLink activeClassName={classes.active} to='/'>
        <div className={classes.logo}>React Auth</div>
      </NavLink>
      <nav>
        <ul>
          <li>
            <NavLink activeClassName={classes.active} to='/auth'>Login</NavLink>
          </li>
          <li>
            <NavLink activeClassName={classes.active} to='/profile'>Profile</NavLink>
          </li>
          <li>
            <button>Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
