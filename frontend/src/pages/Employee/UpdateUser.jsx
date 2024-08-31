import { useEffect, useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import "./UpdateUser.css";
import { useParams, useNavigate } from "react-router-dom";


export default function UpdateUser() {
  const { id } = useParams();
  const navigate = useNavigate(); 

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

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/employee/${id}`);
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error("Error fetching user:", error.message);
      }
    };
    fetchEmployee();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault(); 

    // Validate form fields
    const validationErrors = {};
    if (!formData.name) validationErrors.name = "Name is required";
    if (!formData.email) validationErrors.email = "Email is required";
    if (!formData.phone) validationErrors.phone = "Phone number is required";
    if (!formData.department) validationErrors.department = "Department is required";

    // If there are validation errors, update state and return
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/employee/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("User updated", data);
      navigate("/");
    } catch (error) {
      console.error("Error updating user", error.message);
    }
  };

  return (
    <div>
      <div className="center-form">
        <h1>Update Employee</h1>
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
            {errors.department && <Alert variant="danger">{errors.department}</Alert>}
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Edit Employee
          </Button>
        </Form>
      </div>
    </div>
  );
}
