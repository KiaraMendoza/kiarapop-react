import React from 'react';
import { useAuthContext } from '../../contexts/auth';
import { Link } from "react-router-dom";
import { logout } from '../../api/auth';

const Header = () => {
  const { isLogged, onLogout } = useAuthContext();

  const handleLogout = () => {
    logout().then(onLogout);
  };

  return (
    <nav className="navbar navbar-expand navbar-light bg-light">
      <ul className="nav navbar-nav ml-auto">
        {isLogged &&
          <>
            <li className="nav-item">
              <Link to="/adverts">Adverts</Link>
            </li>
            <li className="nav-item">
              <Link to="/adverts/new">Create new Advert</Link>
            </li>
          <li className="nav-item" onClick={handleLogout}>
              <Link to="/">Log out</Link>
            </li>
          </>
        }
        {!isLogged &&
          <li className="nav-item">
            <Link to="/login">Log in</Link>
          </li>
        }
      </ul>
    </nav>
  )
}

export default Header;