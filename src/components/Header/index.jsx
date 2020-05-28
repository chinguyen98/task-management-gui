import React from 'react';
import { Nav } from 'reactstrap';
import './header.scss';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header className='header'>
      <Nav className='header__nav justify-content-center p-2'>
        <NavLink exact to='/'>
          <h1 className='header__title'>Task Management</h1>
        </NavLink>
      </Nav>
    </header>
  )
}

export default Header;