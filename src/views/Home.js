import React from 'react'
import Navigation from '../components/Nav/Navigation'
import Layout from '../components/Layout/Layout'
import GradCard from '../components/Card/GradCard'
import Summary from '../components/Summary/Summary'
import UniversityIcons from '../components/UniversityIcons/UniversityIcons'
import Footer from '../components/Footer/Footer'
import '../App.css'


const Home = (props) => {
  const { isEmployer, setIsEmployer, isStudent, setIsStudent } = props
  return (
    <React.Fragment>
      <Navigation isEmployer={isEmployer}
        setIsEmployer={setIsEmployer}
        isStudent={isStudent}
        setIsStudent={setIsStudent}
        href="/" />
      <div className="hero fluid ">
        <div className="container in-hero">
          <h2 className="display-4">GradBay</h2>
          <h6>Graduate hiring, done differently.</h6>
        </div>
      </div>
      <Layout>
        <GradCard />
        <Summary />
      </Layout>
      <UniversityIcons />
      <Footer />

    </React.Fragment>

  );
}

export default Home;