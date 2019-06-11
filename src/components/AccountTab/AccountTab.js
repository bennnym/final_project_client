import React from 'react'
import { Col, Row, Nav, Tab } from 'react-bootstrap';
import StudentAccountDetails from './StudentAccountDetails'
import EmployerAccountDetails from './EmployerAccountDetails'
import { connect } from "react-redux";


const AccountTab = (props) => {
  return(
    <Tab.Container id='left-tabs-example' defaultActiveKey='first'>
      <Row>
        <Col sm={2}>
          <Nav variant='pills' className='flex-column side-tabs'>
            <Nav.Item className="myacc-nav">
              <Nav.Link eventKey='first'>Update Details</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={10}>
          <Tab.Content>
            <Tab.Pane eventKey='first'>
            { props.student ? 
              <StudentAccountDetails /> : <EmployerAccountDetails />
            }
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
}

const mapStateToProps = state => {
	return {
		employer: state.employer,
		student: state.student,
	};
};

export default connect(mapStateToProps)(AccountTab);