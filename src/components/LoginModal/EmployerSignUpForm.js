import React, { useState } from "react";
import { Form, Button, InputGroup, Alert } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import "./LoginModal.css";
import { connect } from 'react-redux'

import links from "../../links";

const schema = yup.object({
	firstName: yup.string().required(),
	lastName: yup.string().required(),
	email: yup
		.string()
		.email()
		.required(),
	company: yup.string().required(),
	password: yup.string().required("Password is required"),
	passwordConfirmation: yup
		.string()
		.oneOf([yup.ref("password"), null], "Passwords must match"),

	// terms: yup.bool().required(),
});

const EmployerSignUpForm = props => {
	const { setIsEmployer } = props;

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [company, setCompany] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirmation, setPasswordConfirmation] = useState("");

	const [error, setError] = useState("GO"); // error handling for rendering

	const _handleSubmit = event => {
		event.preventDefault();

		const request = {
			first_name: firstName,
			last_name: lastName,
			email,
			company,
			password,
			password_confirmation: passwordConfirmation,
		};

		axios
			.post(links.root + "employer/create", request)
			.then(res => {
				if (res.status === 204) {
					setError(false);
					setIsEmployer(true);
				}

				axios
					.post(links.root + "employer_token", { auth: { email, password } })
					.then(res => {
						props.dispatch({ type: 'SETEMPLOYER' })
						localStorage.setItem("jwt", res.data.jwt);
						localStorage.setItem("employer", true);
						localStorage.setItem("email", email);
					});
			})
			.catch(err => {
				setError(true);
			});
	};

	if (error) {
		return (
			<Formik
				validationSchema={schema}
				// onSubmit={console.log}
				initialValues={
					{
						// firstName: 'Mark',
						// lastName: 'Otto',
					}
				}>
				{({
					handleSubmit,
					handleChange,
					handleBlur,
					values,
					touched,
					isValid,
					errors,
				}) => (
					<Form onChange={handleChange} noValidate onSubmit={_handleSubmit}>
						<Form.Row>
							<Form.Group md='4' controlId='validationFormik01'>
								<Form.Label>First name</Form.Label>
								<Form.Control
									type='text'
									name='firstName'
									placeholder='John'
									value={values.firstName}
									onChange={e => setFirstName(e.target.value)}
									isValid={touched.firstName && !errors.firstName}
									isInvalid={!!errors.firstName}
								/>
								<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
							</Form.Group>
							<Form.Group md='4' controlId='validationFormik02'>
								<Form.Label>Last name</Form.Label>
								<Form.Control
									type='text'
									name='lastName'
									placeholder='Smith'
									value={values.lastName}
									onChange={e => setLastName(e.target.value)}
									isValid={touched.firstName && !errors.lastName}
									isInvalid={!!errors.lastName}
								/>

								<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
							</Form.Group>
						</Form.Row>
						<Form.Row>
							<Form.Group id='email' md='4' controlId='validationFormikEmail'>
								<Form.Label>Email</Form.Label>
								<InputGroup>
									<InputGroup.Prepend>
										<InputGroup.Text id='inputGroupPrepend'>@</InputGroup.Text>
									</InputGroup.Prepend>
									<Form.Control
										type='text'
										placeholder='example@gmail.com'
										aria-describedby='inputGroupPrepend'
										name='email'
										value={values.email}
										onChange={e => setEmail(e.target.value)}
										isInvalid={!!errors.email}
										isValid={touched.email && !errors.email}
									/>
									<Form.Control.Feedback type='invalid'>
										{errors.email}
									</Form.Control.Feedback>
								</InputGroup>
							</Form.Group>

							<Form.Group id='company' md='6' controlId='validationFormik03'>
								<Form.Label>Company</Form.Label>
								<Form.Control
									type='text'
									placeholder='Google'
									name='company'
									value={values.company}
									onChange={e => setCompany(e.target.value)}
									isValid={touched.company && !errors.company}
									isInvalid={!!errors.company}
								/>

								<Form.Control.Feedback type='invalid'>
									{errors.company}
								</Form.Control.Feedback>
							</Form.Group>
						</Form.Row>

						<Form.Row>
							<Form.Group id='password' md='3' controlId='validationFormik04'>
								<Form.Label>Password</Form.Label>
								<Form.Control
									type='password'
									placeholder='Password'
									name='password'
									value={values.password}
									onChange={e => setPassword(e.target.value)}
									isInvalid={!!errors.password}
									isValid={touched.password && !errors.password}
								/>
								<Form.Control.Feedback type='invalid'>
									{errors.password}
								</Form.Control.Feedback>
							</Form.Group>

							<Form.Group
								id='password-confirm'
								md='3'
								controlId='validationFormik05'>
								<Form.Label>Password Confirmation</Form.Label>
								<Form.Control
									type='password'
									placeholder='Confirm'
									name='passwordConfirmation'
									value={values.passwordConfirmation}
									onChange={e => setPasswordConfirmation(e.target.value)}
									isInvalid={!!errors.passwordConfirmation}
									isValid={
										touched.passwordConfirmation && !errors.passwordConfirmation
									}
								/>

								<Form.Control.Feedback type='invalid'>
									{errors.passwordConfirmation}
								</Form.Control.Feedback>
							</Form.Group>
						</Form.Row>
						<Form.Row>
							<Form.Group>
								<Form.Check
									required
									name='terms'
									label='Agree to terms and conditions'
									onChange={handleChange}
									isInvalid={!!errors.terms}
									feedback={errors.terms}
									id='validationFormik0'
								/>
							</Form.Group>
							{error === true ? (
								<div id='error'>
									That Email is Already In Use, Please Try Again.
								</div>
							) : (
								""
							)}
						</Form.Row>
						<Button type='submit'>Submit form</Button>
					</Form>
				)}
			</Formik>
		);
	} else if (error === false) {
		return (
			<Alert variant='success'>
				<Alert.Heading>Account Successfully Created</Alert.Heading>
				<p>
					Welcome to GradBay. Search for a grad on the home page or click here
					to see a full list of the current grads up for auction!
				</p>
			</Alert>
		);
	}
};

const mapStateToProps = (state) => {
	return {
		employer: state.employer
	};
}

export default connect(mapStateToProps)(EmployerSignUpForm);

