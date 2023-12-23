import UserAvatar from '../../components/user-avatar/user-avatar';
import UserControls from '../../components/user-controls/user-controls';
import UserAbout from '../../components/user-about/user-about';
import UserStatus from '../../components/user-status/user-status';
import UserSpecializationGroup from '../../components/user-specialization-group/user-specialization-group';
import PersonalAccountCoach from '../../components/personal-account-coach/personal-account-coach';
import UserEditButton from '../../components/user-edit-button/user-edit-button';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { editTrainerAction, editUserAction, fetchCurrentUserAction } from '../../store/api-actions/user-api-actions/user-api-actions';
import PersonalAccountUser from '../../components/personal-account-user/personal-account-user';
import { Role } from '../../types/role.enum';
import Layout from '../../components/layout/layout';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import DropdownSelect from '../../components/dropdown-select/dropdown-select';
import { Location } from '../../types/location.enum';
import { DESCRIPTION_CONSTRAINTS, capitalizeFirstLetter } from '../../const';
import { Gender } from '../../types/gender.enum';
import { TrainingLevel } from '../../types/training-level.enum';
import UpdateTrainerDto from '../../dto/update-trainer.dto';
import { getLoadingStatus } from '../../store/main-data/main-data.selectors';
import Loading from '../../components/loading/loading';
import UpdateUserDto from '../../dto/update-user.dto';
import { getCurrentUser } from '../../store/user-process/user-process.selectors';
import { Trainer } from '../../types/trainer.interface';
import { User } from '../../types/user.interface';
import { changeCurrentUserLevel, setCurrentUserGender, setCurrentUserLocation } from '../../store/user-process/user-process.slice';

function UserProfileScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();

  const isLoading = useAppSelector(getLoadingStatus);

  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isGenderDropdownOpen, setIsGenderDropdownOpen] = useState(false);
  const [isLevelDropdownOpen, setIsLevelDropdownOpen] = useState(false);
  const [isFormEditable, setIsFormEditable] = useState<boolean>(false);
  const [locationError, setLocationError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [levelError, setLevelError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');

  const currentUser = useAppSelector(getCurrentUser);

  const handleToggleFormEditable = (): void => {
    setIsFormEditable(!isFormEditable);
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchCurrentUserAction(id));
    }
  }, [dispatch, id]);

  if (!currentUser || !id) {
    return <NotFoundScreen/>;
  }

  if (isLoading) {
    return <Loading/>;
  }

  const contentComponent = currentUser && currentUser.role === Role.Trainer ? (
    <PersonalAccountCoach userId={id} avatar={currentUser.avatar ?? ''} />
  ) : (
    <PersonalAccountUser />
  );

  const handleLocationChange = (evt: React.MouseEvent<HTMLLIElement>) => {
    const location: Location = evt.currentTarget.textContent as Location;
    dispatch(setCurrentUserLocation(location));
    setLocationError('');
    setIsLocationDropdownOpen(false);
  };

  const handleSexChange = (evt: React.MouseEvent<HTMLLIElement>) => {
    const gender: Gender = evt.currentTarget.textContent as Gender;
    dispatch(setCurrentUserGender(gender));
    setGenderError('');
    setIsGenderDropdownOpen(false);
  };

  const handleLevelChange = (evt: React.MouseEvent<HTMLLIElement>) => {
    const newLevel: TrainingLevel = evt.currentTarget.textContent as TrainingLevel;
    dispatch(changeCurrentUserLevel(newLevel));
    setLevelError('');
    setIsLevelDropdownOpen(false);
  };

  const handleToggleLocationDropdown = () => {
    if(isFormEditable){
      setIsLocationDropdownOpen(!isLocationDropdownOpen);
    }
  };

  const handleToggleGenderDropdown = () => {
    if(isFormEditable){
      setIsGenderDropdownOpen(!isGenderDropdownOpen);
    }
  };

  const handleToggleLevelDropdown = () => {
    if(isFormEditable){
      setIsLevelDropdownOpen(!isLevelDropdownOpen);
    }
  };

  const handleSave = () => {
    if(currentUser.location === null){
      setLocationError('Выберите локацию');
      return;
    }

    if(currentUser.gender === null){
      setGenderError('Выберите пол');
      return;
    }

    if(currentUser.trainingLevel === null){
      setLevelError('Выберите уровень');
      return;
    }

    if (currentUser.description &&
      currentUser.description.length < DESCRIPTION_CONSTRAINTS.MIN_LENGTH ||
      currentUser.description &&
      currentUser.description.length > DESCRIPTION_CONSTRAINTS.MAX_LENGTH
    ){
      setDescriptionError(`Длина описания должна быть от ${DESCRIPTION_CONSTRAINTS.MIN_LENGTH} до ${DESCRIPTION_CONSTRAINTS.MAX_LENGTH} символов`);
      return;
    }

    if(currentUser &&
      currentUser.role === Role.Trainer){
      const trainer = currentUser as Trainer;
      if(trainer.name !== undefined &&
        trainer.name.trim() !== '' &&
        trainer.gender !== null &&
        trainer.location &&
        trainer.trainingLevel &&
        trainer.workoutTypes.length >= 1){
        const trainerData: UpdateTrainerDto = {
          description: trainer.description,
          trainingLevel: trainer.trainingLevel,
          gender: trainer.gender,
          workoutTypes: trainer.workoutTypes,
          personalTraining: trainer.personalTraining,
          name: trainer.name,
          avatar: trainer.avatar,
          location: trainer.location
        };

        dispatch(editTrainerAction(trainerData));
      }
    }else{
      const user = currentUser as User;
      if(user.name !== undefined &&
        user.name.trim() !== '' &&
        user.gender !== null &&
        user.location &&
        user.trainingLevel &&
        user.workoutTypes.length >= 1){
        const userData: UpdateUserDto = {
          description: user.description,
          trainingLevel: user.trainingLevel,
          gender: user.gender,
          workoutTypes: user.workoutTypes,
          readinessForWorkout: user.readinessForWorkout,
          name: user.name,
          avatar: user.avatar,
          location: user.location
        };

        dispatch(editUserAction(userData));
      }
    }
  };

  return (
    <Layout>
      <section className="inner-page">
        <div className="container">
          <div className="inner-page__wrapper">
            <h1 className="visually-hidden">Личный кабинет</h1>
            <section className={`user-info${isFormEditable ? '-edit' : ''}`}>
              <div className={`user-info${isFormEditable ? '-edit' : ''}__header`}>
                <UserAvatar currentUser={currentUser}/>
                {currentUser.role === Role.Trainer && isFormEditable && <UserControls />}
              </div>
              <form className={`user-info${isFormEditable ? '-edit' : ''}__form`} action="#" method="post">
                <UserEditButton isFormEditable={isFormEditable} onToggleFormEditable={handleToggleFormEditable} onSave={handleSave}/>
                <UserAbout isFormEditable={isFormEditable} error={descriptionError} currentUser={currentUser}/>
                <UserStatus isFormEditable={isFormEditable} currentUser={currentUser}/>
                <div className={`user-info${isFormEditable ? '-edit' : ''}__section`}>
                  <UserSpecializationGroup isFormEditable={isFormEditable} currentUser={currentUser} />
                </div>
                <DropdownSelect
                  classType={`${!isFormEditable ? '-custom-select--readonly' : ''} custom-select user-info${isFormEditable ? '-edit' : ''}__select ${isLocationDropdownOpen ? 'is-open' : ''} ${locationError && 'is-invalid'}`}
                  label={'Локация'}
                  selectedValue={`ст. м. ${currentUser.location ? capitalizeFirstLetter(currentUser.location) : ''}`}
                  onValueChange={handleLocationChange}
                  object={Object.values(Location)}
                  onToggleDropdown={handleToggleLocationDropdown}
                  error={locationError}
                />
                <DropdownSelect
                  classType={`${!isFormEditable ? '-custom-select--readonly' : ''} custom-select user-info${isFormEditable ? '-edit' : ''}__select ${isGenderDropdownOpen ? 'is-open' : ''} ${genderError && 'is-invalid'}`}
                  label={'Пол'}
                  selectedValue={currentUser.gender ? capitalizeFirstLetter(currentUser.gender) : ''}
                  onValueChange={handleSexChange}
                  object={Object.values(Gender)}
                  onToggleDropdown={handleToggleGenderDropdown}
                  error={genderError}
                />
                <DropdownSelect
                  classType={`${!isFormEditable ? '-custom-select--readonly' : ''} custom-select user-info${isFormEditable ? '-edit' : ''}__select ${isLevelDropdownOpen ? 'is-open' : ''} ${levelError && 'is-invalid'}`}
                  label={'Уровень'}
                  selectedValue={currentUser.trainingLevel ? capitalizeFirstLetter(currentUser.trainingLevel) : ''}
                  onValueChange={handleLevelChange}
                  object={Object.values(TrainingLevel)}
                  onToggleDropdown={handleToggleLevelDropdown}
                  error={levelError}
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
