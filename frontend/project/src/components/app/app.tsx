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
import TrainerRoomScreen from '../../pages/trainer-room-screen/trainer-room-screen';
import CreateTrainingScreen from '../../pages/create-training-screen/create-training-screen';
import TrainerTrainingsScreen from '../../pages/trainer-trainings-screen/trainer-trainings-screen';
import OrderScreen from '../../pages/order-screen/order-screen';
import TrainerFriendsScreen from '../../pages/trainer-friends-screen/trainer-friends-screen';
import Layout from '../layout/layout';
import UserRoomScreen from '../../pages/user-room-screen/user-room-screen';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const registerStatus = useAppSelector(getRegisterStatus);
  const role = useAppSelector(getRole);

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
          // <PrivateRoute authorizationStatus={authorizationStatus} registerStatus={registerStatus} role={role}>
          <Layout>
            <TrainerRoomScreen/>
          </Layout>
          // </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.UserRoom}
        element={
          // <PrivateRoute authorizationStatus={authorizationStatus} registerStatus={registerStatus} role={role}>
          <Layout>
            <UserRoomScreen/>
          </Layout>
          // </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.CreateTraining}
        element={
          // <PrivateRoute authorizationStatus={authorizationStatus} registerStatus={registerStatus} role={role}>
          <Layout>
            <CreateTrainingScreen/>
          </Layout>
          // </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.TrainerTrainings}
        element={
          // <PrivateRoute authorizationStatus={authorizationStatus} registerStatus={registerStatus} role={role}>
          <Layout>
            <TrainerTrainingsScreen/>
          </Layout>
          // </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.TrainerOrders}
        element={
          // <PrivateRoute authorizationStatus={authorizationStatus} registerStatus={registerStatus} role={role}>
          <Layout>
            <OrderScreen/>
          </Layout>
          // </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.TrainerFriends}
        element={
          // <PrivateRoute authorizationStatus={authorizationStatus} registerStatus={registerStatus} role={role}>
          <Layout>
            <TrainerFriendsScreen/>
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
