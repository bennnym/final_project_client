import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import './LoginModal.css'

import StudentSignUp from './StudentSignUp'

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

  console.log(isEmployer);

  
     if (isEmployer === undefined) {

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
      <h1>WHATSS UPP!</h1>
    )
  }

  else if ( isEmployer === false ) {
    return (
          <StudentSignUp />
    )
  }
    

};

export default SignupForm;