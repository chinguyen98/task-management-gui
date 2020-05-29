import React, { useState } from 'react';
import { Container, FormGroup, Form, Label, Input, Row, Col } from 'reactstrap';
import { withRouter, NavLink, useHistory } from 'react-router-dom';
import FlashMessage from '../../components/FlashMessage';
import { useForm } from 'react-hook-form';
import { signIn } from '../../services/auth.service';

LoginPage.propTypes = {}

function LoginPage({ location, history: historyProp }) {
  let redirectFlashMessage = {};
  const { pathname, search, state } = location;
  const history = useHistory();

  if (state && state.flashMessage) {
    redirectFlashMessage = state.flashMessage;

    const clonedState = { ...state };
    delete clonedState.flashMessage;
    historyProp.replace({ pathname, search, state: clonedState });
  }

  const [flashMessage, setFlashMessage] = useState(redirectFlashMessage);
  const { handleSubmit, register, errors } = useForm();

  const login = async (data) => {
    try {
      const token = await signIn(data);
      localStorage.setItem('token', token);
      history.push('/tasks', {
        flashMessage: { type: 'success', message: 'Login successfully. Enjoy!' },
      });
    } catch (err) {
      const errMessage = err.response.data.message;
      setFlashMessage({
        ...flashMessage,
        message: errMessage,
        type: 'danger',
      })
    }
  }

  return (
    <Container className='registerPage mt-5'>
      <h3>Login</h3>
      <Row className='justify-content-center'>
        <Col sm={10} md={7}>
          <FlashMessage
            message={flashMessage.message}
            type={flashMessage.type}
            close={() => { setFlashMessage({}) }}
          />
          <Form onSubmit={handleSubmit(login)}>
            <FormGroup>
              <Label for='username'>Username</Label>
              <Input
                type='text'
                name='username'
                id='username'
                placeholder='Ex: nguyendacchi123'
                className='mb-3'

                innerRef={register({
                  required: true,
                })}
              />
              {
                errors.username?.type === 'required'
                && <div className="alert alert-danger">
                  Username field is required!
                  </div>
              }
            </FormGroup>
            <FormGroup>
              <Label for='password'>Password</Label>
              <Input
                type='password'
                name='password'
                id='password'
                className='mb-3'

                innerRef={register({
                  required: true,
                })}
              />
              {
                errors.password?.type === 'required'
                && <div className="alert alert-danger">
                  Password field is required!
                  </div>
              }
            </FormGroup>
            <Row>
              <Col xl={3} md={4} xs={4}>
                <FormGroup>
                  <Input className='btn btn-primary' type='submit' value='Login' />
                </FormGroup>
              </Col>
            </Row>
          </Form>
          <NavLink exact to='/register'>
            <p>Register new account</p>
          </NavLink>
        </Col>
      </Row>
    </Container>
  )
}

export default withRouter(LoginPage);