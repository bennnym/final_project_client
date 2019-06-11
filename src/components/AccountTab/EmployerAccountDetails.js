import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios';
import links from '../../links'


const EmployerAccountDetails = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    _getPlaceHolderInfo()
  },[])

  const _getPlaceHolderInfo = () => {
    axios.get(links.root + `employer/${localStorage.id}`).then((res) => {
      console.log(res)
      setEmail(res.data.email)
    })
  }

  const _passwordInput = (e) => {
    setPassword(e.target.value)
  }

  const _passwordConfirmInput = (e) => {
    setPasswordConfirm(e.target.value)
  }

  const _emailInput = (e) => {
    setEmail(e.target.value)
  }

  const _handleSubmit = (e) => {
    e.preventDefault()
    if ( !password || !passwordConfirm ){
      setError(true)
      return
    }

    const request = {
      id: localStorage.id,
      email, 
      password, 
      password_confirmation: passwordConfirm
    }

    axios.post(links.root + 'employer/update', request).then((res) => {
      if ( res.status === 200 ){
        setError(false)
      }
    }).catch( err  => {
      setError(true)
    })
  }

  return(
    <Form className="account-form">
      <Form.Group controlId="formGroupEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control onChange={_emailInput}  type="email" placeholder={email} />
      </Form.Group>
      <Form.Group controlId="formGroupPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control onChange={_passwordInput} type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group controlId="formGroupPassword">
        <Form.Label>Password Confirmation</Form.Label>
        <Form.Control onChange={_passwordConfirmInput} type="password" placeholder="Password" />
      </Form.Group>

      <Button onClick={_handleSubmit} variant="primary" type="submit">
        Submit
  </Button>
      {error === true ?
        <div className="error-employer-form">
          Error. Make sure you have entered your password.
        </div>
        : error === false ?
          <div className="success-employer-form">
            Your details have been updated succesfully.
        </div>
          :
          ''}
    </Form>

  );
}

export default EmployerAccountDetails;