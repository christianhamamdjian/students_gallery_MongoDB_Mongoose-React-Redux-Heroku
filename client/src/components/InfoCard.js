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
    isAuthenticated: PropTypes.bool,
  };
  render() {
    const {
      firstName,
      lastName,
      src,
      myId,
      items,
      handleDelete,
      isAuthenticated,
      student,
      user,
      userId,
    } = this.props;
    return (
      <ListGroupItem>
        <Card>
          <div className="card-img-wrapper">
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
              {isAuthenticated && user === userId.id ? (
                <Fragment>
                  <EditStudentModal myId={myId} />
                  <div>
                    <Button
                      className="btn btn-danger"
                      color="danger"
                      size="sm"
                      onClick={handleDelete}
                    >
                      <i className="fas fa-trash" />
                    </Button>
                  </div>
                </Fragment>
              ) : null}
            </div>
          </CardBody>
        </Card>
      </ListGroupItem>
    );
  }
}

const mapStateToprops = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  userId: state.auth.user,
  student: state.student,
});

export default connect(mapStateToprops, { getStudents, deleteStudent })(
  InfoCard
);
