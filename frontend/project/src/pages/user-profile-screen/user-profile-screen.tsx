import UserAvatar from '../../components/user-avatar/user-avatar';
import UserControls from '../../components/user-controls/user-controls';
import UserAbout from '../../components/user-about/user-about';
import UserStatus from '../../components/user-status/user-status';
import UserSpecializationGroup from '../../components/user-specialization-group/user-specialization-group';
import PersonalAccountCoach from '../../components/personal-account-coach/personal-account-coach';
import UserEditButton from '../../components/user-edit-button/user-edit-button';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { useParams } from 'react-router-dom';
import { getUser } from '../../store/user-process/user-process.selectors';
import { useEffect, useState } from 'react';
import { fetchUserAction } from '../../store/api-actions/user-api-actions/user-api-actions';
import PersonalAccountUser from '../../components/personal-account-user/personal-account-user';
import { Role } from '../../types/role.enum';
import Layout from '../../components/layout/layout';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import DropdownSelect from '../../components/dropdown-select/dropdown-select';
import { Location } from '../../types/location.enum';
import { getGender, getLevel, getLocation } from '../../store/main-process/main-process.selectors';
import { changeLevel, setGender, setLocation } from '../../store/main-process/main-process.slice';
import { capitalizeFirstLetter } from '../../const';
import { Gender } from '../../types/gender.enum';
import { TrainingLevel } from '../../types/training-level.enum';

function UserProfileScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const user = useAppSelector(getUser);
  const selectedGender = useAppSelector(getGender);
  const selectedLocation = useAppSelector(getLocation);
  const selectedLevel = useAppSelector(getLevel);

  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isGenderDropdownOpen, setIsGenderDropdownOpen] = useState(false);
  const [isLevelDropdownOpen, setIsLevelDropdownOpen] = useState(false);
  const [isFormEditable, setIsFormEditable] = useState<boolean>(false);

  const handleToggleFormEditable = (): void => {
    setIsFormEditable(!isFormEditable);
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchUserAction(id));
    }
  }, [dispatch, id]);

  if (!user || !id) {
    return <NotFoundScreen/>;
  }

  const { avatar, name, description, role } = user;

  const contentComponent = role === Role.Trainer ? (
    <PersonalAccountCoach userId={id} />
  ) : (
    <PersonalAccountUser />
  );

  const handleLocationChange = (evt: React.MouseEvent<HTMLLIElement>) => {
    const location: Location = evt.currentTarget.textContent as Location;
    dispatch(setLocation(location));
    setIsLocationDropdownOpen(false);
  };

  const handleSexChange = (evt: React.MouseEvent<HTMLLIElement>) => {
    const gender: Gender = evt.currentTarget.textContent as Gender;
    dispatch(setGender(gender));
    setIsGenderDropdownOpen(false);
  };

  const handleLevelChange = (evt: React.MouseEvent<HTMLLIElement>) => {
    const newLevel: TrainingLevel = evt.currentTarget.textContent as TrainingLevel;
    dispatch(changeLevel(newLevel));
    setIsLevelDropdownOpen(false);
  };

  const handleToggleLocationDropdown = () => setIsLocationDropdownOpen(!isLocationDropdownOpen);
  const handleToggleGenderDropdown = () => setIsGenderDropdownOpen(!isGenderDropdownOpen);
  const handleToggleLevelDropdown = () => setIsLevelDropdownOpen(!isLevelDropdownOpen);

  return (
    <Layout>
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
                <DropdownSelect
                  classType={`${!isFormEditable ? '-custom-select--readonly' : ''} custom-select user-info${!isFormEditable ? '-edit' : ''}__select ${isLocationDropdownOpen ? 'is-open' : ''}`}
                  label={'Локация'}
                  selectedValue={`ст. м. ${selectedLocation ? capitalizeFirstLetter(selectedLocation) : ''}`}
                  onValueChange={handleLocationChange}
                  object={Object.values(Location)}
                  onToggleDropdown={handleToggleLocationDropdown}
                />
                <DropdownSelect
                  classType={`${!isFormEditable ? '-custom-select--readonly' : ''} custom-select user-info${!isFormEditable ? '-edit' : ''}__select ${isGenderDropdownOpen ? 'is-open' : ''}`}
                  label={'Пол'}
                  selectedValue={selectedGender ? capitalizeFirstLetter(selectedGender) : ''}
                  onValueChange={handleSexChange}
                  object={Object.values(Gender)}
                  onToggleDropdown={handleToggleGenderDropdown}
                />
                <DropdownSelect
                  classType={`${!isFormEditable ? '-custom-select--readonly' : ''} custom-select user-info${!isFormEditable ? '-edit' : ''}__select ${isLevelDropdownOpen ? 'is-open' : ''}`}
                  label={'Уровень'}
                  selectedValue={selectedLevel ? capitalizeFirstLetter(selectedLevel) : ''}
                  onValueChange={handleLevelChange}
                  object={Object.values(TrainingLevel)}
                  onToggleDropdown={handleToggleLevelDropdown}
                />
              </form>
            </section>
            <div className="inner-page__content">{contentComponent}</div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default UserProfileScreen;
