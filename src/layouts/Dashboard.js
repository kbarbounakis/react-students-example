import React, { useContext } from "react";
import { Container, Row, Col, Navbar, NavDropdown, Nav } from "react-bootstrap";
import Home from "../components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserService } from "../services/UserService";
import {LoginCallbackWithRouter} from "../components/LoginCallback";
import { useTranslation } from "react-i18next";
import { ApplicationContext } from '../ApplicationContext';
import * as ISO6391 from 'iso-639-1';
import StudentDashboard from '../components/StudentDashboard'
import { LogoutWithRouter } from '../components/Logout';

const routes = [
  {
    path: "/auth/callback",
    element: <LoginCallbackWithRouter />
  },
  {
    path: "/auth/logout",
    element: <LogoutWithRouter />
  },
  {
    path: "/",
    exact: true,
    element: <Home />,
  },
  {
    path: "/dashboard",
    element: <StudentDashboard />
  }
];

const Dash = () => {
  const { t } = useTranslation();
  const {configuration, context} = useContext(ApplicationContext);
  const userService = new UserService(configuration, context);
  const currentUser = userService.getUser();
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
            </Nav>
            <Nav>
              {
                (currentUser != null) ?
                (
                  <NavDropdown title={currentUser.name} id="basic-nav-dropdown">
                    <NavDropdown.Item href="/auth/logout">
                    {t("Logout")}
                    </NavDropdown.Item>
                  </NavDropdown>
                ) :
                <Nav.Link href={userService.loginURI}>
                  {t("Login")}
                </Nav.Link>
              }
              <NavDropdown title={ISO6391.getNativeName(configuration.settings.i18n.defaultLocale)} id="basic-nav-dropdown">
                {
                  configuration.settings.i18n.locales.map((locale) => (
                    <NavDropdown.Item href={"/language/set/" + locale}>
                      {ISO6391.getNativeName(locale)}
                    </NavDropdown.Item>
                  ))
                }
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Container fluid>
          <Row>
            <Col className="pt-3" xs={12} id="page-content-wrapper">
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
