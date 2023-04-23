import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignUpFormModal from '../SignUpFormModal';
import './Navigation.css';


function Navigation() {
  const sessionUser = useSelector(state => state.session.user);
 
  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <div className="session-links">
           <LoginFormModal />
          <SignUpFormModal />
        </div> 
      </>
    );
  }

  return (
    <ul>
        <div className="home">
          <NavLink exact to="/">

          <div class="logo-container">
            <img src="/logo.png" class="logo" alt="Zillow logo"/>
          </div>
          </NavLink>
          
        </div>
        {sessionLinks}
    </ul>
  );
}

export default Navigation;
