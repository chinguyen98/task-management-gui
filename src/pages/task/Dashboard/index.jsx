import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Alert } from 'reactstrap';
import FlashMessage from '../../../components/FlashMessage';
import { UserContext } from '../../../contexts/userContext';
import { TaskContext } from '../../../contexts/taskContext';
import { getTasks } from '../../../services/auth.service';

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
  const { tasks, setTasks } = useContext(TaskContext);

  const renderTasks = (tasks) => {
    return (
      <div>
        {
          tasks.map((task) => (
            <h1>{task.title}</h1>
          ))
        }
      </div>
    )
  }

  useEffect(() => {
    try {
      getTasks().then(data => {
        console.log(data)
        setTasks([...data]);
      });
    } catch (err) {
      console.log('error!!!!!!!!!')
    }
  }, [setTasks])

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
          {
            tasks.length === 0 && <Alert className='my-5 text-center' color='danger'>Tasks not found!</Alert>
          }
          {
            tasks.length !== 0 && renderTasks(tasks)
          }
        </Col>
      </Row>
    </Container>
  )
}

export default TaskDashBoardPage;