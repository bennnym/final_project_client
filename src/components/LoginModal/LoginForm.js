import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap'



const LoginForm = () => {

  const [email, setEmail] = useState('') // save user email
  const [password, setPassword] = useState('') // save pw
  
  const _handleLogin = ( event ) => {
    event.preventDefault()
    // console.log('email' , email )
    // console.log('pw', password )
  }

  const _storeEmail = ( event ) => {
    setEmail( event.target.value );
  }

  const _storePw = ( event ) => {
    setPassword( event.target.value )
  }

  return(
    <Form action="/users">
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control onChange={ _storeEmail } type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
    </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control onChange={ _storePw} type="password" placeholder="Password" />
      </Form.Group>
      <Button onClick={ _handleLogin } variant="primary" type="submit">
        Submit
  </Button>
    </Form>
  );
}

export default LoginForm;