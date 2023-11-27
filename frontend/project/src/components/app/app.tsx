import { Routes, Route } from 'react-router-dom';
import { AuthorizationStatus, RegisterStatus } from '../../const';
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

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus) as AuthorizationStatus;
  const registerStatus = useAppSelector(getRegisterStatus) as RegisterStatus;
  const role = useAppSelector(getRole);

  return (
    <Routes>
      <Route
        path={AppRoute.Main}
        element={
          // <PrivateRoute authorizationStatus={authorizationStatus} registerStatus={registerStatus} role={role}>
          <MainScreen/>
          // </PrivateRoute>
        }
      />
      <Route path={AppRoute.MainRegister} element={<ParentScreen/>}/>
      <Route path={AppRoute.ParentRegister} element={<RegisterScreen/>}/>
      <Route path={AppRoute.Login} element={<LoginScreen/>}/>
      <Route
        path={AppRoute.RegisterUser}
        element={
          <PrivateRoute authorizationStatus={authorizationStatus} registerStatus={registerStatus} role={role}>
            <QuestionnaireUserScreen/>
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.RegisterTrainer}
        element={
          <PrivateRoute authorizationStatus={authorizationStatus} registerStatus={registerStatus} role={role}>
            <QuestionnaireTrainerScreen/>
          </PrivateRoute>
        }
      />
      <Route path={'*'} element={<NotFoundScreen/>}/>
    </Routes>
  );
}

export default App;
