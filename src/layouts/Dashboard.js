import React from "react";
import { Container, Row, Col, Navbar, NavDropdown, Nav } from "react-bootstrap";
import Home from "../components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserService } from "../services/UserService";
import LoginCallback from "../components/LoginCallback";
import { useTranslation } from "react-i18next";
import { useLocation } from 'react-router-dom';

const routes = [
  {
    path: "/auth/callback",
    element: <LoginCallback />
  },
  {
    path: "/",
    exact: true,
    element: <Home />,
  },
  {
    path: "/auth/login",
    component: <LoginCallback />,
  }
];

const Dash = () => {
  const { t } = useTranslation();
  const userService = new UserService();
  const currentUser = userService.getCurrentUser();
  if (currentUser == null) {
    // return userService.redirectToLogin();
  }
  return (
    <>
      <Router>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/">Students App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/">{t("Home")}</Nav.Link>
              <Nav.Link href="./link">Link</Nav.Link>
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
              <Nav.Link href={userService.loginURI}>
                {t("Login")}
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
                    element={route.element}
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
