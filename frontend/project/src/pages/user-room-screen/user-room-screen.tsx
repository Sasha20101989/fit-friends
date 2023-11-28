import UserAvatar from '../../components/user-avatar/user-avatar';
import UserAbout from '../../components/user-about/user-about';
import UserStatus from '../../components/user-status/user-status';
import UserSpecializationGroup from '../../components/user-specialization-group/user-specialization-group';
import UserLocationSelect from '../../components/user-location-select/user-location-select';
import UserGenderSelect from '../../components/user-gender-select/user-gender-select';
import UserLevelSelect from '../../components/user-level-select/user-level-select';
import UserEditButton from '../../components/user-edit-button/user-edit-button';
import PersonalAccountUser from '../../components/personal-account-user/personal-account-user';

function UserRoomScreen():JSX.Element {
  const isEdit = false;
  return(
    <section className="inner-page">
      <div className="container">
        <div className="inner-page__wrapper">
          <h1 className="visually-hidden">Личный кабинет</h1>
          <section className="user-info">
            <div className="user-info__header">
              <UserAvatar/>
            </div>
            <form className="user-info__form" action="#" method="post">
              <UserEditButton/>
              <UserAbout/>
              <UserStatus/>
              <div className={`user-info${isEdit && '-edit'}__section`}>
                <UserSpecializationGroup/>
              </div>
              <UserLocationSelect/>
              <UserGenderSelect/>
              <UserLevelSelect/>
            </form>
          </section>
          <div className="inner-page__content">
            <PersonalAccountUser/>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserRoomScreen;
