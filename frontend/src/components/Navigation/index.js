import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import styles from './Navigation.module.css';
import Search from '../Search'

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <NavLink to="/create"><div>Create Post</div></NavLink>
        <span>
          <ProfileButton user={sessionUser} />
        </span>
      </>
    );
  } else {
    sessionLinks = (
      <>
        <NavLink to="/login"><div>Log In</div></NavLink>
        <NavLink to="/signup"><div>Sign Up</div></NavLink>
      </>
    );
  }

  return (
    <div className={styles.outerDiv}>
      <NavLink exact to="/"><div>Home</div></NavLink>
      {isLoaded && sessionLinks}
      <div id={styles.search}><Search /></div>
    </div>
  );
}

export default Navigation;