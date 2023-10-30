import React from "react";
import { Container, Row, Col, Navbar, NavDropdown, Nav } from "react-bootstrap";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserService } from "../services/UserService";
import Home from "../components/Home";
import LoginCallback from "../components/LoginCallback";

const routes = [
  {
    path: "/",
    exact: true,
    component: Home,
  },
  {
    path: "/login/callback",
    component: LoginCallback,
  },
];

const Dash = () => {
  const userService = new UserService();
  const currentUser = userService.getCurrentUser();
  if (currentUser == null) {
    // return userService.redirectToLogin();
  }
  return (
    <>
      <Router>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">Students App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link href="/auth/login?client_id=9165351833584149&scope=profile&redirect_uri=/login/callback">
                User
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Container fluid>
          <Row>
            <Col className="pt-3" xs={10} id="page-content-wrapper">
              <Routes>
                {routes.map((route) => (
                  <Route
                    key={route.path}
                    path={route.path}
                    exact={route.exact}
                    render={(props) => <route.component {...props} />}
                  />
                ))}
              </Routes>
            </Col>
          </Row>
        </Container>
      </Router>
    </>
  );
};
const Dashboard = Dash;
export default Dashboard;
