import React, { useEffect, useState, useRef } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import "./SearchInput.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import links from "../../links";
import { Typeahead } from "react-bootstrap-typeahead";
import _ from "underscore";

const SearchInput = props => {
  const [profileData, setProfileData] = useState("");
  const [options, setOptions] = useState("")
  const [input, setInput] = useState("");
  const { gradData, setGradData } = props

  const _typeahead = useRef(null)

	useEffect(() => {
		_getSearchData();
	}, []);

	const _getSearchData = () => {
		if (!profileData) {
			axios.get(links.root + "students").then(res => {
				console.log(res.data);
        const firstNames = _.pluck(res.data, "first_name");
        const lastNames = _.pluck(res.data, "last_name");

        const names = firstNames.map((name, index) => {
          return `${name} ${lastNames[index]}`
        })
        setOptions(names);
        setProfileData(res.data)
			});
		}
  };
  
	const _getInput = anything => {
    if (anything.length > 0){ setInput(anything[0])}
  };
  
  const handleInputChange = (input, e) => {
    setInput(input)
  }

  const _handleEnter = (e) => {
    if ( e.key === "Enter" ){ _handleSubmit() }
  }

  const _handleSubmit = () => {
    if (!input){ return }

    // split the input on space 
    let searchInput = input.split(' ')

    // if it is 1 word - do stuff
    if ( searchInput.length === 1) {
      // search the profileData for the word, either first or last name
      searchInput = profileData.filter(students => {
        return students.first_name.toLowerCase().includes(searchInput[0].toLowerCase()) || students.last_name.toLowerCase().includes(searchInput[0].toLowerCase())
      })
    } else if (searchInput.length === 2) {  // if it is two words -- do other stuff
      searchInput = profileData.filter(students => { // split words and do two seperate searches
        return students.first_name.toLowerCase().includes(searchInput[0].toLowerCase()) || students.first_name.toLowerCase().includes(searchInput[1].toLowerCase()) || students.last_name.toLowerCase().includes(searchInput[0].toLowerCase()) || students.last_name.toLowerCase().includes(searchInput[1].toLowerCase())
      })
    } else { // else do nothing and clear the input
      _typeahead.current.clear()
      return
    } 
    _typeahead.current.clear()
    searchInput.length >= 1 ? setGradData(searchInput) : setGradData(profileData)
  }
	return (
		<React.Fragment>
      <InputGroup className='mb-3 input-search' onKeyDown={_handleEnter}>
				<InputGroup.Prepend>
					<InputGroup.Text id='basic-addon1'>
						<FontAwesomeIcon icon='search' />
					</InputGroup.Text>
				</InputGroup.Prepend>
				<Typeahead
          ref={_typeahead}
					labelKey='name'
					multiple={false}
					options={options ? options : ["something"]}
					placeholder='Search by First or Last Name'
          value={input}
          onChange={_getInput}
          onInputChange={handleInputChange}
          minLength="3"
				/>
				<Button  onClick={_handleSubmit} className='search-button-auctions' variant='outline-success'>
					Go
				</Button>
			</InputGroup>
		</React.Fragment>
	);
};

export default SearchInput;
