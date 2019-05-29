import React from 'react'
import Navigation from '../components/Nav/Navigation'
import Layout from '../components/Layout/Layout'
import GradCard from '../components/Card/GradCard'
import Summary from '../components/Summary/Summary'
import UniversityIcons from '../components/UniversityIcons/UniversityIcons'
import Footer from '../components/Footer/Footer'
import '../App.css'


const Home = () => {
  return(
    <React.Fragment>
      <Navigation />
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