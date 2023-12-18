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
import { editTrainerAction, editUserAction, fetchUserAction } from '../../store/api-actions/user-api-actions/user-api-actions';
import PersonalAccountUser from '../../components/personal-account-user/personal-account-user';
import { Role } from '../../types/role.enum';
import Layout from '../../components/layout/layout';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import DropdownSelect from '../../components/dropdown-select/dropdown-select';
import { Location } from '../../types/location.enum';
import { getAvatar, getDescription, getGender, getLevel, getLocation, getName, getReadiessToWorkout, getCurrentRole, getSpecializations } from '../../store/main-process/main-process.selectors';
import { changeLevel, setGender, setLocation } from '../../store/main-process/main-process.slice';
import { DESCRIPTION_CONSTRAINTS, capitalizeFirstLetter } from '../../const';
import { Gender } from '../../types/gender.enum';
import { TrainingLevel } from '../../types/training-level.enum';
import UpdateTrainerDto from '../../dto/update-trainer.dto';
import { getLoadingStatus } from '../../store/main-data/main-data.selectors';
import Loading from '../../components/loading/loading';
import UpdateUserDto from '../../dto/update-user.dto';

function UserProfileScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const user = useAppSelector(getUser);
  const currentRole = useAppSelector(getCurrentRole);
  const selectedGender = useAppSelector(getGender);
  const selectedLocation = useAppSelector(getLocation);
  const selectedLevel = useAppSelector(getLevel);
  const selectedDescription = useAppSelector(getDescription);
  const selectedName = useAppSelector(getName);
  const selectedAvatar = useAppSelector(getAvatar);
  const readinessToWorkout = useAppSelector(getReadiessToWorkout);
  const specializations = useAppSelector(getSpecializations);
  const isLoading = useAppSelector(getLoadingStatus);

  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isGenderDropdownOpen, setIsGenderDropdownOpen] = useState(false);
  const [isLevelDropdownOpen, setIsLevelDropdownOpen] = useState(false);
  const [isFormEditable, setIsFormEditable] = useState<boolean>(false);
  const [locationError, setLocationError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [levelError, setLevelError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');

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

  if (isLoading) {
    return <Loading/>;
  }

  const contentComponent = currentRole === Role.Trainer ? (
    <PersonalAccountCoach userId={id} avatar={user.avatar ?? ''} />
  ) : (
    <PersonalAccountUser />
  );

  const handleLocationChange = (evt: React.MouseEvent<HTMLLIElement>) => {
    const location: Location = evt.currentTarget.textContent as Location;
    dispatch(setLocation(location));
    setLocationError('');
    setIsLocationDropdownOpen(false);
  };

  const handleSexChange = (evt: React.MouseEvent<HTMLLIElement>) => {
    const gender: Gender = evt.currentTarget.textContent as Gender;
    dispatch(setGender(gender));
    setGenderError('');
    setIsGenderDropdownOpen(false);
  };

  const handleLevelChange = (evt: React.MouseEvent<HTMLLIElement>) => {
    const newLevel: TrainingLevel = evt.currentTarget.textContent as TrainingLevel;
    dispatch(changeLevel(newLevel));
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
    if(selectedLocation === null){
      setLocationError('Выберите локацию');
      return;
    }

    if(selectedGender === null){
      setGenderError('Выберите пол');
      return;
    }

    if(selectedLevel === null){
      setLevelError('Выберите уровень');
      return;
    }

    if (selectedDescription &&
      selectedDescription.length < DESCRIPTION_CONSTRAINTS.MIN_LENGTH ||
      selectedDescription &&
      selectedDescription.length > DESCRIPTION_CONSTRAINTS.MAX_LENGTH
    ){
      setDescriptionError(`Длина описания должна быть от ${DESCRIPTION_CONSTRAINTS.MIN_LENGTH} до ${DESCRIPTION_CONSTRAINTS.MAX_LENGTH} символов`);
      return;
    }

    if(currentRole === Role.Trainer){
      if(selectedName !== undefined &&
        selectedName.trim() !== '' &&
        selectedGender !== null &&
        specializations.length >= 1){
        const trainerData: UpdateTrainerDto = {
          description: selectedDescription,
          trainingLevel: selectedLevel,
          gender: selectedGender,
          workoutTypes: specializations,
          personalTraining: readinessToWorkout,
          name: selectedName,
          avatar: selectedAvatar,
          location: selectedLocation
        };

        dispatch(editTrainerAction(trainerData));
      }
    }else{
      if(selectedName !== undefined &&
        selectedName.trim() !== '' &&
        selectedGender !== null &&
        specializations.length >= 1){
        const userData: UpdateUserDto = {
          description: selectedDescription,
          trainingLevel: selectedLevel,
          gender: selectedGender,
          workoutTypes: specializations,
          readinessForWorkout: readinessToWorkout,
          name: selectedName,
          avatar: selectedAvatar,
          location: selectedLocation
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
                <UserAvatar/>
                {currentRole === Role.Trainer && isFormEditable && <UserControls />}
              </div>
              <form className={`user-info${isFormEditable ? '-edit' : ''}__form`} action="#" method="post">
                <UserEditButton isFormEditable={isFormEditable} onToggleFormEditable={handleToggleFormEditable} onSave={handleSave}/>
                <UserAbout isFormEditable={isFormEditable} error={descriptionError}/>
                <UserStatus isFormEditable={isFormEditable} />
                <div className={`user-info${isFormEditable ? '-edit' : ''}__section`}>
                  <UserSpecializationGroup isFormEditable={isFormEditable} />
                </div>
                <DropdownSelect
                  classType={`${!isFormEditable ? '-custom-select--readonly' : ''} custom-select user-info${isFormEditable ? '-edit' : ''}__select ${isLocationDropdownOpen ? 'is-open' : ''} ${locationError && 'is-invalid'}`}
                  label={'Локация'}
                  selectedValue={`ст. м. ${selectedLocation ? capitalizeFirstLetter(selectedLocation) : ''}`}
                  onValueChange={handleLocationChange}
                  object={Object.values(Location)}
                  onToggleDropdown={handleToggleLocationDropdown}
                  error={locationError}
                />
                <DropdownSelect
                  classType={`${!isFormEditable ? '-custom-select--readonly' : ''} custom-select user-info${isFormEditable ? '-edit' : ''}__select ${isGenderDropdownOpen ? 'is-open' : ''} ${genderError && 'is-invalid'}`}
                  label={'Пол'}
                  selectedValue={selectedGender ? capitalizeFirstLetter(selectedGender) : ''}
                  onValueChange={handleSexChange}
                  object={Object.values(Gender)}
                  onToggleDropdown={handleToggleGenderDropdown}
                  error={genderError}
                />
                <DropdownSelect
                  classType={`${!isFormEditable ? '-custom-select--readonly' : ''} custom-select user-info${isFormEditable ? '-edit' : ''}__select ${isLevelDropdownOpen ? 'is-open' : ''} ${levelError && 'is-invalid'}`}
                  label={'Уровень'}
                  selectedValue={selectedLevel ? capitalizeFirstLetter(selectedLevel) : ''}
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
