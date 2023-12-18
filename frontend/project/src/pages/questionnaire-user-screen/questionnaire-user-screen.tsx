import BackgroundLogo from '../../components/background-logo/background-logo';
import useRegisterForm from '../../hooks/use-register-form/use-register-form';
import SpecializationGroup from '../../components/specialization-group/specialization-group';
import { useAppSelector } from '../../hooks/index';
import { getSubmittingStatus } from '../../store/user-process/user-process.selectors';
import { Role } from '../../types/role.enum';
import RadioSelect from '../../components/radio-select/radio-select';
import { WorkoutDuration } from '../../types/workout-duration.enum';
import { TrainingLevel } from '../../types/training-level.enum';
import Layout from '../../components/layout/layout';
import { CALORIES_CONSTRAINTS } from '../../const';

function QuestionnaireUserScreen(): JSX.Element {
  const isSubmitting = useAppSelector(getSubmittingStatus);

  const {
    specializationsError,
    levelError,
    durationError,
    caloriesLoseRef,
    caloriesWaste,
    selectedDuration,
    selectedLevel,
    handleUserQuestion,
    handleDurationChange,
    handleLevelChange} = useRegisterForm();

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
                    <SpecializationGroup role={Role.User} error={specializationsError}/>
                    <RadioSelect
                      name={'time'}
                      classType={'questionnaire-user__block'}
                      classLabelType={'questionnaire-user__legend'}
                      label={'Сколько времени вы готовы уделять на тренировку в день'}
                      classChildType={'custom-toggle-radio custom-toggle-radio--big questionnaire-user__radio'}
                      selectedValue={selectedDuration}
                      onValueChange={handleDurationChange}
                      object={Object.values(WorkoutDuration)}
                      error={durationError}
                    />
                    <RadioSelect
                      name={'level'}
                      classType={'questionnaire-user__block'}
                      classLabelType={'questionnaire-user__legend'}
                      label={'Ваш уровень'}
                      classChildType={'custom-toggle-radio custom-toggle-radio--big questionnaire-user__radio'}
                      selectedValue={selectedLevel}
                      onValueChange={handleLevelChange}
                      object={Object.values(TrainingLevel)}
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
