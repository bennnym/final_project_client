import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import './LoginModal.css'

import StudentSignUpForm from './StudentSignUpForm'
import EmployerSignUpForm from './EmployerSignUpForm'

const SignupForm = ( props ) => {
  const [ Employer, setEmployer ] = useState( undefined );
  const { isEmployer, setIsEmployer, isStudent, setIsStudent } = props

  

  const _handleEmployerClick = (event) => {
    event.preventDefault()
    setEmployer( true )
  }

    const _handleStudentClick = (event) => {
    event.preventDefault()
    setEmployer( false )
  }

  
     if (Employer !== true && Employer !== false) {

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
  } else if ( Employer ) {
    return (
      <EmployerSignUpForm
        isEmployer={isEmployer}
        setIsEmployer={setIsEmployer}
        isStudent={isStudent}
        setIsStudent={setIsStudent}
       />
    )
  }

  else if ( Employer === false ) {
    return (
      <StudentSignUpForm
        isEmployer={isEmployer}
        setIsEmployer={setIsEmployer}
        isStudent={isStudent}
        setIsStudent={setIsStudent}
       />
    )
  }
    

};

export default SignupForm;