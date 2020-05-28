import React from 'react';
import { Nav } from 'reactstrap';
import './header.scss';

function Header() {
  return (
    <header className='header'>
        <Nav className='header__nav justify-content-center p-2'>
          <h1 className='header__title'>Task Management</h1>
        </Nav>
    </header>
  )
}

export default Header;