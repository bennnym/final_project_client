import React, { useState, useEffect } from "react";
import { Navbar, NavDropdown, Nav } from "react-bootstrap";
import "./Navigation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../assets/img/logo.png";
import LoginModal from "../LoginModal/LoginModal";
import LoginForm from "../LoginModal/LoginForm";
import SignupForm from "../LoginModal/SignupForm";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import links from "../../links";
import { databaseRef } from "../../config/firebase";
import _ from "underscore";

const Navigation = props => {
  const [SignInModalShow, setSignInModalShow] = useState(false);
  const [SignUpModalShow, setSignUpModalShow] = useState(false);
  const [randomID, setRandomID] = useState(false);
  const [newMsg, setnewMsg] = useState("	");

  let SignInModalClose = () => setSignInModalShow(false);
  let SignUpModalClose = () => setSignUpModalShow(false);

  const _logout = () => {
    if (props.employer) {
      props.dispatch({ type: "SETEMPLOYER" });
    }
    if (props.student) {
      props.dispatch({ type: "SETSTUDENT" });
    }
    localStorage.setItem("jwt", "");
    localStorage.setItem("email", "");
    localStorage.setItem("student", "");
    localStorage.setItem("employer", "");
    localStorage.setItem("id", "");
    localStorage.setItem("studentID", "");
  };

  const _checkForEmployerMsg = () => {
    if (props.employer) {
      const newRef = databaseRef.child(localStorage.id);

      newRef.on("value", snapshot => {
        const messageData = snapshot.val(); // this counts the unread messages
        const studentKeys = _.keys(messageData);
        let count = 0; // this counts how many unread msgs we have
        studentKeys.forEach(student => {
          let msgKeys = _.keys(messageData[student]);

          let read = msgKeys.filter(msg => {
            return messageData[student][msg]["employer_read"] === false;
          });

          if (read.length >= 1) {
            count += 1;
          }
        });

        if (count >= 1) {
          setnewMsg("new-message");
        } else {
          setnewMsg("all-messages-read");
        }
      });
    }
  };

  const _checkForStudentMsg = () => {
    if (props.student) {
      databaseRef.on("value", snapshot => {
        let data = snapshot.val();

        let keys = _.keys(data);

        let result = {};

        keys.map(key => {
          const temp1Keys_Keys = _.keys(data[key]);

          temp1Keys_Keys.map(k => {
            if (Number(k.split("-")[0]) === Number(localStorage.studentID)) {
              return (result[key] = { [k]: data[key][k] });
            }
          });
        });

        // calculate how many messages are unread

        const employerKeys = _.keys(result);

        let studentName = _.keys(result[employerKeys[0]]);
        studentName = studentName[0];
        let count = 0;
        employerKeys.forEach(key => {
          let msgKeys = _.keys(result[key][studentName]);

          let unread = msgKeys.filter(k => {
            return result[key][studentName][k]["student_read"] === false;
          });
          if (unread.length >= 1) {
            count += 1;
          }
        });

        if (count >= 1) {
          setnewMsg("new-message");
        } else {
          setnewMsg("all-messages-read");
        }
      });
    }
  };

  useEffect(() => {
    _luckyProfile();
    _checkForEmployerMsg();
    _checkForStudentMsg();
  }, []);

  const _luckyProfile = () => {
    axios.get(links.root + "students").then(res => {
      let length = res.data.length;
      let random = Math.floor(Math.random() * (length - 1));
      setRandomID(res.data[random].id);
    });
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Link to="/" className="navbar-brand">
        <img id="logo" src={logo} alt="logo" />
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link className="nav-link" to="/auctions">
            <FontAwesomeIcon icon="user-graduate" /> Auctions
          </Link>
          <Link className="nav-link" to={`/profile/${randomID}`}>
            <FontAwesomeIcon icon="dice" /> Feeling Lucky
          </Link>

          {props.employer || props.student ? (
            <NavDropdown title="My Account" id="basic-nav-dropdown">
              <Link to="/myacc" className="dropdown-item">
                My GradBay
              </Link>

              {/* <NavDropdown.Item href='#action/3.2'>
								Another action
							</NavDropdown.Item>
							<NavDropdown.Item href='#action/3.3'>Something</NavDropdown.Item> */}
              <NavDropdown.Divider />
              {/* <NavDropdown.Item  > */}
              <Link className="dropdown-item" onClick={_logout} to="/">
                Logout
              </Link>
              {/* </NavDropdown.Item> */}
            </NavDropdown>
          ) : (
            <>
              <Nav.Link
                href="#"
                variant="primary"
                onClick={() => setSignInModalShow(true)}
              >
                <FontAwesomeIcon icon="sign-in-alt" /> Sign in
              </Nav.Link>

              <Nav.Link
                href="#"
                variant="primary"
                onClick={() => setSignUpModalShow(true)}
              >
                <FontAwesomeIcon icon="user-plus" /> Sign up
              </Nav.Link>
            </>
          )}

          <LoginModal
            header="Sign In"
            show={SignInModalShow}
            onHide={SignInModalClose}
            form={<LoginForm />}
          />

          <LoginModal
            header="Sign Up"
            show={SignUpModalShow}
            onHide={SignUpModalClose}
            form={<SignupForm />}
          />
        </Nav>
        {props.employer || props.student ? (
          <Link to="/myacc" className="nav-link message-nav">
            <FontAwesomeIcon id={newMsg} className="fa-2x" icon="envelope" />
          </Link>
        ) : (
          ""
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

const mapStateToProps = state => {
  return {
    student: state.student,
    employer: state.employer
  };
};

export default connect(mapStateToProps)(Navigation);
