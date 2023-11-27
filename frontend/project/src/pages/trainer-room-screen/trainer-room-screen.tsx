import { Fragment } from 'react';
import Header from '../../components/header/header';
import UserAvatar from '../../components/user-avatar/user-avatar';
import UserControls from '../../components/user-controls/user-controls';
import UserAbout from '../../components/user-about/user-about';
import UserStatus from '../../components/user-status/user-status';
import UserSpecializationGroup from '../../components/user-specialization-group/user-specialization-group';
import UserLocationSelect from '../../components/user-location-select/user-location-select';
import UserGenderSelect from '../../components/user-gender-select/user-gender-select';
import UserLevelSelect from '../../components/user-level-select/user-level-select';
import PersonalAccountCoach from '../../components/personal-account-coach/personal-account-coach';

function TrainerRoomScreen():JSX.Element {
  return(
    <Fragment>
      <Header/>
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Личный кабинет</h1>
              <section className="user-info-edit">
                <div className="user-info-edit__header">
                  <UserAvatar/>
                  <UserControls/>
                </div>
                <form className="user-info-edit__form" action="#" method="post">
                  <button className="btn-flat btn-flat--underlined user-info-edit__save-button" type="submit" aria-label="Сохранить">
                    <svg width="12" height="12" aria-hidden="true">
                      <use xlinkHref="#icon-edit"></use>
                    </svg><span>Сохранить</span>
                  </button>
                  <UserAbout/>
                  <UserStatus/>
                  <div className="user-info-edit__section">
                    <UserSpecializationGroup/>
                  </div>
                  <UserLocationSelect/>
                  <UserGenderSelect/>
                  <UserLevelSelect/>
                </form>
              </section>
              <div className="inner-page__content">
                <PersonalAccountCoach/>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Fragment>
  );
}

export default TrainerRoomScreen;
