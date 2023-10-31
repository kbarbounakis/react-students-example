import React from "react";
import { useContext } from 'react';
import { useTranslation } from "react-i18next";
import { Row, Col } from "react-bootstrap";
import { ApplicationContext } from '../ApplicationContext';

const StudentDashboard = () => {
  const { t } = useTranslation();
  /**
   * @type {{context:import('@themost/react').ReactDataContext}}
   */
  const {context} = useContext(ApplicationContext);
  context.model('Students/Me').asQueryable().getItem().then((student) => {
    console.log(student);
  });
  return (
    <>
      <Row>
      
      </Row>
      <Row>
        <Col lg={6}>

        </Col>
        <Col lg={6}>

        </Col>
      </Row>
      
    </>
  );
};
export default StudentDashboard;
