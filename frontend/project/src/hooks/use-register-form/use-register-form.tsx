import { ChangeEvent, FormEvent, MouseEvent, useRef, useState } from 'react';
import { RegisterUserTransferData } from '../../types/register-transfer-data';
import { MAX_SPECIALIZATIONS_COUNT } from '../../const';

import { useAppDispatch, useAppSelector } from '..';
import { registerAction } from '../../store/api-actions/auth-api-actions/auth-api-actions';
import { toast } from 'react-toastify';
import { Role } from '../../types/role.enum';
import { Gender } from '../../types/gender.enum';
import { Location } from '../../types/location.enum';
import { TrainingLevel } from '../../types/training-level.enum';
import { WorkoutType } from '../../types/workout-type.enum';
import { WorkoutDuration } from '../../types/workout-duration.enum';
import { getDuration, getFile, getGender, getLevel, getLocation, getReadiessToWorkout, getSpecializations } from '../../store/main-process/main-process.selectors';
import { addSpecialization, changeDuration, changeFile, changeLevel, changeReadiessToWorkout, removeSpecialization, setGender, setLocation } from '../../store/main-process/main-process.slice';
import UpdateUserDto from '../../dto/update-user.dto';
import UpdateTrainerDto from '../../dto/update-trainer.dto';
import { editTrainerAction, editUserAction } from '../../store/api-actions/user-api-actions/user-api-actions';

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

  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const caloriesLoseRef = useRef<HTMLInputElement | null>(null);
  const caloriesWaste = useRef<HTMLInputElement | null>(null);
  const birthdayRef = useRef<HTMLInputElement | null>(null);

  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

  const [selectedRole, setRole] = useState<Role | null>(Role.Trainer);
  const [isAgreementChecked, setIsAgreementChecked] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedDescription, setSelectedCoachDescription] = useState<string | null>(null);

  // const handleRole = (roleData: Role) => {
  //   const handlers: Record<Role, () => void> = {
  //     [Role.Trainer]: () => navigate(AppRoute.RegisterTrainer),
  //     [Role.User]: () => navigate(AppRoute.RegisterUser),
  //   };

  //   const errorHandler = () => {
  //     toast.error('Некорректная роль пользователя');
  //   };

  //   (handlers[roleData] || errorHandler)();
  // };

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

    if(!isAgreementChecked){
      toast.error('Подтвердите согласие с политикой конфиденциальности');
      return;
    }

    if (nameRef.current !== null &&
        passwordRef.current !== null &&
        emailRef.current !== null &&
        birthdayRef.current !== null &&
        selectedLocation !== null &&
        selectedGender !== null &&
        selectedRole !== null) {

      const formData: RegisterUserTransferData = {
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
        location: selectedLocation,
        gender: selectedGender,
        role: selectedRole,
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

    if (descriptionRef.current !== null &&
        specializations.length > 0 &&
        selectedLevel !== null &&
        selectedFile !== '') {

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
    dispatch(setLocation(location));
    setIsDropdownOpen(false);
  };

  const handleRoleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const role: Role = evt.target.value as Role;
    setRole(role);
  };

  const handleSexChange = (event: ChangeEvent<HTMLInputElement>) => {
    const gender: Gender = event.target.value as Gender;
    dispatch(setGender(gender));
  };

  const handleAgreementChange = () => {
    setIsAgreementChecked(!isAgreementChecked);
  };

  const handleToggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLevelChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const newLevel = evt.target.value as TrainingLevel;
    dispatch(changeLevel(newLevel));
  };

  const handleDurationChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const newDuration = evt.target.value as WorkoutDuration;
    dispatch(changeDuration(newDuration));
  };

  const handleSpecializationChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const selectedType = evt.target.value as WorkoutType;

    if (evt.target.checked) {
      dispatch(addSpecialization(selectedType));
    } else {
      dispatch(removeSpecialization(selectedType));
    }
  };

  const isDisabled = (type: WorkoutType): boolean => specializations.length >= MAX_SPECIALIZATIONS_COUNT && !specializations.includes(type);

  const handleDescriptionChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSelectedCoachDescription(evt.target.value);
  };

  const handleReadinessForWorkoutChange = () => {
    dispatch(changeReadiessToWorkout(!readinessToWorkout));
  };

  const handleCertificateChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const file = evt.target.files?.[0];

    const isJpegOrPngOrPdf = file?.type === 'image/jpeg' || file?.type === 'image/png' || file?.type === 'application/pdf';

    if (isJpegOrPngOrPdf) {
      const fileName = file.name;
      //const fileUrl = URL.createObjectURL(file);
      dispatch(changeFile(fileName));
    } else {
      toast.warn('Выбранный файл должен быть формата JPEG (jpg) или PNG (png) или PDF (pdf).', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
    }
  };

  return {
    nameRef,
    emailRef,
    passwordRef,
    birthdayRef,
    caloriesLoseRef,
    caloriesWaste,
    descriptionRef,
    selectedLocation,
    selectedRole,
    isAgreementChecked,
    isDropdownOpen,
    selectedLevel,
    specializations,
    selectedDescription,
    readinessToWorkout,
    selectedDuration,
    selectedFile,
    selectedGender,
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
