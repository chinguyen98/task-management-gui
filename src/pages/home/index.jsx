import React from 'react';
import { Container } from 'reactstrap';
import './homepage.scss';
import { NavLink } from 'react-router-dom';

HomePage.propTypes = {}

function HomePage() {
  return (
    <div className='homepage'>
      <Container className='text-center'>
        <h3>Welcome!</h3>
        <p>U must login first before using website</p>
        <div className='homepage__btn-container'>
          <NavLink exact to='/login' className='btn btn-primary mr-1'>Login</NavLink>
          <NavLink exact to='/register' className='btn btn-success ml-1'>Register</NavLink>
        </div>
      </Container>
    </div>
  )
}

export default HomePage;