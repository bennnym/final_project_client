import React from 'react'
import { Table } from 'react-bootstrap';
import './ContentTable.css'
import faker from 'faker';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const ContentTable = (props) => {

  const {
    id,
    auction_duration,
    bids,
    cv,
    email,
    first_name,
    last_name,
    gpa,
    reserve_price,
    university,
  } = props.data;

  const formatNumber = num => {
    if (num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    } //formats with commas
    else {
      return "";
    }
  };

  return(
    <div className="table-holder">

    <Table responsive striped bordered hover size="sm">
        <thead>
          <tr>
            <th colSpan="8">Student Specifics</th>
          </tr>
        </thead>
      <tbody>
        <tr>
          <td colSpan="2">Email:</td>
          <td colSpan="1">{email}</td>
            <td colSpan="4">Australian Citizen:</td>
            <td colSpan="1"><FontAwesomeIcon style={{ color: "green" }} icon="check-circle" /></td>

        </tr>
        <tr>
            <td colSpan="2">University:</td>
          <td colSpan="1">{university}</td>
         <td colSpan="4">Taxfile Number:</td>
            <td colSpan="1"><FontAwesomeIcon style={{ color: "green" }} icon="check-circle" /></td>

        </tr>
        <tr>
            <td colSpan="2">GPA:</td>
          <td colSpan="1">{gpa}</td>
            <td colSpan="4">Masters Degree:</td>
            <td colSpan="1"><FontAwesomeIcon style={{ color: "green" }} icon="check-circle" /></td>

        </tr>
          <tr>
            <td colSpan="2">Seeking:</td>
            <td colSpan="1">Full-Time</td>
           <td colSpan="4">Distinction Average:</td>
            <td colSpan="1"><FontAwesomeIcon style={{ color: "red" }} icon="times-circle" /></td>

          </tr>
          <tr>
            <td colSpan="2">Previous Expirience:</td>
            <td colSpan="1">{faker.name.jobArea()}</td>
            <td colSpan="4">Industry Work Experience:</td>
            <td colSpan="1"><FontAwesomeIcon style={{ color: "red" }} icon="times-circle" /></td>

          </tr>
          <tr>
            <td colSpan="2">Hobby:</td>
            <td id="hacker" colSpan="1">{faker.hacker.ingverb()}</td>
            <td colSpan="4">Willing To Relocate:</td>
            <td colSpan="1"><FontAwesomeIcon style={{ color: "green" }} icon="check-circle" /></td>

          </tr>
          <tr>
            <td colSpan="2">Expected Salary:</td>
            <td colSpan="1">${formatNumber(faker.finance.amount(60000, 100000))}</td>
            <td colSpan="4">GradBay Approved:</td>
            <td colSpan="1"><FontAwesomeIcon style={{ color: "green" }} icon="check-circle" /></td>

          </tr>
      </tbody>
    </Table>
    </div>
  );
}

export default ContentTable;