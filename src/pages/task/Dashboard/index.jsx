import React, { useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import FlashMessage from '../../../components/FlashMessage';

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

  return (
    <Container>
      <h1 className='text-center my-3'>Dashboard</h1>
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