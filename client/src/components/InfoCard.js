import React, { Component, Fragment } from "react";
import { Card, CardBody, CardTitle, ListGroupItem, Button } from "reactstrap";

import "../App.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getStudents } from "../store/actions/studentActions";
import { deleteStudent } from "../store/actions/studentActions";

import StudentModal from "./StudentModal";
import StudentImage from "./StudentImage";
import EditStudentModal from "./EditStudentModal";

class InfoCard extends Component {
  static propTypes = {
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    myId: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    handleDelete: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  };
  render() {
    const {
      firstName,
      lastName,
      src,
      myId,
      items,
      handleDelete,
      isAuthenticated
    } = this.props;
    return (
      <ListGroupItem>
        <Card style={{height:"320px"}}>
          <div className='card-img-wrapper'>
          <StudentImage myId={myId} src={src} items={items} />
          </div>
          <CardBody>
            <div className="card-text">
              <CardTitle>
                {firstName} {lastName}
              </CardTitle>
            </div>
            <div className="card-info">
              <StudentModal myId={myId} items={items} />
              {isAuthenticated ? (
                <Fragment>
                  <EditStudentModal myId={myId} />
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={handleDelete}
                  >
                    <i className="fas fa-trash" />
                  </Button>
                </Fragment>
              ) : null}
            </div>
          </CardBody>
        </Card>
      </ListGroupItem>
    );
  }
}

const mapStateToprops = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  student: state.student
});

export default connect(
  mapStateToprops,
  { getStudents, deleteStudent }
)(InfoCard);
