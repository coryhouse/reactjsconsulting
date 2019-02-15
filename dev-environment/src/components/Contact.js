import React, { useState } from "react";
import { saveContactUs } from "../api/contactApi";
import { capitalizeFirstLetter } from "../utils/casing";
import {
  InputGroup,
  FormGroup,
  InputGroupAddon,
  Form,
  Input,
  Label,
  Button,
  Alert,
  Spinner
} from "reactstrap";

// const formStatus = "";

//Enum option 1: Frozen object
// const formStatusEnum = Object.freeze({
//   UNSUBMITTED: "UNSUBMITTED",
//   SUBMITTING: "SUBMITTING",
//   SUBMITTED: "SUBMITTED"
// });

// // Example usage:
// if (formStatus === formStatusEnum.SUBMITTED) {
//   // Do stuff
// }

// // Enum option 2: Use consts
// const FORM_UNSUBMITTED = "FORM_UNSUBMITTED";
// const FORM_SUBMITTING = "FORM_SUBMITTING";
// const FORM_SUBMITTED = "FORM_SUBMITTED";

// // Example usage
// if (formStatus === FORM_SUBMITTED) {
//   // do stuff
// }

const FORM_UNSUBMITTED = "FORM_UNSUBMITTED";
const FORM_SUBMITTED = "FORM_SUBMITTED";
const FORM_SUBMITTING = "FORM_SUBMITTING";

const Contact = () => {
  const [contact, setContact] = useState({});
  const [errors, setErrors] = useState({});
  const [formStatus, setFormStatus] = useState(FORM_UNSUBMITTED);
  const [messageId, setMessageId] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();
    const errors = {}; // Locally scoped var, so not mutating errors object in state above.
    if (!contact.email) errors.email = "Email is required.";
    if (!contact.twitter) errors.twitter = "Twitter username is required.";
    if (!contact.message) errors.message = "Message is required.";
    setErrors(errors);
    if (Object.keys(errors).length > 0) {
      window.scrollTo(0, 0); // scroll to top to assure the error message at top is visible. Necessary for long forms or small windows.
      return;
    }
    setFormStatus(FORM_SUBMITTING);
    saveContactUs(contact).then(({ data }) => {
      setMessageId(data.id);
      setFormStatus(FORM_SUBMITTED);
    });
  }

  function handleChange(event) {
    // Note: Must destructure here to avoid event being garbage collected before its usage inside the setContact callback function.
    const { name, value } = event.target;
    setContact(contact => ({
      ...contact,
      [name]: value
    }));
  }

  // Display validation warning upon blur for required fields
  function handleBlur(event) {
    if (event.target.required) {
      const newErrors = { ...errors };

      event.target.value
        ? delete newErrors[event.target.name]
        : (newErrors[event.target.name] = `${capitalizeFirstLetter(
            event.target.name
          )} is required.`);

      setErrors(newErrors);
    }
  }

  return formStatus === FORM_SUBMITTED ? (
    <>
      <h1>Contact Submitted</h1>
      <p>Thanks for contacting us! Your message ID is {messageId}.</p>
    </>
  ) : (
    <Form onSubmit={handleSubmit}>
      <h1>Contact</h1>
      {Object.keys(errors).length > 0 && (
        <p className="text-danger">Please correct the errors below.</p>
      )}
      <FormGroup>
        <Label for="email">Email *</Label>
        <Input
          type="email"
          name="email"
          id="email"
          required
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Email"
          value={contact.email}
        />
        {errors.email && <Alert color="danger">{errors.email}</Alert>}
      </FormGroup>
      <FormGroup>
        <Label for="twitter">Twitter username</Label>
        <InputGroup>
          <InputGroupAddon addonType="prepend">@</InputGroupAddon>
          <Input
            name="twitter"
            id="twitter"
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="username"
          />
        </InputGroup>
        {errors.twitter && <Alert color="danger">{errors.twitter}</Alert>}
      </FormGroup>
      <FormGroup>
        <Label for="message">Message</Label>
        <Input
          type="textarea"
          name="message"
          onChange={handleChange}
          onBlur={handleBlur}
          id="message"
        />
        {errors.message && <Alert color="danger">{errors.message}</Alert>}
      </FormGroup>
      <Button color="primary" disabled={formStatus === FORM_SUBMITTING}>
        {formStatus === FORM_SUBMITTING ? (
          <>
            "Sending..." <Spinner color="light" size="sm" />
          </>
        ) : (
          "Send"
        )}
      </Button>
    </Form>
  );
};

export default Contact;
