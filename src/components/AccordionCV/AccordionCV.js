import React, { useState } from 'react'
import { Accordion, Card, Button } from 'react-bootstrap';
import './AccordionCV.css'

const AccordionCV = (props) => {
  const [toggle, setToggle ] = useState(false)

  const _toggle = () => {
  }
 
  return(
    <Accordion defaultActiveKey="3" >
      <Card>
        <Card.Header >
          <Accordion.Toggle onClick={_toggle} as={Button} variant="outline-success" eventKey={true} >View CV
      </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse as={Button} eventKey={true}>
          <Card.Body> <iframe src={props.cv}/></Card.Body>
        </Accordion.Collapse>
      </Card>
      {/* <Card >
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey={false}>
            View CV
      </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse as={Button} eventKey={false}>
          <Card.Body> <iframe src={props.cv} /></Card.Body>
        </Accordion.Collapse>
      </Card> */}
    </Accordion>
  );
}

export default AccordionCV;