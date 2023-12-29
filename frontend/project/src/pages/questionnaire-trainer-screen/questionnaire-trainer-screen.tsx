import BackgroundLogo from '../../components/background-logo/background-logo';
import SpecializationGroup from '../../components/specialization-group/specialization-group';
import RadioSelect from '../../components/radio-select/radio-select';
import { TrainingLevel } from '../../types/training-level.enum';
import Layout from '../../components/layout/layout';
import Loading from '../../components/loading/loading';
import { Trainer } from '../../types/trainer.interface';
import { addCurrentUserSpecialization, changeCurrentUserLevel, removeCurrentUserSpecialization, setCurrentUserCertificate, setCurrentUserDescription } from '../../store/user-process/user-process.slice';
import { WorkoutType } from '../../types/workout-type.enum';
import { ChangeEvent, FormEvent, useState } from 'react';
import { DESCRIPTION_CONSTRAINTS } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { getCurrentUser, getSubmittingStatus } from '../../store/user-process/user-process.selectors';
import QuestionnaireCoachReandiness from '../../components/questionnaire-coach-reandiness/questionnaire-coach-reandiness';
import CreateTrainerDto from '../../dto/create-trainer.dto.js';
import { registerAction } from '../../store/api-actions/auth-api-actions/auth-api-actions';

const errorStyle = {
  color: '#e4001b',
  opacity: 1,
  marginTop: '6px'
};

function QuestionnaireTrainerScreen(): JSX.Element {
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector(getCurrentUser);

  const isSubmitting = useAppSelector(getSubmittingStatus);

  const [levelError, setLevelError] = useState('');
  const [certificateError, setCertificateError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [specializationsError, setSpecializationsError] = useState('');

  const onTrainerQuestion = (userData: CreateTrainerDto) => {
    dispatch(registerAction(userData));
  };

  const handleTrainerQuestion = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const trainer = currentUser as Trainer;

    if(trainer && trainer.workoutTypes.length === 0){
      setSpecializationsError('Выберите хотябы один вид тренировки');
      return;
    }

    if(trainer.certificates.length === 0){
      setCertificateError('Выберите файл в предложенном формате');
      return;
    }

    if(
      (trainer.description && trainer.description.length < DESCRIPTION_CONSTRAINTS.MIN_LENGTH) ||
      (trainer.description && trainer.description.length > DESCRIPTION_CONSTRAINTS.MAX_LENGTH)
    ){
      setDescriptionError(`Длина описания должна быть от ${DESCRIPTION_CONSTRAINTS.MIN_LENGTH} до ${DESCRIPTION_CONSTRAINTS.MAX_LENGTH} символов`);
      return;
    }

    if (trainer &&
        trainer.description !== undefined &&
        trainer.trainingLevel !== null &&
        trainer.certificates.length !== 0
    ){
      const userData: CreateTrainerDto = {
        ...trainer,
        description: trainer.description,
        workoutTypes: trainer.workoutTypes,
        trainingLevel: trainer.trainingLevel,
        personalTraining: trainer.personalTraining,
        certificates: trainer.certificates
      };

      onTrainerQuestion(userData);
    }
  };

  const handleLevelChange = (evt: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLLIElement>) => {
    const newLevel = 'value' in evt.target ?
      (evt.target as HTMLInputElement).value as TrainingLevel :
        (evt.target as HTMLLIElement).dataset.value as TrainingLevel;
    setLevelError('');
    dispatch(changeCurrentUserLevel(newLevel));
  };

  const handleSpecializationChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const selectedType = evt.target.value as WorkoutType;
    setSpecializationsError('');

    if (evt.target.checked) {
      dispatch(addCurrentUserSpecialization(selectedType));
    } else {
      dispatch(removeCurrentUserSpecialization(selectedType));
    }
  };

  const handleDescriptionChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    const descriptionValue = evt.target.value;
    dispatch(setCurrentUserDescription(descriptionValue));
    setDescriptionError('');
  };

  const handleCertificateChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const file = evt.target.files?.[0];

    const isJpegOrPngOrPdf = file?.type === 'image/jpeg' || file?.type === 'image/png' || file?.type === 'application/pdf';

    if (isJpegOrPngOrPdf) {
      const fileName = file.name;
      setCertificateError('');
      dispatch(setCurrentUserCertificate(fileName));
    } else {
      setCertificateError('Выбранный файл должен быть формата JPEG (jpg) или PNG (png) или PDF (pdf).');
    }
  };

  const currentTrainer = currentUser as Trainer;

  if(!currentUser){
    return <Loading/>;
  }

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
                    <SpecializationGroup currentUser={currentUser} error={specializationsError} onSpecializationChange={handleSpecializationChange}/>
                    <RadioSelect
                      name={'level'}
                      classType={'questionnaire-coach__block'}
                      classLabelType={'questionnaire-coach__legend'}
                      label={'Ваш уровень'}
                      classChildType={'custom-toggle-radio custom-toggle-radio--big questionnaire-coach__radio'}
                      selectedValue={currentTrainer.trainingLevel}
                      onValueChange={handleLevelChange}
                      object={Object.values(TrainingLevel).filter((level) => level !== TrainingLevel.Unknown)}
                      error={levelError}
                    />
                    <div className={`questionnaire-coach__block ${certificateError && 'is-invalid'}`}>
                      <span className="questionnaire-coach__legend">{currentTrainer.certificates[0] ? currentTrainer.certificates[0] : 'Ваши дипломы и сертификаты'}</span>
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
                            value={currentTrainer.description ?? ''}
                            onChange={handleDescriptionChange}
                            required
                          >
                          </textarea>
                          {descriptionError && <span style={errorStyle}>{descriptionError}</span>}
                        </label>
                      </div>
                      <QuestionnaireCoachReandiness/>
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
