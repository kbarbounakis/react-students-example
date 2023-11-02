import { useTranslation } from 'react-i18next';
import { useEffect, useContext, useState } from 'react';
import { ApplicationContext } from '../ApplicationContext';
import { any as anyOf } from '@themost/query';
import { Card, Placeholder } from 'react-bootstrap';

const RecentCourses = ({ student }) => {
    const [currentRegistration, setCurrentRegistration] = useState({ classes: [] });
    const [examYear, setExamYear] = useState(null);
    const [examPeriod, setExamPeriod] = useState(null);
    const {context} = useContext(ApplicationContext);
  useEffect(() => {
    context.model('Students/Me/CurrentRegistration')
    .asQueryable()
    .expand(
        anyOf((x) => {x.classes}).expand(
            anyOf((x) => {x.courseType}).expand(
                anyOf((x) => {x.locale})
            ),
            anyOf((x) => {x.courseClass}).expand(
                anyOf((x) => {x.course}).expand(
                    anyOf((x) => {x.locale})
                ),
                anyOf((x) => {x.instructors}).expand(
                    anyOf((x) => {x.instructor}).select((x) => {x.instructorSummary})
                )
            )
        ),
    )
    .getItem().then((result) => {
        if (result != null) {
            setCurrentRegistration(result)
        }
    })
    
  }, []);

    const { t } = useTranslation();
    return (
        <>
            <div className='mb-4'>
                <h2>{t('My Courses')}</h2>
                <h6 className='font-weight-normal'>{currentRegistration?.registrationYear?.name} {currentRegistration?.registrationPeriod?.name}</h6>
            </div>
            <>
           {
            currentRegistration.classes.map((item) => (
                <Card key={item.id} className='mb-2'>
                    <Card.Body>
                        <div className="d-flex align-items-center">
                            <div>
                                <Card.Title>
                                    {item.courseClass.title}
                                    <h6 className="font-weight-normal">{item.courseType?.name}</h6>
                                </Card.Title>
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
                                <a href='#' className='btn btn-outline-theme rounded-pill btn-more btn-block my-4 disabled'>
                                    <span className='px-4'>{t('eLearning')}</span>
                                    </a>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            ))
           }
            </>
        </>
    )
}

export {
    RecentCourses
}