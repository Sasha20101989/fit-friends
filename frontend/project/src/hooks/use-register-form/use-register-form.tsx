import { ChangeEvent, FormEvent, MouseEvent, useRef, useState } from 'react';
import { RegisterUserTransferData } from '../../types/register-transfer-data';
import { DESCRIPTION_CONSTRAINTS, MAX_SPECIALIZATIONS_COUNT } from '../../const';

import { useAppDispatch, useAppSelector } from '..';
import { registerAction } from '../../store/api-actions/auth-api-actions/auth-api-actions';
import { Role } from '../../types/role.enum';
import { Gender } from '../../types/gender.enum';
import { Location } from '../../types/location.enum';
import { TrainingLevel } from '../../types/training-level.enum';
import { WorkoutType } from '../../types/workout-type.enum';
import { WorkoutDuration } from '../../types/workout-duration.enum';
import { getDescription, getDuration, getFile, getGender, getLevel, getLocation, getReadiessToWorkout, getCurrentRole, getSpecializations } from '../../store/main-process/main-process.selectors';
import { addSpecialization, changeDuration, changeFile, changeLevel, changeReadiessToWorkout, removeSpecialization, setDescription, setGender, setLocation, setRole } from '../../store/main-process/main-process.slice';
import UpdateUserDto from '../../dto/update-user.dto';
import UpdateTrainerDto from '../../dto/update-trainer.dto';
import { editTrainerAction, editUserAction } from '../../store/api-actions/user-api-actions/user-api-actions';
import { getSubmittingStatus } from '../../store/user-process/user-process.selectors';

