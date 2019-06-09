import React, { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import "./LoginModal.css";
import axios from "axios";
import moment from "moment";
import links from "../../../src/links";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import SignUpProfile from "./SignUpProfile";

const schema = yup.object({
	firstName: yup.string().required(),
	lastName: yup.string().required(),
	email: yup
		.string()
		.email()
		.required(),
	university: yup.string().required(),
	gpa: yup
		.number()
		.required()
		.positive()
		.integer(),
	reserve: yup
		.number()
		.required()
		.positive()
		.integer(),
	duration: yup
		.number()
		.required()
		.positive()
		.integer(),
	password: yup.string().required("Password is required"),
	// profilePhoto: yup.meta(),
	passwordConfirmation: yup
		.string()
		.oneOf([yup.ref("password"), null], "Passwords must match"),
});

const StudentSignUpForm = props => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [university, setUniversity] = useState("");
	const [gpa, setGPA] = useState("");
	const [reserve, setReserve] = useState("");
	const [auction, setAuctionEnd] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirmation, setPasswordConfirmation] = useState("");
	const [id, setId] = useState("");
	const [day, setDays] = useState("");
	const [hour, setHours] = useState("");
	const [minute, setMinutes] = useState("");
	const [second, setSeconds] = useState("");
	const [cv, setCV] = useState("");

	const [profilePhoto, setProfilePhoto] = useState(""); // for later

	const [error, setError] = useState("GO"); // for signup errors

	const [loading, setLoading] = useState(false); // for the loading icon

	const timeDisplay = db_time => {
		// this converts the time to dd,hh,mm,ss

		setInterval(() => {
			let timeNow = moment.utc();
			let auctionEnd = moment(db_time);
			let dif = new moment.duration(auctionEnd - timeNow);

			// set state
			const { days, hours, minutes, seconds } = dif._data;
			setDays(days);
			setHours(hours);
			setMinutes(minutes);
			setSeconds(seconds);
		}, 1000);
	};

	const _getInputs = event => {
		event.preventDefault();
		setLoading(true);

		// convert auction time to date format - this is the time the auction should end.
		const auction_convert = days => {
			let time = moment
				.utc()
				.add(days, "days")
				.format();
			time = time.split("Z");
			time = time[0].split("T").join(" ");
			return time;
		};

		let fd = new FormData();
		fd.append("profile_photo", profilePhoto);
		fd.append("first_name", firstName);
		fd.append("last_name", lastName);
		fd.append("email", email);
		fd.append("university", university);
		fd.append("gpa", gpa);
		fd.append("reserve_price", reserve);
		fd.append("auction_duration", auction_convert(auction));
		fd.append("password", password);
		fd.append("password_confirmation", passwordConfirmation);
		fd.append("cv", cv);

		axios
			.post(links.root + "students/create", fd)
			.then(res => {
				// console.log(res.data.auction_duration); #2
				if (res.status === 200) {
					const { profile_photo, id, auction_duration } = res.data;
					setProfilePhoto(profile_photo);
					setId(id);
					localStorage.setItem("studentID", id)
					setError(false);
					timeDisplay(auction_duration);
					setLoading(false);
				}

				axios
					.post(links.root + "student_token", { auth: { email, password } })
					.then(res => {
						props.dispatch({ type: "SETSTUDENT" });
						localStorage.setItem("jwt", res.data.jwt);
						localStorage.setItem("student", true);
						localStorage.setItem("email", email);
					});
			})
			.catch(err => {
				setError(true);
				setLoading(false);
			});
	};

	if (loading === true) {
		return (
			<div className='mx-auto' id='spinner'>
				<FontAwesomeIcon className='fa-spin mx-auto fa-5x' icon='spinner' />
			</div>
		);
	} else if (error) {
		return (
			<Formik validationSchema={schema} onSubmit={console.log}>
				{({
					handleSubmit,
					handleChange,
					handleBlur,
					values,
					touched,
					isValid,
					errors,
				}) => (
					<Form onChange={handleChange} noValidate onSubmit={_getInputs}>
						<Form.Row>
							<Form.Group md='4' controlId='validationFormik01'>
								<Form.Label>First name</Form.Label>
								<Form.Control
									type='text'
									name='firstName'
									placeholder='John'
									value={values.firstName}
									// onChange={handleChange}
									isValid={touched.firstName && !errors.firstName}
									isInvalid={!!errors.firstName}
									onChange={event => setFirstName(event.target.value)}
								/>
								<Form.Control.Feedback>
									{errors.firstName}
								</Form.Control.Feedback>
							</Form.Group>

							<Form.Group md='4' controlId='validationFormik02'>
								<Form.Label>Last name</Form.Label>
								<Form.Control
									type='text'
									name='lastName'
									placeholder='Smith'
									value={values.lastName}
									onChange={event => setLastName(event.target.value)}
									isValid={touched.lastName && !errors.lastName}
									isInvalid={!!errors.lastName}
								/>

								<Form.Control.Feedback>{errors.lastName}</Form.Control.Feedback>
							</Form.Group>
						</Form.Row>
						<Form.Row>
							<Form.Group id='email' md='4'>
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
										// onChange={handleChange}
										onChange={event => setEmail(event.target.value)}
										isInvalid={!!errors.email}
										isValid={touched.email && !errors.email}
									/>
									<Form.Control.Feedback type='invalid'>
										{errors.email}
									</Form.Control.Feedback>
								</InputGroup>
							</Form.Group>
						</Form.Row>
						<Form.Row>
							<Form.Group id='university' md='6' controlId='validationFormik03'>
								<Form.Label>University</Form.Label>
								<Form.Control
									type='text'
									placeholder='University'
									name='university'
									value={values.university}
									maxLength='24'
									// onChange={handleChange}
									onChange={event => setUniversity(event.target.value)}
									isInvalid={!!errors.university}
									isValid={touched.university && !errors.university}
								/>

								<Form.Control.Feedback type='invalid'>
									{errors.university}
								</Form.Control.Feedback>
							</Form.Group>

							<Form.Group id='gpa' md='6' controlId='validationFormik04'>
								<Form.Label>GPA</Form.Label>
								<Form.Control
									type='text'
									placeholder='4.0'
									name='gpa'
									value={values.gpa}
									// onChange={handleChange}
									onChange={event => setGPA(event.target.value)}
									isInvalid={!!errors.gpa}
									isValid={touched.gpa && !errors.gpa}
								/>

								<Form.Control.Feedback type='invalid'>
									Please enter a valid number
								</Form.Control.Feedback>
							</Form.Group>
						</Form.Row>

						<Form.Row>
							<Form.Group id='reserve' md='6'>
								<Form.Label>Reserve Salary</Form.Label>
								<Form.Control
									type='text'
									placeholder='$40,000'
									name='reserve'
									value={values.reserve}
									// onChange={handleChange}
									onChange={event => setReserve(event.target.value)}
									isInvalid={!!errors.reserve}
									isValid={touched.reserve && !errors.reserve}
								/>

								<Form.Control.Feedback type='invalid'>
									Please enter a valid number
								</Form.Control.Feedback>
							</Form.Group>

							<Form.Group id='duration' md='6'>
								<Form.Label>Auction Duration ( days )</Form.Label>
								<Form.Control
									type='text'
									placeholder='7'
									name='duration'
									value={values.duration}
									onChange={event => setAuctionEnd(event.target.value)}
									isInvalid={!!errors.duration}
									isValid={touched.duration && !errors.duration}
								/>

								<Form.Control.Feedback type='invalid'>
									{errors.duration}
								</Form.Control.Feedback>
							</Form.Group>
						</Form.Row>

						<Form.Row>
							<Form.Group id='profile-photo' md='6'>
								<Form.Label>Upload a Profile Photo</Form.Label>
								<Form.Control
									type='file'
									accept='.jpg, .jpeg, .png'
									name='profile-photo'
									value={values.profilePhoto}
									// onChange={handleChange}
									onChange={event => setProfilePhoto(event.target.files[0])}
									isInvalid={!!errors.profilePhoto}
									isValid={touched.profilePhoto && !errors.profilePhoto}
								/>

								<Form.Control.Feedback type='invalid'>
									Please upload a file
								</Form.Control.Feedback>
							</Form.Group>

							<Form.Group id='cv' md='6'>
								<Form.Label>Upload a CV</Form.Label>
								<Form.Control
									type='file'
									accept='.pdf'
									name='cv'
									value={values.cv}
									onChange={event => setCV(event.target.files[0])}
									isInvalid={!!errors.cv}
									isValid={touched.cv && !errors.cv}
								/>

								<Form.Control.Feedback type='invalid'>
									{errors.cv}
								</Form.Control.Feedback>
							</Form.Group>
						</Form.Row>

						<Form.Row>
							<Form.Group id='password' md='3'>
								<Form.Label>Password</Form.Label>
								<Form.Control
									type='password'
									placeholder='Password'
									name='password'
									value={values.password}
									onChange={event => setPassword(event.target.value)}
									isInvalid={!!errors.password}
								/>
								<Form.Control.Feedback type='invalid'>
									{errors.password}
								</Form.Control.Feedback>
							</Form.Group>

							<Form.Group
								id='password-confirm'
								md='3'
								controlId='validationFormik06'>
								<Form.Label>Password Confirmation</Form.Label>
								<Form.Control
									type='password'
									placeholder='Confirm'
									name='passwordConfirmation'
									value={values.passwordConfirmation}
									onChange={event =>
										setPasswordConfirmation(event.target.value)
									}
									isInvalid={!!errors.passwordConfirmation}
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
									Error: make sure you have filled out all details.
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
			<SignUpProfile
				profilePhoto={profilePhoto}
				reserve={reserve}
				day={day}
				hour={hour}
				minute={minute}
				second={second}
				id={id}
			/>
		);
	}
};

const mapStateToProps = state => {
	return {
		student: state.student,
	};
};

export default connect(mapStateToProps)(StudentSignUpForm);
