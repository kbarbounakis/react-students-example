import React from "react";
import { useContext, useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { Row, Col, ProgressBar } from "react-bootstrap";
import { ApplicationContext } from '../ApplicationContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap} from '@fortawesome/free-solid-svg-icons'
import { StudentProgress } from './StudentProgress';

const StudentDashboard = () => {
  const { t } = useTranslation();
  const [student, setStudent] = useState(null);
  const [studentProgress, setStudentProgress] = useState(0);
  /**
   * @type {{context:import('@themost/react').ReactDataContext}}
   */
  const {context} = useContext(ApplicationContext);
  useEffect(() => {
    context.model('Students/Me').asQueryable().expand((x) => {x.studyProgram}).getItem().then((result) => {
      setStudent(result)
      setStudentProgress(100*(result.semester/result.studyProgram.semesters))
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
              <h1>
                {t("Dashboard")}
                <h6 className='font-weight-normal'>{student?.person?.familyName} {student?.person?.givenName}</h6>
              </h1>
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

        </Col>
        <Col lg={6}>

        </Col>
      </Row>

    </>
  );
};
export default StudentDashboard;
