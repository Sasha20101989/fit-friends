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
import PrivateRoute from '../private-route/private-route';
import MainScreen from '../../pages/main-screen/main-screen';
import { getRole } from '../../store/main-process/main-process.selectors';
import UserProfileScreen from '../../pages/user-profile-screen/user-profile-screen';
import CreateTrainingScreen from '../../pages/create-training-screen/create-training-screen';
import TrainerTrainingsScreen from '../../pages/trainer-trainings-screen/trainer-trainings-screen';
import OrderScreen from '../../pages/order-screen/order-screen';
import TrainerFriendsScreen from '../../pages/trainer-friends-screen/trainer-friends-screen';
import Layout from '../layout/layout';
import UserFriendsScreen from '../../pages/user-friends-screen/user-friends-screen';
import PurchasesScreen from '../../pages/purchases-screen/purchases-screen';
import UsersCatalogScreen from '../../pages/users-catalog-screen/users-catalog-screen';
import UserCardScreen from '../../pages/user-card-screen/user-card-screen';
import TrainingsCatalogScreen from '../../pages/trainings-catalog-screen/trainings-catalog-screen';
import React from 'react';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const registerStatus = useAppSelector(getRegisterStatus);
  const role = useAppSelector(getRole);

  const UserProfileScreenMemoized = React.memo(UserProfileScreen);
  const TrainerFriendsScreenMemoized = React.memo(TrainerFriendsScreen);
  const UserFriendsScreenMemoized = React.memo(UserFriendsScreen);
  const OrderScreenMemoized = React.memo(OrderScreen);
  const TrainerTrainingsScreenMemoized = React.memo(TrainerTrainingsScreen);
  const CreateTrainingScreenMemoized = React.memo(CreateTrainingScreen);

  return (
    <Routes>
      <Route
        path={AppRoute.Main}
        element={
          <PrivateRoute authorizationStatus={authorizationStatus} registerStatus={registerStatus} role={role}>
            <Layout>
              <MainScreen/>
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.TrainerRoom}
        element={
          <PrivateRoute authorizationStatus={authorizationStatus} registerStatus={registerStatus} role={role}>
            <Layout>
              <UserProfileScreenMemoized/>
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.UserRoom}
        element={
          <PrivateRoute authorizationStatus={authorizationStatus} registerStatus={registerStatus} role={role}>
            <Layout>
              <UserProfileScreenMemoized/>
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.CreateTraining}
        element={
          <PrivateRoute authorizationStatus={authorizationStatus} registerStatus={registerStatus} role={role}>
            <Layout>
              <CreateTrainingScreenMemoized/>
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path={`${AppRoute.Trainings}/:id`}
        element={
          // <PrivateRoute authorizationStatus={authorizationStatus} registerStatus={registerStatus} role={role}>
          <Layout>
            <TrainerTrainingsScreenMemoized/>
          </Layout>
          // </PrivateRoute>
        }
      />
      <Route
        path={`${AppRoute.Orders}/:id`}
        element={
          <PrivateRoute authorizationStatus={authorizationStatus} registerStatus={registerStatus} role={role}>
            <Layout>
              <OrderScreenMemoized/>
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path={`${AppRoute.Trainer}/:id${AppRoute.Friends}`}
        element={
          <PrivateRoute authorizationStatus={authorizationStatus} registerStatus={registerStatus} role={role}>
            <Layout>
              <TrainerFriendsScreenMemoized/>
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.UserFriends}
        element={
          // <PrivateRoute authorizationStatus={authorizationStatus} registerStatus={registerStatus} role={role}>
          <Layout>
            <UserFriendsScreenMemoized/>
          </Layout>
          // </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.UserPurchases}
        element={
          // <PrivateRoute authorizationStatus={authorizationStatus} registerStatus={registerStatus} role={role}>
          <Layout>
            <PurchasesScreen/>
          </Layout>
          // </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.UsersCatalog}
        element={
          // <PrivateRoute authorizationStatus={authorizationStatus} registerStatus={registerStatus} role={role}>
          <Layout>
            <UsersCatalogScreen/>
          </Layout>
          // </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.TrainingsCatalog}
        element={
          // <PrivateRoute authorizationStatus={authorizationStatus} registerStatus={registerStatus} role={role}>
          <Layout>
            <TrainingsCatalogScreen/>
          </Layout>
          // </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.UserCard}
        element={
          // <PrivateRoute authorizationStatus={authorizationStatus} registerStatus={registerStatus} role={role}>
          <Layout>
            <UserCardScreen/>
          </Layout>
          // </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.MainRegister}
        element={
          <Layout includeHeader={false}>
            <ParentScreen/>
          </Layout>
        }
      />
      <Route
        path={AppRoute.ParentRegister}
        element={
          <Layout includeHeader={false}>
            <RegisterScreen/>
          </Layout>
        }
      />
      <Route
        path={AppRoute.Login}
        element={
          <Layout includeHeader={false}>
            <LoginScreen/>
          </Layout>
        }
      />
      <Route
        path={AppRoute.RegisterUser}
        element={
          <PrivateRoute authorizationStatus={authorizationStatus} registerStatus={registerStatus} role={role}>
            <Layout includeHeader={false}>
              <QuestionnaireUserScreen/>
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.RegisterTrainer}
        element={
          <PrivateRoute authorizationStatus={authorizationStatus} registerStatus={registerStatus} role={role}>
            <Layout includeHeader={false}>
              <QuestionnaireTrainerScreen/>
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path={'*'}
        element={
          <Layout includeHeader={false}>
            <NotFoundScreen/>
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
