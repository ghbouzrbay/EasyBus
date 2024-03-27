import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const FormInput = ({ label, name, type, placeholder, value, onChange }) => {
  return (
    <Form.Group controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
    </Form.Group>
  );
};

const Form = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(email, password);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormInput
        label="Email address"
        name="email"
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />

      <FormInput
        label="Password"
        name="password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />

      <Button variant="primary" type="submit">
        Submit
      </Button>
   </Form>
  );
};

export default Form;