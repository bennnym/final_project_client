import React from 'react'
import { Card, Button, CardGroup } from 'react-bootstrap'
import headshot from "../../assets/img/SEI_Ben.jpg"
import './GradCard.css'

import { Spring } from "react-spring/renderprops";

// Look at Trail later https://reactgo.com/react-animation-tutorial-examples/

const GradCard = ( props ) => {
  return(
    <Spring from={{ opacity: 0 }} to={{ opacity: 1 }} config={{ duration: 1500}}>
      {props => (
        <div style={ props }>
    <CardGroup >
            <Card className="mx-auto card-display" >
              <Card.Img variant="top" src={headshot} />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
    </Card.Text>
                <Button variant="primary">Make an Offer</Button>
              </Card.Body>
            </Card>
      <Card className="mx-auto card-display" >
        <Card.Img variant="top" src={headshot} />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the bulk of
            the card's content.
    </Card.Text>
          <Button variant="primary">Make an Offer</Button>
        </Card.Body>
      </Card>
      <Card className="mx-auto card-display" >
        <Card.Img variant="top" src={headshot} />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the bulk of
            the card's content.
    </Card.Text>
          <Button variant="primary">Make an Offer</Button>
        </Card.Body>
      </Card> 
      <Card className="mx-auto card-display" >
        <Card.Img variant="top" src={headshot} />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the bulk of
            the card's content.
    </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </CardGroup>
        </div>
      )}
    </Spring>
  );
}

export default GradCard;