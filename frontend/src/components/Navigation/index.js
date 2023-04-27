import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignUpFormModal from '../SignUpFormModal';
import './Navigation.css';
import { useDispatch } from 'react-redux';
import * as sessionActions from "../../store/session";

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const handleDemoLogin = async () => {
    try {
      dispatch(sessionActions.login({credential:"Demo", password: "demoaccount"}));
    } catch (error) {
      console.error(error);
    }
  };

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <div className="session-links">
           <span className="demo" onClick={()=> handleDemoLogin()}>Demo Login</span> 
           <LoginFormModal />
          <SignUpFormModal />
        </div> 
      </>
    );
  }

  return (
    <>
      
          <div className="home">
            <NavLink to="/">

            <div className="logo-container">
              <img src="/logo.png" className="logo" alt="Zillow logo"/>
            </div>
            </NavLink>
          </div>
      
      {sessionLinks}
    </>
  );
}

export default Navigation;
