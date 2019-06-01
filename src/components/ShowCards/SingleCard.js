import React from 'react'
import './ShowCards.css'

const SingleCard = ( props ) => {
  const { image, timeLeft, price, firstName, lastName, university } = props
  return(
    <React.Fragment>
    <div className="container py-3">
      <div id="horizontal-card" className="card">
        <div className="row ">

          <div className="col-md-4">
            <img id="horizontal-img" src={ image } alt="headshot" className="w-100" />
          </div>
          <div className="col-md-8 px-3">
            <div className="card-block px-3">
              <h4 className="card-title">{firstName} {lastName}</h4>
              <p className="card-text">{ university} </p>
              <p className="card-text">{ price }</p>
              <a href="/auctions" className="btn btn-primary">Read More</a>
            </div>
          </div>

        </div>
      </div>
    </div>
    <div/>
    </React.Fragment>
  );
}

export default SingleCard;