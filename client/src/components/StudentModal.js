import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import PropTypes from "prop-types";

class StudentModal extends Component {
  state = {
    modal: false,
    name: ""
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  render() {
    const students = this.props.items;
    const selectedStudent = students.filter(
      stud => stud._id === this.props.myId
    )[0];
    return (
      <div>
        <Button color="dark" onClick={this.toggle}>
          <i className="fas fa-eye" />
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle} />
          <ModalBody>
            <div>
              <div className="subhead" />
              <div className="student-info">
                <div className="student-info-img">
                  <img alt="" src={selectedStudent.src} />
                </div>
                <div className="student-info-text">
                  <h2>
                    <span>{selectedStudent.firstName} </span>
                    <span>{selectedStudent.lastName}</span>
                  </h2>
                </div>
                <div className="student-info-message">
                  <p>{selectedStudent.message}</p>
                </div>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
StudentModal.propTypes = {
  items: PropTypes.array.isRequired
};
export default StudentModal;
