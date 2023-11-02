import { useTranslation } from 'react-i18next';
import { useEffect, useContext, useState } from 'react';
import { ApplicationContext } from '../ApplicationContext';
import { any } from '@themost/query';
import { Card } from 'react-bootstrap';

const RecentGrades = ({ student }) => {
    const [items, setItems] = useState([]);
    const [examYear, setExamYear] = useState(null);
    const [examPeriod, setExamPeriod] = useState(null);
    const {context} = useContext(ApplicationContext);
  useEffect(() => {
    context.model('Students/Me/Grades').select((x) => {
        return {
            examYear: x.courseExam.year,
            examYearName: x.courseExam.year.name,
            examPeriod: x.courseExam.examPeriod,
            examPeriodName: x.courseExam.examPeriod.name
        }
    }).orderByDescending((x) => { x.courseExam.year })
    .thenByDescending((x) => { x.courseExam.examPeriod })
    .getItem().then(({examYear, examPeriod, examYearName, examPeriodName}) => {
        if (examYear) {
            setExamYear(examYearName)
            setExamPeriod(examPeriodName)
            context.model('Students/Me/Grades')
            .where((x) => {
                return x.courseExam.year == examYear &&
                    x.courseExam.examPeriod == examPeriod
            }, {
                examYear, examPeriod
            })
            .expand(
                any((x) => {x.courseClass}).expand(
                    any((y) => {y.instructors}).expand(
                        any((z) => {z.instructor}).select((x) => {x.instructorSummary})
                        )
                ),
                (x) => {x.course}
            )
            .getItems().then((result) => {
                setItems(result)
            })
        }
    })
    
  }, []);

    const { t } = useTranslation();
    return (
        <>
            <div className='mb-4'>
                <h2>{t('My Recent Grades')}</h2>
                <h6 className='font-weight-normal'>{examYear} {examPeriod}</h6>
            </div>
           {
            items.map((item) => (
                <Card key={item.id} className='mb-2'>
                    <Card.Body>
                        <div className="d-flex align-items-center">
                            <div>
                                <Card.Title>{item.course.name}</Card.Title>
                                <Card.Text>
                                <span>
                                    {
                                        item.courseClass.instructors.map((x) => (
                                            x.instructor.familyName + ' ' +x.instructor.givenName
                                        )).join(', ')
                                    }
                                </span>
                                </Card.Text>
                            </div>
                            <div className='ml-auto'>
                                <span className={`text-secondary h1 font-weight-normal ${item.isPassed ? 'text-success' : 'text-danger'}`}>{item.formattedGrade}</span>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            ))
           }
           
        </>
    )
}

export {
    RecentGrades
}