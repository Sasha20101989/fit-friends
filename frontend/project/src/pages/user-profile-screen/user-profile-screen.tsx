import UserAvatar from '../../components/user-avatar/user-avatar';
import UserControls from '../../components/user-controls/user-controls';
import UserAbout from '../../components/user-about/user-about';
import UserStatus from '../../components/user-status/user-status';
import UserSpecializationGroup from '../../components/user-specialization-group/user-specialization-group';
import UserLocationSelect from '../../components/user-location-select/user-location-select';
import UserGenderSelect from '../../components/user-gender-select/user-gender-select';
import UserLevelSelect from '../../components/user-level-select/user-level-select';
import PersonalAccountCoach from '../../components/personal-account-coach/personal-account-coach';
import UserEditButton from '../../components/user-edit-button/user-edit-button';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import useUserRoom from '../../hooks/use-user-room/use-user-room';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { useParams } from 'react-router-dom';
import { getUser } from '../../store/user-process/user-process.selectors';
import { useEffect } from 'react';
import { fetchUserAction } from '../../store/api-actions/user-api-actions/user-api-actions';
import PersonalAccountUser from '../../components/personal-account-user/personal-account-user';
import { Role } from '../../types/role.enum';

function UserProfileScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const user = useAppSelector(getUser);
  const { isFormEditable, handleToggleFormEditable } = useUserRoom();

  useEffect(() => {
    if (id) {
      dispatch(fetchUserAction(id));
    }
  }, [dispatch, id]);

  if (!user || !id) {
    return <NotFoundScreen />;
  }

  const { avatar, name, description, role } = user;

  const contentComponent = role === Role.Trainer ? (
    <PersonalAccountCoach userId={id} />
  ) : (
    <PersonalAccountUser />
  );

  return (
    <section className="inner-page">
      <div className="container">
        <div className="inner-page__wrapper">
          <h1 className="visually-hidden">Личный кабинет</h1>
          <section className={`user-info${isFormEditable ? '-edit' : ''}`}>
            <div className={`user-info${isFormEditable ? '-edit' : ''}__header`}>
              <UserAvatar avatar={avatar ? avatar : ''} />
              {role === Role.Trainer && <UserControls />}
            </div>
            <form className={`user-info${isFormEditable ? '-edit' : ''}__form`} action="#" method="post">
              <UserEditButton isFormEditable={isFormEditable} onToggleFormEditable={handleToggleFormEditable} />
              <UserAbout name={name} description={description ? description : ''} isFormEditable={isFormEditable} />
              <UserStatus isFormEditable={isFormEditable} />
              <div className={`user-info${isFormEditable ? '-edit' : ''}__section`}>
                <UserSpecializationGroup isFormEditable={isFormEditable} />
              </div>
              <UserLocationSelect isFormEditable={isFormEditable} />
              <UserGenderSelect isFormEditable={isFormEditable} />
              <UserLevelSelect isFormEditable={isFormEditable} />
            </form>
          </section>
          <div className="inner-page__content">{contentComponent}</div>
        </div>
      </div>
    </section>
  );
}

export default UserProfileScreen;
