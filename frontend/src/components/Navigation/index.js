import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignUpFormModal from '../SignUpFormModal';
import './Navigation.css';
import { useDispatch } from 'react-redux';
import * as sessionActions from "../../store/session";
import SearchBar from '../SearchBar/SearchBar';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

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
      <>
        <Link to = "/newlisting">
          <span className='create-listing'>
            Create Listing
          </span>
        </Link>
      <ProfileButton user={sessionUser} />
      </>
      
      
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
    <div className='navbar'>
      <div className='searchbar'>
        <SearchBar></SearchBar>
      </div>
      
          <div className="home">
            <NavLink to="/">
              <img src="/logo.png" className="logo" alt="Zillow logo"/>
            </NavLink>
          </div>
      <div class="navbar-links">
         {sessionLinks}
      </div>
     
    </div>
  );
}

export default Navigation;
