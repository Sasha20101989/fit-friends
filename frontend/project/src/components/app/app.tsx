import { Routes, Route } from 'react-router-dom';
//import { AuthorizationStatus } from '../../const';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import ParentScreen from '../../pages/parent-screen/parent-screen';
import { AppRoute } from '../../const';
import LoginScreen from '../../pages/login-screen/login-screen';
import RegisterScreen from '../../pages/register-screen/register-screen';
//import { useAppSelector } from '../../hooks/index';
//import { getAuthorizationStatus } from '../../store/user-process/user-process.selectors';

function App(): JSX.Element {
  //const authorizationStatus = useAppSelector(getAuthorizationStatus) as AuthorizationStatus;
  return (
    <Routes>
      <Route path={AppRoute.Parent} element={<ParentScreen/>}/>
      <Route path={AppRoute.Login} element={<LoginScreen/>}/>
      <Route path={AppRoute.Register} element={<RegisterScreen/>}/>
      <Route path={'*'} element={<NotFoundScreen/>}/>
    </Routes>
  );
}

export default App;
