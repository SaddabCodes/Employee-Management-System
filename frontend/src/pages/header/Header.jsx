import "./Header.css";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand to="/">
            {" "}
            <strong>Employee Management System</strong>{" "}
          </Navbar.Brand>

          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/" className="nav-link">
              Employee
            </Nav.Link>

            <Nav.Link as={Link} to="/employee" className="nav-link">
              Post Employee
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
