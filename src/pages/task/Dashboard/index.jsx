import React, { useState, useContext, useEffect, useRef } from 'react';
import { Container, Row, Col, Alert } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import FlashMessage from '../../../components/FlashMessage';
import { UserContext } from '../../../contexts/userContext';
import { TaskContext } from '../../../contexts/taskContext';
import TaskItem from '../../../components/TaskItem';
import { getTasks } from '../../../services/task.service';
import SearchBar from '../../../components/SearchBar';

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
  const [searchText, setSearchText] = useState('');
  const [mode, setMode] = useState('SHOW')//SHOW & SEARCH
  const [status, setStatus] = useState('ALL');
  const typingRef = useRef(null);

  const handleSearch = async () => {
    try {
      const data = await getTasks(searchText, status);
      if (data.length === 0) {
        setMode('SEARCH');
      }
      else {
        setMode('SHOW');
      }
      setTasks(data);
    } catch (err) {
      console.log('search err');
    }
  }

  useEffect(() => {
    handleSearch();
  }, [searchText, status])

  const handleTyping = (e) => {
    const typingSearch = e.target.value;
    if (typingRef.current) {
      clearTimeout(typingRef.current);
    }

    typingRef.current = setTimeout(() => {
      setSearchText(typingSearch.toLowerCase());
    }, 300);
  }

  const handleChangeStatus = (e) => {
    setStatus(e.target.value);
  }

  const renderTasks = (tasks) => {
    const doneTask = tasks.filter(task => task.status === 'DONE');
    const unDoneTask = tasks.filter(task => task.status === 'OPEN');

    return (
      <div>
        <Row className='d-flex'>
          <Col md={9} >
            <Alert color='primary'>U have {tasks.length} tasks ({doneTask.length} done and {unDoneTask.length} undone)</Alert>
          </Col>
          <Col md={3}>
            <div>
              <NavLink className='btn btn-primary mt-1' to='/tasks/createTask'>
                Create task
              </NavLink>
            </div>
          </Col>
        </Row>
        <SearchBar
          handleChangeStatus={handleChangeStatus}
          handleTyping={handleTyping}
          status={status}
        />
        <div className='mt-2'>
          {
            tasks.map((task) => (
              <TaskItem key={task.id} task={task}></TaskItem>
            ))
          }
        </div>
      </div>
    )
  }

  useEffect(() => {
    try {
      getTasks().then(data => {
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
            (tasks.length === 0 && mode === 'SHOW')
            && <div className='text-center'>
              <Alert className='mt-5 mb-1 text-center' color='danger'>Tasks not found!</Alert>
              <NavLink className='btn btn-primary mt-1' to='/tasks/createTask'>
                Create new task
              </NavLink>
            </div>
          }
          {
            (tasks.length === 0 && mode === 'SEARCH')
            && <div>
              <div>
                <NavLink className='btn btn-primary mt-1 mb-3' to='/tasks/createTask'>
                  Create task
              </NavLink>
              </div>
              <SearchBar
                handleChangeStatus={handleChangeStatus}
                handleTyping={handleTyping}
                status={status}
              />
              <Alert className='mt-1 mb-3 text-center' color='danger'>Tasks not found!</Alert>
            </div>
          }
          {
            (tasks.length !== 0 && mode === 'SHOW') && renderTasks(tasks)
          }
        </Col>
      </Row>
    </Container>
  )
}

export default TaskDashBoardPage;