import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import "./ActivityTab.css";

const TabCard = () => {
	return (
		<Card responsive className='tab-card'>
			<Card.Body className='tab-card-body'>
				<Row>
					<Col xs={8}>
						<span className='tab-spans'>OFFER DATE</span>
						<div>some date</div>
					</Col>
					<Col xs={4}>
						<span className='tab-spans'>OFFER AMOUNT</span>
						<div>some amount</div>
					</Col>
				</Row>
        <Row>
          <Col xs={4}>
            <img src="http://www.fillmurray.com/300/300" alt="holder"/>
          </Col>
          <Col xs={4}>
            <span className='tab-spans'>student name goes here</span>
            <div>University name or something</div>
            <div>University name or something</div>
            <div>University name or something</div>
          </Col>
          <Col xs={4}>
            <div>Time Remaning here or SOLD</div>
            <div>Current Price or Sale Price</div>
          </Col>
        </Row>
			</Card.Body>
		</Card>
	);
};

export default TabCard;
