import React from 'react';
import { Container } from 'reactstrap';
import './homepage.scss';

HomePage.propTypes = {}

function HomePage() {
  return (
    <div className='homepage'>
      <Container className='text-center'>
        <h3>Welcome!</h3>
        <p>U must login firstly before use website</p>
        <div className='homepage__btn-container'>
          <button className='btn btn-success mr-1'>Login</button>
          <button className='btn btn-primary ml-1'>Register</button>
        </div>
      </Container>
    </div>
  )
}

export default HomePage;