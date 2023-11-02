import React from "react";
import { useContext, useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { Row, Col, Placeholder } from "react-bootstrap";
import { ApplicationContext } from '../ApplicationContext';
import { StudentProgress } from './StudentProgress';
import { RecentGrades } from './RecentGrades';
import { RecentCourses } from './RecentCourses';

const StudentDashboard = () => {
  const { t } = useTranslation();
  const [student, setStudent] = useState(null);
  /**
   * @type {{context:import('@themost/react').ReactDataContext}}
   */
  const {context} = useContext(ApplicationContext);
  useEffect(() => {
    context.model('Students/Me').asQueryable().expand(
      (x) => {x.studyProgram},
      (x) => {x.department}
      ).getItem().then((result) => {
      setStudent(result)
    });
  }, []);

  
  
  return (
    <>
      <Row>
        <Col lg={12}>
          <div className='m-3'>
            <div className='d-flex justify-content-start'>
              <div className='avatar avatar-6 avatar-male-student'></div>
              <div className='ml-3 align-self-center'>
              <h3>
                <span>{student?.person?.familyName} {student?.person?.givenName}</span>
                <div className='h6 font-weight-normal'>
                  {student?.department?.name}
                </div>
              </h3>
            </div>
            </div>
          </div>
        </Col>
        <Col lg={12}>
          <div className='m-3'>
            <StudentProgress student={student} />
          </div>
        </Col>
        <Col lg={12}>

        </Col>
      </Row>
      <Row>
        <Col lg={6}>
          <RecentCourses />
        </Col>
        <Col lg={6}>
          <RecentGrades />
        </Col>
      </Row>

    </>
  );
};
export default StudentDashboard;
