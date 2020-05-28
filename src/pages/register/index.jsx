import React from 'react';
import { Container, FormGroup, Form, Label, Input, Row, Col } from 'reactstrap';
import './registerPage.scss';

RegisterPage.propTypes = {};

function RegisterPage() {
  return (
    <Container className='registerPage mt-5'>
      <h3>Register</h3>
      <Row className='justify-content-center'>
        <Col sm={10} md={7}>
          <Form>
            <FormGroup>
              <Label for='username'>Username</Label>
              <Input type='text' name='username' id='username' placeholder='Ex: nguyendacchi123' />
            </FormGroup>
            <FormGroup>
              <Label for='password'>Password</Label>
              <Input type='password' name='password' id='password' />
            </FormGroup>
            <FormGroup>
              <Label for='confirmPassword'>Confirm Password</Label>
              <Input type='password' name='confirmPassword' id='confirmPassword' />
            </FormGroup>
            <Row>
              <Col xl={3} md={4} xs={4}>
                <FormGroup>
                  <Input className='btn btn-success' type='submit' value='Register' />
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default RegisterPage;