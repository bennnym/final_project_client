import React, { useState } from "react";
import { Accordion, Card, Button } from "react-bootstrap";
import "./AccordionCV.css";

const AccordionCV = props => {
  const [toggleKey, setToggleKey] = useState("");

  const _toggle = () => {
    setToggleKey(!toggleKey);
  };

  return (
    <Accordion defaultActiveKey={false}>
      <Card>
        <Card.Header>
          <Accordion.Toggle
            as={Button}
            variant="outline-success"
            eventKey={true}
            onClick={() => _toggle()}
          >
            View CV
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse
          onClick={() => _toggle()}
          as={Button}
          eventKey={toggleKey}
        >
          <Card.Body>
            {" "}
            <iframe title="CV Contents" src={props.cv} />
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

export default AccordionCV;
