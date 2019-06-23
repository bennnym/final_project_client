import React, { useState } from "react";
import Navigation from "../components/Nav/Navigation";
import Layout from "../components/Layout/Layout";
import Footer from "../components/Footer/Footer";
import ActivityTab from "../components/ActivityTab/ActivityTab";
import MessageTab from "../components/MessageTab/MessageTab";
import AccountTab from "../components/AccountTab/AccountTab";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Tabs, Tab } from "react-bootstrap";

const MyAcc = props => {
  const [newMsg, setnewMsg] = useState(props.location.state ? true : false);
  const [unreadMsgs, setUnreadMsgs] = useState(0);

  if (!props.employer && !props.student) {
    return <Redirect to="/" />;
  }

  return (
    <React.Fragment>
      <Navigation href="/auctions" />
      <Layout>
        <Tabs
          className="top-tabs"
          defaultActiveKey={
            props.location.state
              ? "messages"
              : props.student
              ? "messages"
              : "activity"
          }
          id="uncontrolled-tab-example"
        >
          {props.employer ? (
            <Tab eventKey="activity" title="Activity">
              <ActivityTab />{" "}
            </Tab>
          ) : (
            ""
          )}

          <Tab
            eventKey="messages"
            title={unreadMsgs >= 1 ? `Messages (${unreadMsgs})` : "Messages"}
          >
            {props.employer ? (
              <MessageTab
                setUnreadMsgs={setUnreadMsgs}
                unreadMsgs={unreadMsgs}
                newMsg={newMsg}
                setNewMsg={setnewMsg}
                studentName={
                  props.location.state ? props.location.state.name : ""
                }
                studentID={props.location.state ? props.location.state.id : ""}
              />
            ) : (
              <MessageTab
                newMsg={newMsg}
                setUnreadMsgs={setUnreadMsgs}
                unreadMsgs={unreadMsgs}
              />
            )}
          </Tab>
          <Tab eventKey="account" title="Account">
            <AccountTab />
          </Tab>
        </Tabs>
      </Layout>
      <Footer />
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    employer: state.employer,
    student: state.student
  };
};

export default connect(mapStateToProps)(MyAcc);
