import React from 'react'
import { Nav, Col, Row, Tab } from 'react-bootstrap';
import OfferTab from './OfferTab'

const ActivityTab = (props) => {
  return(
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row>
        <Col sm={2}>
          <Nav variant="pills" className="flex-column side-tabs">
            <Nav.Item>
              <Nav.Link eventKey="first">Offers</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">Employed</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="third">Watchlist</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={10}>
          <Tab.Content>
            <Tab.Pane eventKey="first">
              <OfferTab />
            </Tab.Pane>
            <Tab.Pane eventKey="second">

            </Tab.Pane>
            <Tab.Pane eventKey="third">
              
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
}

export default ActivityTab;