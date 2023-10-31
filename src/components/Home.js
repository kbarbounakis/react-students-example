import React from "react";
import { useContext } from 'react';
import { useTranslation } from "react-i18next";
import { Row, Col, Button } from "react-bootstrap";
import { UserService } from '../services/UserService';
import { ApplicationContext } from '../ApplicationContext';

const Home = () => {
  const { t } = useTranslation();
  const {configuration, context} = useContext(ApplicationContext);
  const userService = new UserService(configuration, context);
  return (
    <>
      <Row>
        <Col className="mt-5 text-center">
          <p class="h5 font-weight-normal">
            this application is an example of <a href="https://gitlab.com/universis/universis-students">@universis/students app</a> dashboard for React
          </p>
          <img class="p-4" height="480" src='/assets/img/students_screenshot.jpg'></img>
        </Col>
      </Row>
      <Row>
      <Col className="mt-3 text-center">
          <a href={userService.loginURI} className='btn btn-indigo text-white'>Login and continue</a>
        </Col>
      </Row>
    </>
  );
};
export default Home;
