import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as utils from "../utils";
import { updateStudent } from "../store/actions/studentActions";

class EditStudentModal extends Component {
  constructor(props) {
    super(props);

    const selectedStudent =
      props.students.find(student => student._id === props.myId) || {};

    this.state = {
      modal: false,
      name: "",
      photo: "",
      src: selectedStudent.src || "",
      alt: selectedStudent.alt || "",
      firstName: selectedStudent.firstName || "",
      lastName: selectedStudent.lastName || "",
      message: selectedStudent.message || ""
    };
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleUpdate = e => {
    e.preventDefault();
    const _id = this.props.myId;
    const newPhoto = this.state.photo;
    const newSrc = this.state.src;
    const newAlt = this.state.alt;
    const formData = new FormData();
    formData.append("photo", newPhoto);
    formData.append("src", newSrc);
    formData.append("alt", newAlt);
    formData.append("firstName", this.state.firstName);
    formData.append("lastName", this.state.lastName);
    formData.append("message", this.state.message);
    this.props.updateStudent(formData, _id);
    // Close modal
    this.toggle();
  };
  handleOnChange = e => {
    const {
      target: { value, name }
    } = e;
    this.setState({
      [name]: value
    });
  };
  changePhoto(e) {
    this.setState({ photo: e.target.files[0] });
  }
  render() {
    const errors = utils.validate(this.state.firstName, this.state.lastName);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return (
      <div>
        {this.props.isAuthenticated ? (
          <Button color="dark" onClick={this.toggle}>
            <i className="fas fa-edit" />
          </Button>
        ) : null}

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Edit Student</ModalHeader>
          <ModalBody>
            <div className="container">
              <Form method="put">
                <FormGroup>
                  <Label htmlFor="photo">Update photo:</Label>
                  <Input
                    className="photo"
                    id="photo"
                    name="photo"
                    type="file"
                    multiple="multiple"
                    onChange={e => this.changePhoto(e)}
                  />
                  <Label htmlFor="firstName">First name:</Label>
                  <Input
                    className={errors.firstName ? "error" : ""}
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="First name"
                    value={this.state.firstName}
                    onChange={this.handleOnChange}
                  />

                  <Label htmlFor="lastName">Last name:</Label>
                  <Input
                    className={errors.lastName ? "error" : ""}
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Last name"
                    value={this.state.lastName}
                    onChange={this.handleOnChange}
                  />
                  <Label htmlFor="message">Info:</Label>
                  <Input
                    id="message"
                    name="message"
                    type="textarea"
                    placeholder="Info"
                    value={this.state.message}
                    onChange={this.handleOnChange}
                  />
                  <div className="form-submit">
                    <Button
                      className="button-save"
                      type="submit"
                      disabled={isDisabled}
                      onClick={this.handleUpdate}
                      style={{ marginTop: "2rem" }}
                      block
                    >
                      Update
                    </Button>
                  </div>
                </FormGroup>
              </Form>
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  student: state.student,
  students: state.student.students,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { updateStudent }
)(EditStudentModal);
