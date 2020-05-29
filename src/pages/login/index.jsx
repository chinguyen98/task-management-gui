import React, { useState } from 'react';
import { Container } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import FlashMessage from '../../components/FlashMessage';

LoginPage.propTypes = {}

function LoginPage({ location, history }) {
  let redirectFlashMessage = {};
  const { pathname, search, state } = location;

  if (state && state.flashMessage) {
    redirectFlashMessage = state.flashMessage;

    const clonedState = { ...state };
    delete clonedState.flashMessage;
    history.replace({ pathname, search, state: clonedState })
  }

  const [flashMessage, setFlashMessage] = useState(redirectFlashMessage);

  return (
    <Container className='Login'>
      <h1>Login Page</h1>
      <FlashMessage
        message={flashMessage.message}
        type={flashMessage.type}
        close={() => { setFlashMessage({}) }}
      />
    </Container>
  )
}

export default withRouter(LoginPage);