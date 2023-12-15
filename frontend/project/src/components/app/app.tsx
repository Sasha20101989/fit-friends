import { Routes, Route } from 'react-router-dom';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import ParentScreen from '../../pages/parent-screen/parent-screen';
import { AppRoute } from '../../const';
import LoginScreen from '../../pages/login-screen/login-screen';
import RegisterScreen from '../../pages/register-screen/register-screen';
import QuestionnaireUserScreen from '../../pages/questionnaire-user-screen/questionnaire-user-screen';
import QuestionnaireTrainerScreen from '../../pages/questionnaire-trainer-screen/questionnaire-trainer-screen';
import { useAppSelector } from '../../hooks/index';
import { getAuthorizationStatus, getRegisterStatus } from '../../store/user-process/user-process.selectors';
import MainScreen from '../../pages/main-screen/main-screen';
import { getCurrentRole, getCurrentUserId } from '../../store/main-process/main-process.selectors';
import UserProfileScreen from '../../pages/user-profile-screen/user-profile-screen';
import CreateTrainingScreen from '../../pages/create-training-screen/create-training-screen';
import TrainerTrainingsScreen from '../../pages/trainer-trainings-screen/trainer-trainings-screen';
import OrderScreen from '../../pages/order-screen/order-screen';
import TrainerFriendsScreen from '../../pages/trainer-friends-screen/trainer-friends-screen';
import UserFriendsScreen from '../../pages/user-friends-screen/user-friends-screen';
import PurchasesScreen from '../../pages/purchases-screen/purchases-screen';
import UsersCatalogScreen from '../../pages/users-catalog-screen/users-catalog-screen';
import UserCardScreen from '../../pages/user-card-screen/user-card-screen';
import TrainingsCatalogScreen from '../../pages/trainings-catalog-screen/trainings-catalog-screen';
import React from 'react';
import PrivateRegisterRoute from '../private-register-route/private-register-route';
import PrivateTrainerRegisterRoute from '../private-register-route/private-register-route';
import PrivateTrainerRoute from '../private-trainer-route/private-trainer-route';
import PrivateUserRoute from '../private-user-route/private-user-route';
import TrainingCardScreen from '../../pages/training-card-screen/training-card-screen';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const registerStatus = useAppSelector(getRegisterStatus);
  const currentRole = useAppSelector(getCurrentRole);
  const currentUserId = useAppSelector(getCurrentUserId);

  const UserProfileScreenMemoized = React.memo(UserProfileScreen);
  const TrainerFriendsScreenMemoized = React.memo(TrainerFriendsScreen);
  const UserFriendsScreenMemoized = React.memo(UserFriendsScreen);
  const OrderScreenMemoized = React.memo(OrderScreen);
  const TrainerTrainingsScreenMemoized = React.memo(TrainerTrainingsScreen);
  const CreateTrainingScreenMemoized = React.memo(CreateTrainingScreen);
  const TrainingCardScreenMemoized = React.memo(TrainingCardScreen);

  return (
    <Routes>
      <Route
        path={AppRoute.Login}
        element={
          <LoginScreen/>
        }
      />
      <Route
        path={AppRoute.Main}
        element={
          <PrivateUserRoute authorizationStatus={authorizationStatus} registerStatus={registerStatus} currentRole={currentRole} userId={currentUserId}>
            <MainScreen/>
          </PrivateUserRoute>
        }
      />
      <Route
        path={`${AppRoute.TrainerRoom}/:id`}
        element={
          <PrivateTrainerRoute authorizationStatus={authorizationStatus} registerStatus={registerStatus} currentRole={currentRole}>
            <UserProfileScreenMemoized/>
          </PrivateTrainerRoute>
        }
      />
      <Route
        path={`${AppRoute.UserRoom}/:id`}
        element={
          <PrivateUserRoute authorizationStatus={authorizationStatus} registerStatus={registerStatus} currentRole={currentRole} userId={currentUserId}>
            <UserProfileScreenMemoized/>
          </PrivateUserRoute>
        }
      />
      <Route
        path={AppRoute.CreateTraining}
        element={
          <PrivateTrainerRoute authorizationStatus={authorizationStatus} registerStatus={registerStatus} currentRole={currentRole}>
            <CreateTrainingScreenMemoized/>
          </PrivateTrainerRoute>
        }
      />
      <Route
        path={`${AppRoute.Trainers}/:id${AppRoute.Trainings}`}
        element={
          <PrivateTrainerRoute authorizationStatus={authorizationStatus} registerStatus={registerStatus} currentRole={currentRole}>
            <TrainerTrainingsScreenMemoized/>
          </PrivateTrainerRoute>
        }
      />
      <Route
        path={`${AppRoute.Trainings}/:trainingId`}
        element={
          <TrainingCardScreenMemoized/>
        }
      />
      <Route
        path={`${AppRoute.Orders}/:id`}
        element={
          <PrivateTrainerRoute authorizationStatus={authorizationStatus} registerStatus={registerStatus} currentRole={currentRole}>
            <OrderScreenMemoized/>
          </PrivateTrainerRoute>
        }
      />
      <Route
        path={`${AppRoute.TrainerFriends}/:id`}
        element={
          <PrivateTrainerRoute authorizationStatus={authorizationStatus} registerStatus={registerStatus} currentRole={currentRole}>
            <TrainerFriendsScreenMemoized/>
          </PrivateTrainerRoute>
        }
      />
      <Route
        path={`${AppRoute.UserFriends}/:id`}
        element={
          // <PrivateRoute authorizationStatus={authorizationStatus} registerStatus={registerStatus} role={role}>
          <UserFriendsScreenMemoized/>
          // </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.UserPurchases}
        element={
          // <PrivateRoute authorizationStatus={authorizationStatus} registerStatus={registerStatus} role={role}>
          <PurchasesScreen/>
          // </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.UsersCatalog}
        element={
          // <PrivateRoute authorizationStatus={authorizationStatus} registerStatus={registerStatus} role={role}>
          <UsersCatalogScreen/>
          // </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.TrainingsCatalog}
        element={
          // <PrivateRoute authorizationStatus={authorizationStatus} registerStatus={registerStatus} role={role}>
          <TrainingsCatalogScreen/>
          // </PrivateRoute>
        }
      />
      <Route
        path={`${AppRoute.Users}/:id`}
        element={
          // <PrivateRoute authorizationStatus={authorizationStatus} registerStatus={registerStatus} role={role}>
          <UserCardScreen/>
          // </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.MainRegister}
        element={<ParentScreen/>}
      />
      <Route
        path={AppRoute.ParentRegister}
        element={<RegisterScreen/>}
      />
      <Route
        path={AppRoute.RegisterUser}
        element={
          <PrivateRegisterRoute authorizationStatus={authorizationStatus} registerStatus={registerStatus} currentRole={currentRole}>
            <QuestionnaireUserScreen/>
          </PrivateRegisterRoute>
        }
      />
      <Route
        path={AppRoute.RegisterTrainer}
        element={
          <PrivateTrainerRegisterRoute authorizationStatus={authorizationStatus} registerStatus={registerStatus} currentRole={currentRole}>
            <QuestionnaireTrainerScreen/>
          </PrivateTrainerRegisterRoute>
        }
      />
      <Route
        path={'*'}
        element={<NotFoundScreen/>}
      />
    </Routes>
  );
}

export default App;
