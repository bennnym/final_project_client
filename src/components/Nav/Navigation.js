import React, { useState } from "react";
import {
	Navbar,
	NavDropdown,
	Form,
	FormControl,
	Button,
	Nav,
} from "react-bootstrap";
import "./Navigation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../assets/img/logo.png";
import LoginModal from "../LoginModal/LoginModal";
import LoginForm from "../LoginModal/LoginForm";
import SignupForm from "../LoginModal/SignupForm";
import { Link }	 from 'react-router-dom'
import { connect } from 'react-redux'

const Navigation = props => {
	const [SignInModalShow, setSignInModalShow] = useState(false);
	const [SignUpModalShow, setSignUpModalShow] = useState(false);

	let SignInModalClose = () => setSignInModalShow(false);
	let SignUpModalClose = () => setSignUpModalShow(false);

	const _logout = () => {
		if (props.employer) { props.dispatch({ type: 'SETEMPLOYER' })}
		if (props.student) { props.dispatch({ type: 'SETSTUDENT' })}
		localStorage.setItem("jwt", "");
		localStorage.setItem("email", "");
		localStorage.setItem("student", "");
		localStorage.setItem("employer", "");
	};


	return (
		<Navbar bg='dark' variant='dark' expand='lg'>
			<Link to="/" className="navbar-brand">
				<img id='logo' src={logo} alt='logo' />
				</Link>
			<Navbar.Toggle aria-controls='basic-navbar-nav' />
			<Navbar.Collapse id='basic-navbar-nav'>
				<Nav className='mr-auto'>
				<Link className="nav-link" to="/auctions">
						<FontAwesomeIcon icon='user-graduate' /> Auctions
					</Link>
					<Nav.Link href=''>
						<FontAwesomeIcon icon='building' /> Employers
					</Nav.Link>

					{props.employer || props.student ? (
						<NavDropdown title='My Account' id='basic-nav-dropdown'>
							<NavDropdown.Item href='#action/3.1'>Action</NavDropdown.Item>
							<NavDropdown.Item href='#action/3.2'>
								Another action
							</NavDropdown.Item>
							<NavDropdown.Item href='#action/3.3'>Something</NavDropdown.Item>
							<NavDropdown.Divider />
							{/* <NavDropdown.Item  > */}
								<Link className="dropdown-item" onClick={_logout} to="/">Logout</Link>
							{/* </NavDropdown.Item> */}
						</NavDropdown>
					) : (
						<>
							<Nav.Link
								href='#'
								variant='primary'
								onClick={() => setSignInModalShow(true)}>
								<FontAwesomeIcon icon='sign-in-alt' /> Sign in
							</Nav.Link>

							<Nav.Link
								href='#'
								variant='primary'
								onClick={() => setSignUpModalShow(true)}>
								<FontAwesomeIcon icon='user-plus' /> Sign up
							</Nav.Link>
						</>
					)}

					<LoginModal
						header='Sign In'
						show={SignInModalShow}
						onHide={SignInModalClose}
						form={
							<LoginForm
							
							/>
						}
					/>

					<LoginModal
						header='Sign Up'
						show={SignUpModalShow}
						onHide={SignUpModalClose}
						form={
							<SignupForm
							/>
						}
					/>
				</Nav>
				<Form inline>
					<FormControl
						type='text'
						placeholder='Find candidates...'
						className='mr-sm-2'
					/>
					<Button variant='outline-success'>Search</Button>
				</Form>
			</Navbar.Collapse>
		</Navbar>
	);
};

const mapStateToProps = (state) => {
	return {
		student: state.student,
		employer: state.employer
	};
}

export default connect(mapStateToProps)(Navigation);

