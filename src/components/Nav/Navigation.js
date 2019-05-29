import React, { useState } from 'react';
import { Navbar, NavDropdown, Form, FormControl, Button, Nav } from 'react-bootstrap';
import './Navigation.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../../assets/img/logo.png';
import LoginModal from '../LoginModal/LoginModal'
import LoginForm from '../LoginModal/LoginForm'
import SignupForm from '../LoginModal/SignupForm'

const Navigation = () => {
  const [ SignInModalShow, setSignInModalShow ] = useState( false );
  const [ SignUpModalShow, setSignUpModalShow ] = useState( false );

  const user = { present: false }

  let SignInModalClose = () => setSignInModalShow( false )
  let SignUpModalClose = () => setSignUpModalShow( false )

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="/"> <img id="logo" src={ logo } alt="logo"/></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#"><FontAwesomeIcon icon="user-graduate" /> Auctions</Nav.Link>
          <Nav.Link href="#"><FontAwesomeIcon icon="building" /> Employers</Nav.Link>
          
          { user.present ? <NavDropdown title="My Account" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
          </NavDropdown> : 
          <>
          <Nav.Link
           href="#"
           variant="primary"
           onClick={() => setSignInModalShow( true )}
           ><FontAwesomeIcon icon="sign-in-alt"/> Sign in
           </Nav.Link>

          <Nav.Link 
          href="#"
          variant="primary"
          onClick={() => setSignUpModalShow( true )}
          ><FontAwesomeIcon icon="user-plus" /> Sign up
          </Nav.Link>
          </>
          }

          <LoginModal
            header="Sign In"
            show={SignInModalShow}
            onHide={SignInModalClose}
            form={ <LoginForm/> }
            />

           <LoginModal
           header="Sign Up"
            show={SignUpModalShow}
            onHide={SignUpModalClose}
            form={<SignupForm />}
          /> 
          

        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Find candidates..." className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation;