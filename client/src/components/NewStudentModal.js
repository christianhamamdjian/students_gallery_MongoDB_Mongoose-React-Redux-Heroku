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
import { newStudent } from "../store/actions/studentActions";
import PropTypes from "prop-types";
import * as utils from "../utils";

class NewStudentModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: "",
      src: "",
      alt: "",
      firstName: "",
      lastName: "",
      message: "",
      inFocus: "",
      modal: false,
      name: ""
    };
  }

  handleSave = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("photo", this.state.photo);
    formData.append("src", this.state.photo.name);
    formData.append("alt", this.state.photo.name);
    formData.append("firstName", this.state.firstName);
    formData.append("lastName", this.state.lastName);
    formData.append("message", this.state.message);

    this.props.newStudent(formData);
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

  render() {
    const errors = utils.validate(this.state.firstName, this.state.lastName);
    return (
      <div>
        <Button
          color="dark"
          style={{ marginBottom: "2rem" }}
          onClick={this.toggle}
        >
          Add a UNICORN
        </Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            ADD TO UNICORN GALLERY
          </ModalHeader>
          <ModalBody>
            <div className="subhead" />
            <div className="container">
              <Form method="post">
                <FormGroup>
                  <Label htmlFor="photo">Upload photo:</Label>
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
                    placeholder="Message"
                    value={this.state.message}
                    onChange={this.handleOnChange}
                  />
                  <Button
                    type="submit"
                    // disabled={isDisabled}
                    onClick={this.handleSave}
                    color="dark"
                    style={{ marginTop: "2rem" }}
                    block
                  >
                    Add Student
                  </Button>
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
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { newStudent }
)(NewStudentModal);
