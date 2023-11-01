import { ProgressBar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap} from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'react-i18next';

const StudentProgress = ({ student }) => {
    let studentProgress = 0
    let semester = "-";
    if (student) {
        studentProgress = parseInt(100*(student?.semester/student?.studyProgram?.semesters), 10);
        semester = student?.semester;
    }
    const { t } = useTranslation();
    return (
        <>
            <div className="d-flex justify-content-between justify-content-center align-items-center">
              <div className='mx-4 w-100'>
                <ProgressBar className='progress-semester' striped={false} animated={false} variant='theme' now={studentProgress} />
              </div>
              <div>
                <FontAwesomeIcon color="gainsboro" icon={faGraduationCap} size="4x" />
              </div>
            </div>
            <div className="d-flex justify-content-center">
                <div>
                    <h4 className="font-weight-normal">{semester}/{t("Semester")}</h4>
                </div>
            </div>
        </>
    )
}

export {
    StudentProgress
}