function useRegisterForm(){
  const dispatch = useAppDispatch();

  //const isLoggedIn = useIsLoggedIn(AuthorizationStatus.Auth);

  const specializations = useAppSelector(getSpecializations);
  const selectedLevel = useAppSelector(getLevel);
  const selectedDuration = useAppSelector(getDuration);
  const selectedFile = useAppSelector(getFile);
  const selectedLocation = useAppSelector(getLocation);
  const selectedGender = useAppSelector(getGender);
  const readinessToWorkout = useAppSelector(getReadiessToWorkout);
  const currentRole = useAppSelector(getCurrentRole);
  const selectedDescription = useAppSelector(getDescription);
  const isSubmitting = useAppSelector(getSubmittingStatus);

  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const caloriesLoseRef = useRef<HTMLInputElement | null>(null);
  const caloriesWaste = useRef<HTMLInputElement | null>(null);
  const birthdayRef = useRef<HTMLInputElement | null>(null);
  const [locationError, setLocationError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [durationError, setDurationError] = useState('');
  const [levelError, setLevelError] = useState('');
  const [roleError, setRoleError] = useState('');
  const [agreementError, setAgreementError] = useState('');
  const [certificateError, setCertificateError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [specializationsError, setSpecializationsError] = useState('');

  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

  const [isAgreementChecked, setIsAgreementChecked] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const onSubmit = (registerData: RegisterUserTransferData) => {
    dispatch(registerAction(registerData));
  };

  const onUserQuestion = (userData: UpdateUserDto) => {
    dispatch(editUserAction(userData));
  };

  const onTrainerQuestion = (userData: UpdateTrainerDto) => {
    dispatch(editTrainerAction(userData));
  };

  const handleRegister = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if(selectedLocation === null){
      setLocationError('Выберите локацию');
      return;
    }

    if(selectedGender === null){
      setGenderError('Выберите пол');
      return;
    }

    if(currentRole === Role.Unknown){
      setRoleError('Выберите роль');
      return;
    }

    if(!isAgreementChecked){
      setAgreementError('Подтвердите согласие с политикой конфиденциальности');
      return;
    }

    if(nameRef.current !== null &&
        passwordRef.current !== null &&
        emailRef.current !== null &&
        birthdayRef.current !== null
    ){

      const formData: RegisterUserTransferData = {
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
        location: selectedLocation,
        gender: selectedGender,
        role: currentRole,
      };

      if (birthdayRef.current !== null) {
        formData.birthDate = birthdayRef.current.value;
      }

      onSubmit(formData);
    }
  };

  const handleUserQuestion = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (caloriesLoseRef.current !== null &&
        caloriesWaste.current !== null &&
        specializations.length > 0 &&
        selectedLevel !== null &&
        selectedDuration !== null) {

      const userData: UpdateUserDto = {
        caloriesToBurn: parseInt(caloriesLoseRef.current.value, 10),
        caloriesToSpend: parseInt(caloriesWaste.current.value, 10),
        workoutTypes: specializations,
        trainingLevel: selectedLevel,
        workoutDuration: selectedDuration
      };

      onUserQuestion(userData);
    }
  };

  const handleTrainerQuestion = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if(specializations.length === 0){
      setSpecializationsError('Выберите хотябы один вид тренировки');
      return;
    }

    if(selectedFile === ''){
      setCertificateError('Выберите файл в предложенном формате');
      return;
    }

    if (descriptionRef.current !== null &&
        descriptionRef.current.value.length < DESCRIPTION_CONSTRAINTS.MIN_LENGTH ||
        descriptionRef.current !== null &&
        descriptionRef.current.value.length > DESCRIPTION_CONSTRAINTS.MAX_LENGTH
    ){
      setDescriptionError(`Длина описания должна быть от ${DESCRIPTION_CONSTRAINTS.MIN_LENGTH} до ${DESCRIPTION_CONSTRAINTS.MAX_LENGTH} символов`);
      return;
    }

    if (descriptionRef.current !== null &&
        selectedLevel !== null &&
        selectedFile !== ''
    ){
      const userData: UpdateTrainerDto = {
        description: descriptionRef.current.value,
        workoutTypes: specializations,
        trainingLevel: selectedLevel,
        personalTraining: readinessToWorkout,
        certificate: selectedFile
      };

      onTrainerQuestion(userData);
    }
  };

  const handleLocationChange = (evt: MouseEvent<HTMLLIElement>) => {
    const location: Location = evt.currentTarget.textContent as Location;
    setLocationError('');
    dispatch(setLocation(location));
    setIsDropdownOpen(false);
  };

  const handleRoleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const role: Role = evt.target.value as Role;
    setRoleError('');
    dispatch(setRole(role));
  };

  const handleSexChange = (evt: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLLIElement>) => {
    const gender = 'value' in evt.target ?
      (evt.target as HTMLInputElement).value as Gender :
        (evt.target as HTMLLIElement).dataset.value as Gender;
    setGenderError('');
    dispatch(setGender(gender));
  };

  const handleAgreementChange = () => {
    setAgreementError('');
    setIsAgreementChecked(!isAgreementChecked);
  };

  const handleToggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLevelChange = (evt: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLLIElement>) => {
    const newLevel = 'value' in evt.target ?
      (evt.target as HTMLInputElement).value as TrainingLevel :
        (evt.target as HTMLLIElement).dataset.value as TrainingLevel;
    setLevelError('');
    dispatch(changeLevel(newLevel));
  };

  const handleDurationChange = (evt: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLLIElement>) => {
    const newDuration = 'value' in evt.target ?
    (evt.target as HTMLInputElement).value as WorkoutDuration :
      (evt.target as HTMLLIElement).dataset.value as WorkoutDuration;
    setDurationError('');
    dispatch(changeDuration(newDuration));
  };

  const handleSpecializationChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const selectedType = evt.target.value as WorkoutType;
    setSpecializationsError('');

    if (evt.target.checked) {
      dispatch(addSpecialization(selectedType));
    } else {
      dispatch(removeSpecialization(selectedType));
    }
  };

  const isDisabled = (type: WorkoutType): boolean => specializations.length >= MAX_SPECIALIZATIONS_COUNT && !specializations.includes(type);

  const handleDescriptionChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const descriptionValue = evt.target.value;
    dispatch(setDescription(descriptionValue));
    setDescriptionError('');
  };

  const handleReadinessForWorkoutChange = () => {
    dispatch(changeReadiessToWorkout(!readinessToWorkout));
  };

  const handleCertificateChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const file = evt.target.files?.[0];

    const isJpegOrPngOrPdf = file?.type === 'image/jpeg' || file?.type === 'image/png' || file?.type === 'application/pdf';

    if (isJpegOrPngOrPdf) {
      const fileName = file.name;
      setCertificateError('');
      dispatch(changeFile(fileName));
    } else {
      setCertificateError('Выбранный файл должен быть формата JPEG (jpg) или PNG (png) или PDF (pdf).');
    }
  };

  return {
    specializationsError,
    descriptionError,
    certificateError,
    agreementError,
    roleError,
    levelError,
    durationError,
    genderError,
    locationError,
    nameRef,
    emailRef,
    passwordRef,
    birthdayRef,
    caloriesLoseRef,
    caloriesWaste,
    descriptionRef,
    selectedLocation,
    currentRole,
    isAgreementChecked,
    isDropdownOpen,
    selectedLevel,
    specializations,
    selectedDescription,
    readinessToWorkout,
    selectedDuration,
    selectedFile,
    selectedGender,
    isSubmitting,
    isDisabled,
    handleRegister,
    handleLocationChange,
    handleSexChange,
    handleRoleChange,
    handleAgreementChange,
    handleToggleDropdown,
    handleLevelChange,
    handleSpecializationChange,
    handleDescriptionChange,
    handleReadinessForWorkoutChange,
    handleCertificateChange,
    handleUserQuestion,
    handleTrainerQuestion,
    handleDurationChange
  };
}

export default useRegisterForm;
