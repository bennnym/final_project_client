import React from 'react'
import Layout from '../components/Layout/Layout'
import Footer from '../components/Footer/Footer'
import Navigation from '../components/Nav/Navigation';
import ImageCarousel from '../components/ImageCarousel/ImageCarousel'
import ShowCards from '../components/ShowCards/ShowCards'

const Auctions = (props) => {
  const { isEmployer, setIsEmployer, isStudent, setIsStudent } = props

  return(
    <React.Fragment>
      <Navigation isEmployer={isEmployer}
        setIsEmployer={setIsEmployer}
        isStudent={isStudent}
        setIsStudent={setIsStudent} />
      <ImageCarousel />
      <Layout >

      <ShowCards/>
       

      </Layout>
      <Footer />
    </React.Fragment>
  );
}

export default Auctions;