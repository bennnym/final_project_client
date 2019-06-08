import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Formik } from 'formik';
import { connect } from 'react-redux'
import * as yup from 'yup';
import links from '../../../src/links';
import axios from 'axios';
import './LoginForm.css'

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required()
});




const LoginForm = ( props ) => {
  const [email, setEmail] = useState('') // save user email
  const [password, setPassword] = useState('') // save pw
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState('');

  const _handleLogin = (event) => {
    event.preventDefault()

    const request = { "auth" : { email, password }}

    axios
    .post(links.root + 'employer_token', request )
    .then( res => {
      
      if ( res.status === 201 ){
        setLoggedIn( true )
        props.dispatch({ type: 'SETEMPLOYER' })
        localStorage.setItem('jwt', res.data.jwt)
        localStorage.setItem('employer', true)
        localStorage.setItem('email', email)
        setError(false)
      }
      axios.post(links.root + 'getid', {email}).then((res)=> {
        localStorage.setItem('id', res.data.id)
      }) 
    })
    .catch( err => {
      axios
      .post(links.root + 'student_token', request)
      .then( res => {
        if (res.status === 201) {
          setLoggedIn(true)
          props.dispatch({ type: 'SETSTUDENT' })
          localStorage.setItem('jwt', res.data.jwt)
          localStorage.setItem('student', true )
          localStorage.setItem('email', email)
          setError(false)
        } 
      }).catch( err => {
        setError( true )
      })
    });
  };

  const _storeEmail = (event) => {
    setEmail(event.target.value);
  }

  const _storePw = (event) => {
    setPassword(event.target.value)
  }
if (!loggedIn){
  return (
    <Formik
      validationSchema={schema}
      onSubmit={console.log}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
      }) => (
          <Form onChange={handleChange} noValidate action="/users">
            <Form.Group id="login" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="email"
                value={values.email}
                isInvalid={!!errors.email}
                isValid={touched.email && !errors.email}
                onChange={_storeEmail} type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                {errors.email ? <p style={{ color: "red" }}>{errors.email}</p> : "We'll never share your email with anyone else."}
              </Form.Text>
            </Form.Group>

            <Form.Group id="login" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                value={values.password}
                isInvalid={!!errors.password}
                isValid={touched.password && !errors.password}
                onChange={_storePw} type="password" placeholder="Password" />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Row id="error-row">
            <Button onClick={_handleLogin} variant="primary" type="submit">
              Submit
            </Button>
            <div >
                <p id="login-error">{ error? "Email or Password incorrect, please try again" : ''}</p>
            </div>
            </Form.Row>
          </Form>

        )}
    </Formik>
  )}
  if ( loggedIn === true ){
    return (
    <Alert variant="success">
      <Alert.Heading>Login Succesful</Alert.Heading>
      <p>
        Welcome back GradBay. Search for a grad on the home page or click here to see a full list of the current grads up for auction!
            </p>
    </Alert>
    )
  }
}

// export default LoginForm;

const mapStateToProps = (state) => {
  return {
    student: state.student,
    employer: state.employer
  };
}

export default connect(mapStateToProps)(LoginForm);
