import React, { useState, useContext } from 'react';
import { Container, Row, Col } from 'reactstrap';
import FlashMessage from '../../../components/FlashMessage';
import { UserContext } from '../../../contexts/userContext';

function TaskDashBoardPage({ location, history }) {
  let redirectFlashMessage = {};
  const { pathname, search, state } = location;

  if (state && state.flashMessage) {
    redirectFlashMessage = state.flashMessage;

    const clonedState = { ...state };
    delete clonedState.flashMessage;
    history.replace({ pathname, search, state: clonedState })
  }

  const [flashMessage, setFlashMessage] = useState(redirectFlashMessage);
  const { user } = useContext(UserContext);

  return (
    <Container>
      <h1 className='text-center my-3'>Dashboard</h1>
      {
        user && <h2 className='text-center'>Hello {user.username}!</h2>
      }
      <Row className='justify-content-center'>
        <Col sm={10} md={7}>
          <FlashMessage
            message={flashMessage.message}
            type={flashMessage.type}
            close={() => { setFlashMessage({}) }}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default TaskDashBoardPage;