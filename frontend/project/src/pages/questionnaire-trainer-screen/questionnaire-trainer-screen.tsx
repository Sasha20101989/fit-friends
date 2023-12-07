import BackgroundLogo from '../../components/background-logo/background-logo';
import { Fragment } from 'react';
import LevelRadio from '../../components/level-radio/level-radio';
import SpecializationGroup from '../../components/specialization-group/specialization-group';
import { useAppSelector } from '../../hooks/index';
import useRegisterForm from '../../hooks/use-register-form/use-register-form';
import { getSubmittingStatus } from '../../store/user-process/user-process.selectors';
import { Role } from '../../types/role.enum';

function QuestionnaireTrainerScreen(): JSX.Element {
  const isSubmitting = useAppSelector(getSubmittingStatus);
  const {
    descriptionRef,
    selectedDescription,
    readinessToWorkout,
    selectedFile,
    handleDescriptionChange,
    handleReadinessForWorkoutChange,
    handleCertificateChange,
    handleTrainerQuestion } = useRegisterForm();

  return(
    <Fragment>
      <BackgroundLogo/>
      <div className="popup-form popup-form--questionnaire-coach">
        <div className="popup-form__wrapper">
          <div className="popup-form__content">
            <div className="popup-form__form">
              <form method="get" onSubmit={handleTrainerQuestion}>
                <div className="questionnaire-coach">
                  <h1 className="visually-hidden">Опросник</h1>
                  <div className="questionnaire-coach__wrapper">
                    <SpecializationGroup role={Role.Trainer}/>
                    <LevelRadio role={Role.Trainer}/>
                    <div className="questionnaire-coach__block"><span className="questionnaire-coach__legend">{selectedFile ? selectedFile : 'Ваши дипломы и сертификаты'}</span>
                      <div className="drag-and-drop questionnaire-coach__drag-and-drop">
                        <label>
                          <span className="drag-and-drop__label" tabIndex={0}>Загрузите сюда файлы формата PDF, JPG или PNG
                            <svg width="20" height="20" aria-hidden="true">
                              <use xlinkHref="#icon-import"></use>
                            </svg>
                          </span>
                          <input type="file" name="import" tabIndex={-1} accept=".pdf, .jpg, .png" onChange={handleCertificateChange}/>
                        </label>
                      </div>
                    </div>
                    <div className="questionnaire-coach__block">
                      <span className="questionnaire-coach__legend">Расскажите о своём опыте, который мы сможем проверить</span>
                      <div className="custom-textarea questionnaire-coach__textarea">
                        <label>
                          <textarea
                            name="description"
                            placeholder=" "
                            ref={descriptionRef}
                            value={selectedDescription ?? ''}
                            onChange={handleDescriptionChange}
                            required
                          >
                          </textarea>
                        </label>
                      </div>
                      <div className="questionnaire-coach__checkbox">
                        <label>
                          <input
                            type="checkbox"
                            value="individual-training"
                            name="individual-training"
                            checked={readinessToWorkout}
                            onChange={handleReadinessForWorkoutChange}
                          />
                          <span className="questionnaire-coach__checkbox-icon">
                            <svg width="9" height="6" aria-hidden="true">
                              <use xlinkHref="#arrow-check"></use>
                            </svg>
                          </span>
                          <span className="questionnaire-coach__checkbox-label">Хочу дополнительно индивидуально тренировать</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <button className="btn questionnaire-coach__button" type="submit" disabled={isSubmitting}>Продолжить</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default QuestionnaireTrainerScreen;
