import React from 'react'
import { Form, Button, InputGroup } from 'react-bootstrap'
import { Formik } from 'formik';
import * as yup from 'yup'
import './LoginModal.css'


const schema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().required(),
  university: yup.string().required(),
  gpa: yup.number()
    .required()
    .positive()
    .integer(),
  reserve: yup.number().required().positive().integer(),
  duration: yup.number().required().positive().integer(),
  password: yup.string().required('Password is required'),
  // profilePhoto: yup.meta(),
  passwordConfirmation: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')

  // terms: yup.bool().required(),
});

const StudentSignUpForm = ( props ) => {
  return(
    <Formik
      validationSchema={schema}
      onSubmit={console.log}
      initialValues={{
        // firstName: 'Mark',
        // lastName: 'Otto',
      }}
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
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Row>

              <Form.Group md="4" controlId="validationFormik01">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  placeholder="John"
                  value={values.firstName}
                  onChange={handleChange}
                  isValid={touched.firstName && !errors.firstName}
                  isInvalid={!!errors.firstName}

                />
                <Form.Control.Feedback>{errors.firstName}</Form.Control.Feedback>
              </Form.Group>


              <Form.Group md="4" controlId="validationFormik02">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  placeholder="Smith"
                  value={values.lastName}
                  onChange={handleChange}
                  isValid={touched.lastName && !errors.lastName}
                />

                <Form.Control.Feedback>{errors.lastName}</Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group id="email" md="4" controlId="validationFormik02">
                <Form.Label>Email</Form.Label>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    type="text"
                    placeholder="example@gmail.com"
                    aria-describedby="inputGroupPrepend"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                    isValid={touched.email && !errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Form.Row>
              <Form.Row>
              <Form.Group id="university" md="6" controlId="validationFormik03">
                <Form.Label>University</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="University"
                  name="university"
                  value={values.university}
                  onChange={handleChange}
                  isInvalid={!!errors.university}
                  isValid={touched.university && !errors.university}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.university}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group id="gpa" md="6" controlId="validationFormik04">
                <Form.Label>GPA</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="4.0"
                  name="gpa"
                  value={values.gpa}
                  onChange={handleChange}
                  isInvalid={!!errors.gpa}
                  isValid={touched.gpa && !errors.gpa}
                />

                <Form.Control.Feedback type="invalid">
                  Please enter a valid number
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>


            <Form.Row>
              <Form.Group id="reserve" md="6" >
                <Form.Label>Reserve Price</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="$40,000"
                  name="reserve"
                  value={values.reserve}
                  onChange={handleChange}
                  isInvalid={!!errors.reserve}
                  isValid={touched.reserve && !errors.reserve}
                />

                <Form.Control.Feedback type="invalid">
                  Please enter a valid number
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group id="duration" md="6" controlId="validationFormik04">
                <Form.Label>Auction Duration ( days )</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="7"
                  name="duration"
                  value={values.duration}
                  onChange={handleChange}
                  isInvalid={!!errors.duration}
                  isValid={touched.duration && !errors.duration}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.duration}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group id="profile-photo" md="6" >
                <Form.Label>Upload a Profile Photo</Form.Label>
                <Form.Control
                  type="file"
                  name="profile-photo"
                  value={values.profilePhoto}
                  onChange={handleChange}
                  isInvalid={!!errors.profilePhoto}
                  isValid={touched.profilePhoto && !errors.profilePhoto}
                />

                <Form.Control.Feedback type="invalid">
                  Please upload a file
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group id="cv" md="6" controlId="validationFormik04">
                <Form.Label>Upload a CV</Form.Label>
                <Form.Control
                  type="file"
                  name="cv"
                  value={values.cv}
                  onChange={handleChange}
                  isInvalid={!!errors.cv}
                  isValid={touched.cv && !errors.cv}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.cv}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group id="password" md="3" controlId="validationFormik05">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  isInvalid={!!errors.password}
                  
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group id="password-confirm" md="3" controlId="validationFormik06">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm"
                  name="passwordConfirmation"
                  value={values.passwordConfirmation}
                  onChange={handleChange}
                  isInvalid={!!errors.passwordConfirmation}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.passwordConfirmation}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Group>
              <Form.Check
                required
                name="terms"
                label="Agree to terms and conditions"
                onChange={handleChange}
                isInvalid={!!errors.terms}
                feedback={errors.terms}
                id="validationFormik0"
              />
            </Form.Group>
            <Button type="submit">Submit form</Button>
          </Form>
        )}
    </Formik>

    
  );
}

export default StudentSignUpForm;