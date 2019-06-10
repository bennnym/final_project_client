import React from 'react'
import { Col, Row, Nav, Tab } from 'react-bootstrap';
import AccountDetails from './AccountDetails'

const AccountTab = () => {
  return(
    <Tab.Container id='left-tabs-example' defaultActiveKey='first'>
      <Row>
        <Col sm={2}>
          <Nav variant='pills' className='flex-column side-tabs'>
            <Nav.Item className="myacc-nav">
              <Nav.Link eventKey='first'>Update Account</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={10}>
          <Tab.Content>
            <Tab.Pane eventKey='first'>
              <AccountDetails />
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
}

export default AccountTab;