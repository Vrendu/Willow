import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
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

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <button className = "profile-icon"onClick={openMenu}>
        <i className="fa-solid fa-user-circle" />
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li>Welcome {user.username}</li>
          <li>
            <button>User Profile</button>
          </li>
          <li>
            <button onClick={logout}>Log Out</button>
          </li>

        </ul>
      )}
    </>
  );
}

export default ProfileButton;
