import { ChangeEvent, FormEvent, MouseEvent, useRef, useState } from 'react';
import { RegisterUserTransferData } from '../../types/register-transfer-data';
import { MAX_SPECIALIZATIONS_COUNT } from '../../const';

import { useAppDispatch, useAppSelector } from '..';
import { editTrainerAction, editUserAction, registerAction } from '../../store/api-actions/auth-api-actions/auth-api-actions';
import { toast } from 'react-toastify';
import { Role } from '../../types/role.enum';
import { Gender } from '../../types/gender.enum';
import { Location } from '../../types/location.enum';
import { TrainingLevel } from '../../types/training-level.enum';
import { WorkoutType } from '../../types/workout-type.enum';
import { WorkoutDuration } from '../../types/workout-duration.enum';
import { getDuration, getFile, getLevel, getSpecializations } from '../../store/main-process/main-process.selectors';
import { addSpecialization, changeDuration, changeFile, changeLevel, removeSpecialization } from '../../store/main-process/main-process.slice';
import UpdateUserDto from '../../dto/update-user.dto';
import UpdateTrainerDto from '../../dto/update-trainer.dto';

function useRegisterForm(){
  const dispatch = useAppDispatch();

  //const isLoggedIn = useIsLoggedIn(AuthorizationStatus.Auth);

  const specializations = useAppSelector(getSpecializations);
  const selectedLevel = useAppSelector(getLevel);
  const selectedDuration = useAppSelector(getDuration);
  const selectedFile = useAppSelector(getFile);

  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const caloriesLoseRef = useRef<HTMLInputElement | null>(null);
  const caloriesWaste = useRef<HTMLInputElement | null>(null);
  const birthdayRef = useRef<HTMLInputElement | null>(null);

  const descriptionCoachRef = useRef<HTMLTextAreaElement | null>(null);

  const [selectedLocation, setLocation] = useState<Location | null>(null);
  const [selectedSex, setGenderType] = useState<Gender | null>(Gender.Other);
  const [selectedRole, setRole] = useState<Role | null>(Role.Trainer);
  const [isAgreementChecked, setIsAgreementChecked] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCoachDescription, setSelectedCoachDescription] = useState<string | null>(null);
  const [isPersonalTrainingSelected, setIsPersonalTrainingSelected] = useState(false);

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
        selectedSex !== null &&
        selectedRole !== null) {

      const formData: RegisterUserTransferData = {
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
        location: selectedLocation,
        gender: selectedSex,
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

    if (descriptionCoachRef.current !== null &&
        specializations.length > 0 &&
        selectedLevel !== null &&
        selectedFile !== '') {

      const userData: UpdateTrainerDto = {
        description: descriptionCoachRef.current.value,
        workoutTypes: specializations,
        trainingLevel: selectedLevel,
        readinessForWorkout: isPersonalTrainingSelected,
        certificate: selectedFile
      };

      onTrainerQuestion(userData);
    }
  };

  const handleLocationChange = (event: MouseEvent<HTMLLIElement>) => {
    const location: Location = event.currentTarget.textContent as Location;
    setLocation(location);
    setIsDropdownOpen(false);
  };

  const handleRoleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const role: Role = event.target.value as Role;
    setRole(role);
  };

  const handleSexChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedGender: Gender = event.target.value as Gender;

    setGenderType(selectedGender);
  };

  const handleAgreementChange = () => {
    setIsAgreementChecked(!isAgreementChecked);
  };

  const handleToggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLevelChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newLevel = event.target.value as TrainingLevel;
    dispatch(changeLevel(newLevel));
  };

  const handleDurationChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newDuration = event.target.value as WorkoutDuration;
    dispatch(changeDuration(newDuration));
  };

  const handleSpecializationChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedType = event.target.value as WorkoutType;

    if (event.target.checked) {
      dispatch(addSpecialization(selectedType));
    } else {
      dispatch(removeSpecialization(selectedType));
    }
  };

  const isDisabled = (type: WorkoutType): boolean => specializations.length >= MAX_SPECIALIZATIONS_COUNT && !specializations.includes(type);

  const handleDescriptionCoachChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSelectedCoachDescription(event.target.value);
  };

  const handleIsPersonalTrainingChange = () => {
    setIsPersonalTrainingSelected(!isPersonalTrainingSelected);
  };

  const handleCertificateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

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
    descriptionCoachRef,
    selectedLocation,
    selectedSex,
    selectedRole,
    isAgreementChecked,
    isDropdownOpen,
    selectedLevel,
    specializations,
    selectedCoachDescription,
    isPersonalTrainingSelected,
    selectedDuration,
    selectedFile,
    isDisabled,
    handleRegister,
    handleLocationChange,
    handleSexChange,
    handleRoleChange,
    handleAgreementChange,
    handleToggleDropdown,
    handleLevelChange,
    handleSpecializationChange,
    handleDescriptionCoachChange,
    handleIsPersonalTrainingChange,
    handleCertificateChange,
    handleUserQuestion,
    handleTrainerQuestion,
    handleDurationChange
  };
}

export default useRegisterForm;
