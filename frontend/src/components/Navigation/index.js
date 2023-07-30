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
          {/* <Link to="/searchresults">
            <FaSearch className="icon" /> Search Listings
          </Link> */}
          <span className='aboutme' onClick={openMenu}>About Me</span>
          {showMenu && (
            <ul className="aboutme-dropdown">
               <li>
                My name is Vamshi Renduchintala, and I am a full stack software engineer graduating from App Academy. I previously worked as a scientist at a molecular diagnostics company called Cepheid, before deciding to pursue my true interest and make the switch to software development. My primary experience so far is in developing fully functioning web applications utilizing React and Redux frontend, along with Ruby on Rails backend / Node.js backend.
              </li>
            </ul>
          )}
         <a href="https://github.com/Vrendu" target="_blank" rel="noopener noreferrer" className='github'>
                  <FaGithub className="icon" /> Github
         </a>
        <a href="https://www.linkedin.com/in/vamshi-renduchintala-216571271/" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin className="icon" /> LinkedIn
        </a>
        </div>
        {sessionLinks}
      </div>
     
    </div>
  );
}

export default Navigation;
