import React, { Component, Fragment } from "react";
import { Modal, ModalHeader, ModalBody, CardImg } from "reactstrap";
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
    const src = selectedStudent.src;
    return (
      <Fragment>
        <div style={{ cursor: "pointer" }} onClick={this.toggle}>
          <CardImg
            top
            width="100%"
            height="auto"
            src={src}
            alt="Card image cap"
          />
        </div>
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
      </Fragment>
    );
  }
}
StudentModal.propTypes = {
  items: PropTypes.array.isRequired
};
export default StudentModal;
