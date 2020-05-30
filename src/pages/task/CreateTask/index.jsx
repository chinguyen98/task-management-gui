import React from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { NavLink, useHistory } from 'react-router-dom';
import { createTask } from '../../../services/task.service';

function TaskCreatePage() {
  const { handleSubmit, register, errors } = useForm();
  const history = useHistory();

  const handleCreateTask = async (data) => {
    try {
      await createTask(data);
      history.push('/tasks', {
        flashMessage: { type: 'success', message: 'Create task successfully' },
      })
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Container>
      <h1 className='text-center my-3'>Create new task</h1>
      <Row className='justify-content-center'>
        <Col sm={10} md={7}>
          <NavLink className='btn btn-secondary my-3' to='/tasks'>
            Return to dashboard
          </NavLink>
          <Form onSubmit={handleSubmit(handleCreateTask)}>
            <FormGroup>
              <Label for='title'>Title</Label>
              <Input
                name='title'
                id='title'
                type='text'
                placeholder='Write your title here...'

                innerRef={register({
                  required: true,
                })}
              />
              {
                errors.title?.type === 'required'
                && <div className="alert alert-danger mt-2">
                  Title field is required!
                  </div>
              }
            </FormGroup>
            <FormGroup>
              <Label for='description'>Description</Label>
              <Input
                name='description'
                id='description'
                type='text'
                placeholder='Write your description here...'

                innerRef={register({
                  required: true,
                })}
              />
              {
                errors.description?.type === 'required'
                && <div className="alert alert-danger mt-2">
                  Description field is required!
                  </div>
              }
            </FormGroup>
            <Row>
              <Col xl={4} md={6} xs={6} lg={5}>
                <FormGroup>
                  <Input
                    type='submit'
                    value='Create new task'
                    className='btn btn-primary'
                  />
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container >
  )
}

export default TaskCreatePage;