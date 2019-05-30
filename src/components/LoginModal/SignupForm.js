import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import './LoginModal.css'

import StudentSignUpForm from './StudentSignUpForm'
import EmployerSignUpForm from './EmployerSignUpForm'

const SignupForm = ( props ) => {
  const [ isEmployer, setIsEmployer ] = useState( undefined )

  const _handleEmployerClick = (event) => {
    event.preventDefault()
    setIsEmployer( true )
  }

    const _handleStudentClick = (event) => {
    event.preventDefault()
    setIsEmployer( false )
  }

  
     if (isEmployer !== true && isEmployer !== false) {

    return (
    <div className="choice">
      <Button onClick={ _handleEmployerClick }  variant="primary" size="lg">
        Employer
    </Button>

      <Button onClick={ _handleStudentClick } variant="primary" size="lg">
        Student
    </Button>

    </div>
    )
  } else if ( isEmployer ) {
    return (
      <EmployerSignUpForm />
    )
  }

  else if ( isEmployer === false ) {
    return (
      <StudentSignUpForm />
    )
  }
    

};

export default SignupForm;