import React, { useState } from 'react';
import { Container, FormGroup, Form, Label, Input, Row, Col } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { useHistory, NavLink, Redirect } from 'react-router-dom';
import { signUp, decodeToken } from '../../services/auth.service';
import './registerPage.scss';

RegisterPage.propTypes = {};

function RegisterPage() {
  const [errorMsg, setErrorMsg] = useState(null);
  const { handleSubmit, register, errors, setError, clearError, watch } = useForm();
  const history = useHistory();

  const registerUser = async (data) => {
    if (checkUserName() && checkPassword() && checkConfirmPassword()) {
      delete data.confirmPassword;
      try {
        await signUp(data);
        history.push('/login', {
          flashMessage: { type: 'success', message: 'Register successfully' },
        });
      } catch (err) {
        const errMessage = err.response.data.message;
        setErrorMsg(errMessage);
      }
    } else {
      console.log('ERROR!');
    }
  }

  const checkUserName = () => {
    const watchData = watch(['username']);
    const value = watchData.username;

    if (value === '') {
      setError('username', 'required');
      return false;
    }
    if (value.length < 5) {
      setError('username', 'minLength');
      return false;
    }

    clearError('username');
    return true;
  }
  const checkPassword = (e) => {
    const watchData = watch(['password', 'confirmPassword']);
    const value = watchData.password;

    if (value === watchData.confirmPassword) {
      clearError('confirmPassword');
    } else {
      setError('confirmPassword', 'notMatchPassword');
    }
    if (value === '') {
      setError('password', 'required');
      return false;
    }
    if (value.length < 8) {
      setError('password', 'minLength');
      return false;
    }
    if (!value.match(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)) {
      setError('password', 'weakPassword');
      return false;
    }
    clearError('password');
    return true;
  }
  const checkConfirmPassword = (e) => {
    const watchData = watch(['password', 'confirmPassword']);
    const value = watchData.confirmPassword;

    if (value !== watchData.password) {
      setError('confirmPassword', 'notMatchPassword');
      return false;
    }

    clearError('confirmPassword');
    return true;
  }

  return (
    <>
      {
        decodeToken() ?
          <Redirect to='/tasks'></Redirect>
          :
          <Container className='registerPage mt-5'>
            <h3>Register</h3>
            <Row className='justify-content-center'>
              <Col sm={10} md={7}>
                {
                  errorMsg !== null
                  && <div className="alert alert-danger">
                    {
                      errorMsg
                    }
                  </div>
                }
                <Form onSubmit={handleSubmit(registerUser)}>
                  <FormGroup>
                    <Label for='username'>Username</Label>
                    <Input
                      type='text'
                      name='username'
                      id='username'
                      placeholder='Ex: nguyendacchi123'
                      className='mb-3'

                      onInput={checkUserName}
                      innerRef={register}
                    />
                    {
                      errors.username?.type === 'required'
                      && <div className="alert alert-danger">
                        Username field is required!
                  </div>
                    }
                    {
                      errors.username?.type === 'minLength'
                      && <div className="alert alert-danger">
                        Your username field length must equal or longer than 5!
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
                      onInput={checkPassword}

                      innerRef={register}
                    />
                    {
                      errors.password?.type === 'required'
                      && <div className="alert alert-danger">
                        Password field is required!
                  </div>
                    }
                    {
                      errors.password?.type === 'minLength'
                      && <div className="alert alert-danger">
                        Your password field length must equal or longer than 8!
                  </div>
                    }
                    {
                      errors.password?.type === 'weakPassword'
                      && <div className="alert alert-danger">
                        Password too weak!
                  </div>
                    }
                  </FormGroup>
                  <FormGroup>
                    <Label for='confirmPassword'>Confirm Password</Label>
                    <Input
                      type='password'
                      name='confirmPassword'
                      id='confirmPassword'
                      className='mb-3'
                      onInput={checkConfirmPassword}

                      innerRef={register}
                    />
                    {
                      errors.confirmPassword?.type === 'notMatchPassword'
                      && <div className="alert alert-danger">
                        Confirm password not match!
                  </div>
                    }
                  </FormGroup>
                  <Row>
                    <Col xl={3} md={4} xs={4}>
                      <FormGroup>
                        <Input className='btn btn-success' type='submit' value='Register' />
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
                <NavLink exact to='/login'>
                  <p>Already have account? Login!</p>
                </NavLink>
              </Col>
            </Row>
          </Container>
      }
    </>
  )
}

export default RegisterPage;