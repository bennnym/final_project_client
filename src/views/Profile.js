import React from 'react'
import Layout from '../components/Layout/Layout'
import Footer from '../components/Footer/Footer'
import Navigation from '../components/Nav/Navigation';

const Profile = (props) => {

  return (
    <React.Fragment>
      <Navigation/>
    <Layout >
        <h1>Profile Coming soon for profile {props.location.state.id}</h1>
      </Layout>
      <Footer />
    </React.Fragment>
  )
}

export default Profile;