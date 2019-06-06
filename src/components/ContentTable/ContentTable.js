import React, { useState } from 'react'
import { Table } from 'react-bootstrap';
import './ContentTable.css'
import faker from 'faker';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const ContentTable = (props) => {

  const {
    first_name,
    last_name,
    email,
    gpa,
    university,
  } = props.data;

  const [experience, setExperience] = useState(false);
  const [hobby, setHobby] = useState(false);
  const [salary, setSalary] = useState(false);

  const formatNumber = num => {
    if (num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    } //formats with commas
    else {
      return "";
    }
  };

  const _getExperience = () => {
    const exp = faker.name.jobArea()
    setExperience(exp)

    return exp
  }

  const _getHobby = () => {
    const hob = faker.hacker.ingverb()
    setHobby(hob)

    return hob
  }

  const _getSalary = () => {
    const sal = formatNumber(faker.finance.amount(60000, 100000))
    setSalary( sal)

    return sal
  }



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
          <td colSpan="2">Name:</td>
          <td colSpan="1">{`${first_name} ${last_name}`}</td>
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
            <td colSpan="1">{ experience ? experience : _getExperience()}</td>
            <td colSpan="4">Industry Work Experience:</td>
            <td colSpan="1"><FontAwesomeIcon style={{ color: "red" }} icon="times-circle" /></td>

          </tr>
          <tr>
            <td colSpan="2">Hobby:</td>
            <td id="hacker" colSpan="1">{hobby? hobby : _getHobby()}</td>
            <td colSpan="4">Willing To Relocate:</td>
            <td colSpan="1"><FontAwesomeIcon style={{ color: "green" }} icon="check-circle" /></td>

          </tr>
          <tr>
            <td colSpan="2">Expected Salary:</td>
            <td colSpan="1">${salary ? salary : _getSalary()}</td>
            <td colSpan="4">GradBay Approved:</td>
            <td colSpan="1"><FontAwesomeIcon style={{ color: "green" }} icon="check-circle" /></td>

          </tr>
      </tbody>
    </Table>
    </div>
  );
}

export default ContentTable;