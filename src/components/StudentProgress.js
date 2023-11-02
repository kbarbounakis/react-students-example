import { ProgressBar, Placeholder } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap} from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'react-i18next';

const StudentProgress = ({ student }) => {
    let studentProgress = 0
    let semester = "-";
    let semesters = "-";
    if (student) {
        studentProgress = parseInt(100*(student?.semester/student?.studyProgram?.semesters), 10);
        semester = student?.semester;
        semesters = student?.studyProgram?.semesters;
    }
    const { t } = useTranslation();
    return (
        <>
            <div className="d-flex justify-content-between justify-content-center align-items-center">
              <div className='mx-4 w-100'>
                <ProgressBar className='progress-semester' striped={false} animated={false} variant='theme' now={studentProgress} />
              </div>
              <div>
                <FontAwesomeIcon color="gainsboro" icon={faGraduationCap} size="3x" />
              </div>
            </div>
            <div className="d-flex justify-content-md-between justify-content-center mt-2">
                <div className='d-none d-md-block'>
                    <h5 className="font-weight-normal text-gray-300">{1}/{t("Semester")}</h5>
                </div>
                <div>
                    <h4 className="font-weight-normal">{semester}/{t("Semester")}</h4>
                </div>
                <div className='d-none d-md-block'>
                    <h5 className="font-weight-normal text-gray-300">{semesters}/{t("Semester")}</h5>
                </div>
            </div>
        </>
    )
}

export {
    StudentProgress
}