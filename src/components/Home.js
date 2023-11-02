import React from "react";
import { useContext } from 'react';
import { useTranslation } from "react-i18next";
import { Row, Col, Button } from "react-bootstrap";
import { UserService } from '../services/UserService';
import { ApplicationContext } from '../ApplicationContext';
import { Navigate, useLocation } from 'react-router';

const Home = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const {configuration, context} = useContext(ApplicationContext);
  const userService = new UserService(configuration, context);
  const user = userService.getUser();
  if (user) {
    return (
      <>
        <Navigate to="/dashboard"></Navigate>
      </>
    )
  }
  return (
    <>
        <Col lg={12} className="mt-5 text-center">
          <div className="jumbotron bg-gray-100">
            <div className='mb-3'>
            <img height={64} src='https://api.universis.io/images/universis_256.png'></img>
            <img height={64} src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png'></img>
            </div>
            <h1 className="display-4 d-none d-sm-block">@universis/react-students</h1>
            <p className="lead">This starter project demonstrates the usage of React for developing an alternative of <a href="https://gitlab.com/universis/universis-students">@universis/students</a></p>
            <hr className="my-4" />
            <p className="lead">
              <a href={userService.loginURI} className='btn btn-indigo btn-lg text-white'>Login</a>
            </p>
          </div>
        </Col>
    </>
  );
};
export default Home;
