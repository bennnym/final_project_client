import React from 'react'
import { InputGroup, FormControl, Button } from 'react-bootstrap'
import './SearchInput.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchInput = (props) => {
  return(
    <InputGroup className="mb-3 input-search">
      <InputGroup.Prepend>
        <InputGroup.Text id="basic-addon1"><FontAwesomeIcon icon='search' /></InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl
        placeholder="Search"
        aria-label="Username"
        aria-describedby="basic-addon1"
      />
      <Button variant='outline-success'>Search</Button>
    </InputGroup>
  )
}

export default SearchInput;