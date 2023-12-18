import BackgroundLogo from '../../components/background-logo/background-logo';
import SpecializationGroup from '../../components/specialization-group/specialization-group';
import useRegisterForm from '../../hooks/use-register-form/use-register-form';
import { Role } from '../../types/role.enum';
import RadioSelect from '../../components/radio-select/radio-select';
import { TrainingLevel } from '../../types/training-level.enum';
import Layout from '../../components/layout/layout';

const errorStyle = {
  color: '#e4001b',
  opacity: 1,
  marginTop: '6px'
};

function QuestionnaireTrainerScreen(): JSX.Element {
  const {
    specializationsError,
    descriptionError,
    certificateError,
    levelError,
    isSubmitting,
    descriptionRef,
    selectedDescription,
    readinessToWorkout,
    selectedFile,
    selectedLevel,
    handleDescriptionChange,
    handleReadinessForWorkoutChange,
    handleCertificateChange,
    handleTrainerQuestion,
    handleLevelChange } = useRegisterForm();

  return(
    <Layout includeHeader={false}>
      <BackgroundLogo/>
      <div className="popup-form popup-form--questionnaire-coach">
        <div className="popup-form__wrapper">
          <div className="popup-form__content">
            <div className="popup-form__form">
              <form method="get" onSubmit={handleTrainerQuestion}>
                <div className="questionnaire-coach">
                  <h1 className="visually-hidden">Опросник</h1>
                  <div className="questionnaire-coach__wrapper">
                    <SpecializationGroup role={Role.Trainer} error={specializationsError}/>
                    <RadioSelect
                      name={'level'}
                      classType={'questionnaire-coach__block'}
                      classLabelType={'questionnaire-coach__legend'}
                      label={'Ваш уровень'}
                      classChildType={'custom-toggle-radio custom-toggle-radio--big questionnaire-coach__radio'}
                      selectedValue={selectedLevel}
                      onValueChange={handleLevelChange}
                      object={Object.values(TrainingLevel)}
                      error={levelError}
                    />
                    <div className={`questionnaire-coach__block ${certificateError && 'is-invalid'}`}>
                      <span className="questionnaire-coach__legend">{selectedFile ? selectedFile : 'Ваши дипломы и сертификаты'}</span>
                      <div className="drag-and-drop questionnaire-coach__drag-and-drop">
                        <label>
                          <span className="drag-and-drop__label" tabIndex={0}>Загрузите сюда файлы формата PDF, JPG или PNG
                            <svg width="20" height="20" aria-hidden="true">
                              <use xlinkHref="#icon-import"></use>
                            </svg>
                          </span>
                          <input type="file" name="import" tabIndex={-1} accept=".pdf, .jpg, .png" onChange={handleCertificateChange}/>
                          {certificateError && <span style={errorStyle}>{certificateError}</span>}
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
                          {descriptionError && <span style={errorStyle}>{descriptionError}</span>}
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
    </Layout>
  );
}

export default QuestionnaireTrainerScreen;
