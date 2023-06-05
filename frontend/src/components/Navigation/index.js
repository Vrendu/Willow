import {React, useState} from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignUpFormModal from '../SignUpFormModal';
import './Navigation.css';
import { useDispatch } from 'react-redux';
import * as sessionActions from "../../store/session";
import SearchBar from '../SearchBar/SearchBar';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { fetchDataForSearch } from '../../store/listingsActions';
import { FaSearch, FaGithub, FaLinkedin } from 'react-icons/fa';
import { useEffect } from 'react';

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const [searchResults, setSearchResults] = useState([]);
 const history = useHistory();
  const [query, setQuery] = useState('');

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
  const handleSearch = async e => {
    e.preventDefault();
    const response = await fetch(`/api/search?q=${query}`);
    const data = await response.json();
    history.push('/searchresults');
    setSearchResults(data.results);
  };
  const data = fetchDataForSearch();

  const [showMenu, setShowMenu] = useState(false);
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  useEffect(() => {
    if (!showMenu) return;
    const closeMenu = () => {
      setShowMenu(false);
    };
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  return (
    <div className='navbar'>
      <div className="home">
          <NavLink to="/">
            <img src="/logo.png" className="logo" alt="Zillow logo"/>
          </NavLink>
      </div>
      <div className="navbar-links">
        <div className="searchbar">
          <Link to="/searchresults">
            <FaSearch className="icon" /> Search Listings
          </Link>
          <span className='aboutme' onClick={openMenu}>About Me</span>
          {showMenu && (
            <ul className="aboutme-dropdown">
              <li> 
                 <a href="https://github.com/Vrendu">
                    <FaGithub className="icon" /> Github
                 </a>
              </li>
              <br></br>
              <li>
                <a href="https://www.linkedin.com/in/vamshi-renduchintala-216571271/">
                  <FaLinkedin className="icon" /> LinkedIn
                </a>
              </li>
              <br></br>
              <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </li>
            </ul>
          )}
         
          
        </div>
        {sessionLinks}
      </div>
     
    </div>
  );
}

export default Navigation;
