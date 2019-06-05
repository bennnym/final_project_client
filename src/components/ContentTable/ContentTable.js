import React from 'react'
import { Table } from 'react-bootstrap';
import './ContentTable.css'

const ContentTable = () => {
  return(
    <div className="table-holder">

    <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th colSpan="8">Student Specifics</th>
          </tr>
        </thead>
      <tbody>
        <tr>
          <td colSpan="3">Mark</td>
          <td colSpan="1">Hello</td>
          <td colSpan="3">testing</td>
          <td colSpan="1">Hello</td>

        </tr>
        <tr>
          <td colSpan="3">Mark</td>
          <td colSpan="1">Hello</td>
          <td colSpan="3">testing</td>
          <td colSpan="1">Hello</td>

        </tr>
        <tr>
          <td colSpan="3">Mark</td>
          <td colSpan="1">Hello</td>
          <td colSpan="3">testing</td>
          <td colSpan="1">Hello</td>

        </tr>
          <tr>
            <td colSpan="3">Mark</td>
            <td colSpan="1">Hello</td>
            <td colSpan="3">testing</td>
            <td colSpan="1">Hello</td>

          </tr>
          <tr>
            <td colSpan="3">Mark</td>
            <td colSpan="1">Hello</td>
            <td colSpan="3">testing</td>
            <td colSpan="1">Hello</td>

          </tr>
          <tr>
            <td colSpan="3">Mark</td>
            <td colSpan="1">Hello</td>
            <td colSpan="3">testing</td>
            <td colSpan="1">Hello</td>

          </tr>
          <tr>
            <td colSpan="3">Mark</td>
            <td colSpan="1">Hello</td>
            <td colSpan="3">testing</td>
            <td colSpan="1">Hello</td>

          </tr>
          <tr>
            <td colSpan="3">Mark</td>
            <td colSpan="1">Hello</td>
            <td colSpan="3">testing</td>
            <td colSpan="1">Hello</td>

          </tr>
      </tbody>
    </Table>
    </div>
  );
}

export default ContentTable;