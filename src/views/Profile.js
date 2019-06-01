import React from 'react'
import Layout from '../components/Layout/Layout'
import Footer from '../components/Footer/Footer'
import Navigation from '../components/Nav/Navigation';

const Profile = (props) => {
  const { isEmployer, setIsEmployer, isStudent, setIsStudent } = props

  return (
    <React.Fragment>
      <Navigation isEmployer={isEmployer}
        setIsEmployer={setIsEmployer}
        isStudent={isStudent}
        setIsStudent={setIsStudent} />
    <Layout >
      <h1>Profile Coming soon</h1>
      {/* <p> { props.location.state.id}</p> */}
      </Layout>
      <Footer />
    </React.Fragment>
  )
}

export default Profile;