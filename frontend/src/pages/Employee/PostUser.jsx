import { useState } from "react";
import "./PostUser.css";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function PostUser() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
  });

  const navigate = useNavigate();

  // Handle input changes and clear error messages
  function handleInput(event) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error message for the specific field being changed
    setErrors({
      ...errors,
      [name]: "",
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    const validationErrors = {};
    if (!formData.name) validationErrors.name = "Name is required";
    if (!formData.email) validationErrors.email = "Email is required";
    if (!formData.phone) validationErrors.phone = "Phone number is required";
    if (!formData.department)
      validationErrors.department = "Department is required";

    // If there are validation errors, update state and return
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/employee", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Employee created", data);
      navigate("/");
    } catch (error) {
      console.log("Error creating employee", error.message);
    }
  };

  return (
    <div>
      <div className="center-form">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicName">
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter Name"
              value={formData.name}
              onChange={handleInput}
              isInvalid={!!errors.name} // Add invalid style if error exists
            />
            {errors.name && <Alert variant="danger">{errors.name}</Alert>}
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleInput}
              isInvalid={!!errors.email}
            />
            {errors.email && <Alert variant="danger">{errors.email}</Alert>}
          </Form.Group>

          <Form.Group controlId="formBasicPhone">
            <Form.Control
              type="text"
              name="phone"
              placeholder="Enter Phone Number"
              value={formData.phone}
              onChange={handleInput}
              isInvalid={!!errors.phone}
            />
            {errors.phone && <Alert variant="danger">{errors.phone}</Alert>}
          </Form.Group>

          <Form.Group controlId="formBasicDepartment">
            <Form.Control
              type="text"
              name="department"
              placeholder="Enter Department"
              value={formData.department}
              onChange={handleInput}
              isInvalid={!!errors.department}
            />
            {errors.department && (
              <Alert variant="danger">{errors.department}</Alert>
            )}
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Post Employee
          </Button>
        </Form>
      </div>
    </div>
  );
}
