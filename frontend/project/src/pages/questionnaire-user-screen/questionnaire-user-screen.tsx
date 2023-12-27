import BackgroundLogo from '../../components/background-logo/background-logo';
import SpecializationGroup from '../../components/specialization-group/specialization-group';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { getCurrentUser, getSubmittingStatus } from '../../store/user-process/user-process.selectors';
import RadioSelect from '../../components/radio-select/radio-select';
import { WorkoutDuration } from '../../types/workout-duration.enum';
import { TrainingLevel } from '../../types/training-level.enum';
import Layout from '../../components/layout/layout';
import { CALORIES_CONSTRAINTS } from '../../const';
import { User } from '../../types/user.interface';
import Loading from '../../components/loading/loading';
import { addCurrentUserSpecialization, changeCurrentUserDuration, changeCurrentUserLevel, removeCurrentUserSpecialization } from '../../store/user-process/user-process.slice';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { WorkoutType } from '../../types/workout-type.enum';
import CreateUserDto from '../../dto/create-user.dto';
import { registerAction } from '../../store/api-actions/auth-api-actions/auth-api-actions';

function QuestionnaireUserScreen(): JSX.Element {
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector(getCurrentUser);

  const isSubmitting = useAppSelector(getSubmittingStatus);

  const caloriesLoseRef = useRef<HTMLInputElement | null>(null);
  const caloriesWaste = useRef<HTMLInputElement | null>(null);

  const [durationError, setDurationError] = useState('');
  const [levelError, setLevelError] = useState('');
  const [specializationsError, setSpecializationsError] = useState('');

  const onUserQuestion = (userData: CreateUserDto) => {
    dispatch(registerAction(userData));
  };

  const handleUserQuestion = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const user = currentUser as User;

    if (user &&
        caloriesLoseRef.current !== null &&
        caloriesWaste.current !== null &&
        user.workoutTypes.length > 0 &&
        user.trainingLevel !== undefined &&
        user.workoutDuration !== null) {

      const userData: CreateUserDto = {
        ...user,
        caloriesToBurn: parseInt(caloriesLoseRef.current.value, 10),
        caloriesToSpend: parseInt(caloriesWaste.current.value, 10),
        workoutTypes: user.workoutTypes,
        trainingLevel: user.trainingLevel,
        workoutDuration: user.workoutDuration
      };

      onUserQuestion(userData);
    }
  };

  const handleLevelChange = (evt: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLLIElement>) => {
    const newLevel = 'value' in evt.target ?
      (evt.target as HTMLInputElement).value as TrainingLevel :
        (evt.target as HTMLLIElement).dataset.value as TrainingLevel;
    setLevelError('');
    dispatch(changeCurrentUserLevel(newLevel));
  };

  const handleDurationChange = (evt: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLLIElement>) => {
    const newDuration = 'value' in evt.target ?
    (evt.target as HTMLInputElement).value as WorkoutDuration :
      (evt.target as HTMLLIElement).dataset.value as WorkoutDuration;
    setDurationError('');
    dispatch(changeCurrentUserDuration(newDuration));
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

  if(!currentUser){
    return <Loading/>;
  }

  const user = currentUser as User;

  return(
    <Layout includeHeader={false}>
      <BackgroundLogo/>
      <div className="popup-form popup-form--questionnaire-user">
        <div className="popup-form__wrapper">
          <div className="popup-form__content">
            <div className="popup-form__form">
              <form method="get" onSubmit={handleUserQuestion}>
                <div className="questionnaire-user">
                  <h1 className="visually-hidden">Опросник</h1>
                  <div className="questionnaire-user__wrapper">
                    <SpecializationGroup currentUser={currentUser} error={specializationsError} onSpecializationChange={handleSpecializationChange}/>
                    <RadioSelect
                      name={'time'}
                      classType={'questionnaire-user__block'}
                      classLabelType={'questionnaire-user__legend'}
                      label={'Сколько времени вы готовы уделять на тренировку в день'}
                      classChildType={'custom-toggle-radio custom-toggle-radio--big questionnaire-user__radio'}
                      selectedValue={user.workoutDuration}
                      onValueChange={handleDurationChange}
                      object={Object.values(WorkoutDuration).filter((duration) => duration !== WorkoutDuration.Unknown)}
                      error={durationError}
                    />
                    <RadioSelect
                      name={'level'}
                      classType={'questionnaire-user__block'}
                      classLabelType={'questionnaire-user__legend'}
                      label={'Ваш уровень'}
                      classChildType={'custom-toggle-radio custom-toggle-radio--big questionnaire-user__radio'}
                      selectedValue={user.trainingLevel}
                      onValueChange={handleLevelChange}
                      object={Object.values(TrainingLevel).filter((level) => level !== TrainingLevel.Unknown)}
                      error={levelError}
                    />
                    <div className="questionnaire-user__block">
                      <div className="questionnaire-user__calories-lose"><span className="questionnaire-user__legend">Сколько калорий хотите сбросить</span>
                        <div className="custom-input custom-input--with-text-right questionnaire-user__input">
                          <label>
                            <span className="custom-input__wrapper">
                              <input type="number" name="calories-lose" ref={caloriesLoseRef} id="calories-lose" required max={CALORIES_CONSTRAINTS.MAX} min={CALORIES_CONSTRAINTS.MIN}/>
                              <span className="custom-input__text">ккал</span>
                            </span>
                          </label>
                        </div>
                      </div>
                      <div className="questionnaire-user__calories-waste"><span className="questionnaire-user__legend">Сколько калорий тратить в день</span>
                        <div className="custom-input custom-input--with-text-right questionnaire-user__input">
                          <label>
                            <span className="custom-input__wrapper">
                              <input type="number" name="calories-waste" ref={caloriesWaste} id="calories-waste" required max={CALORIES_CONSTRAINTS.MAX} min={CALORIES_CONSTRAINTS.MIN}/>
                              <span className="custom-input__text">ккал</span>
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="btn questionnaire-user__button" type="submit" disabled={isSubmitting}>Продолжить</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default QuestionnaireUserScreen;
