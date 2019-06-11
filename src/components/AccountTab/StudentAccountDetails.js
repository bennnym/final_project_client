import React, { useEffect, useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap';
import './Account.css'
import axios from 'axios';
import links from '../../links'

const StudentAccountDetails = () => {
  const [ email, setEmail] = useState('')
  const [gpa, setGpa] = useState('')
  const [reservePrice, setReservePrice] = useState('')
  const [university, setUniversity] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    _getplaceHolderData()
  },[])

  const _getplaceHolderData = () => {
    axios.get(links.root + `student/${localStorage.studentID}`).then((res) => {
      const { email, gpa, reserve_price, university } = res.data
      setEmail(email)
      setGpa(gpa)
      setReservePrice(reserve_price)
      setUniversity(university)
    })
  }

  const _emailInput = (e) => {
    setEmail(e.target.value)
  }

  const _gpaInput = (e) => {
    setGpa(e.target.value)
  }

  const _reservePriceInput = (e) => {
    setReservePrice(e.target.value)
  }

  const _universityInput = (e) => {
    setUniversity(e.target.value)
  }

  const _passwordInput = (e) => {
    setPassword(e.target.value)
  }

    const _passwordConfirmInput = (e) => {
    setPasswordConfirm(e.target.value)
  }

  const _handleSubmit = (e) => {
    e.preventDefault()
    if ( !password || !passwordConfirm ){ return }

    const request = {
      id: localStorage.studentID,
      email,
      gpa,
      reserve_price: reservePrice,
      university,
      password,
      password_confirmation: passwordConfirm
    }

    axios.post( links.root + 'student/update', request).then((res) => {
     if ( res.status === 200 ){
       setError( false)
       _getplaceHolderData()
     }
    }).catch( err  => {
      setError( true )
    })
}



  return(
    <Form className="account-form">
      <Form.Row className='student-account-form email-student'>
        <Form.Group  as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control onChange={_emailInput} type="email" placeholder={email} />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control onChange={_passwordInput} type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Password Confirmation</Form.Label>
          <Form.Control onChange={_passwordConfirmInput} type="password" placeholder="Password" />
        </Form.Group>
      </Form.Row>

      <Form.Row className='student-account-form'>
      <Form.Group controlId="formGridAddress1">
        <Form.Label>GPA</Form.Label>
          <Form.Control onChange={_gpaInput} placeholder={gpa} />
      </Form.Group>

      <Form.Group controlId="formGridAddress2">
        <Form.Label>Reserve Price</Form.Label>
        <Form.Control onChange={_reservePriceInput} placeholder={reservePrice} />
      </Form.Group>
          </Form.Row>
      
       <Form.Row className='student-account-form'>
        <Form.Group controlId="formGridCity">
          <Form.Label>University</Form.Label>
          <Form.Control onChange={_universityInput}  placeholder={university} />
        </Form.Group>
        { error === true ? 
        <div className="error-student-form">
          Error. Make sure you have entered your password.
        </div>
          : error === false ?
        <div className="success-student-form">
          Your details have been updated succesfully.
        </div>
          :
          ''}

       </Form.Row>
  
      <Button onClick={_handleSubmit} variant="primary" type="submit">
        Submit
  </Button>
    </Form>

  );
}

export default StudentAccountDetails;