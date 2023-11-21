import BackgroundLogo from '../../components/background-logo/background-logo';
import Layout from '../../components/layout/layout';
import LevelRadio from '../../components/level-radio/level-radio';
import SpecializationGroup from '../../components/specialization-group/specialization-group';
import { Role } from '../../types/role.enum';

function QuestionnaireUserScreen(): JSX.Element {
  return(
    <Layout>
      <BackgroundLogo/>
      <div className="popup-form popup-form--questionnaire-user">
        <div className="popup-form__wrapper">
          <div className="popup-form__content">
            <div className="popup-form__form">
              <form method="get">
                <div className="questionnaire-user">
                  <h1 className="visually-hidden">Опросник</h1>
                  <div className="questionnaire-user__wrapper">
                    <SpecializationGroup role={Role.User}/>
                    <div className="questionnaire-user__block"><span className="questionnaire-user__legend">Сколько времени вы готовы уделять на тренировку в день</span>
                      <div className="custom-toggle-radio custom-toggle-radio--big questionnaire-user__radio">
                        <div className="custom-toggle-radio__block">
                          <label>
                            <input type="radio" name="time"/><span className="custom-toggle-radio__icon"></span><span className="custom-toggle-radio__label">10-30 мин</span>
                          </label>
                        </div>
                        <div className="custom-toggle-radio__block">
                          <label>
                            <input type="radio" name="time"/><span className="custom-toggle-radio__icon"></span><span className="custom-toggle-radio__label">30-50 мин</span>
                          </label>
                        </div>
                        <div className="custom-toggle-radio__block">
                          <label>
                            <input type="radio" name="time"/><span className="custom-toggle-radio__icon"></span><span className="custom-toggle-radio__label">50-80 мин</span>
                          </label>
                        </div>
                        <div className="custom-toggle-radio__block">
                          <label>
                            <input type="radio" name="time"/><span className="custom-toggle-radio__icon"></span><span className="custom-toggle-radio__label">80-100 мин</span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <LevelRadio role={Role.User}/>
                    <div className="questionnaire-user__block">
                      <div className="questionnaire-user__calories-lose"><span className="questionnaire-user__legend">Сколько калорий хотите сбросить</span>
                        <div className="custom-input custom-input--with-text-right questionnaire-user__input">
                          <label>
                            <span className="custom-input__wrapper">
                              <input type="number" name="calories-lose"/>
                              <span className="custom-input__text">ккал</span>
                            </span>
                          </label>
                        </div>
                      </div>
                      <div className="questionnaire-user__calories-waste"><span className="questionnaire-user__legend">Сколько калорий тратить в день</span>
                        <div className="custom-input custom-input--with-text-right questionnaire-user__input">
                          <label>
                            <span className="custom-input__wrapper">
                              <input type="number" name="calories-waste"/>
                              <span className="custom-input__text">ккал</span>
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="btn questionnaire-user__button" type="submit">Продолжить</button>
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
