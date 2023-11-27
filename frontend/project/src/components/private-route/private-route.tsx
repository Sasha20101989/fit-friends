import {Navigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus, RegisterStatus, isAuthorization, isRegister, isTrainer, isUser} from '../../const';
//import Loading from '../loading/loading';
import { Role } from '../../types/role.enum';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
  registerStatus?: RegisterStatus;
  role: Role;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {authorizationStatus, role, registerStatus, children} = props;

  if(registerStatus && isRegister(registerStatus)){
    return children;
  }

  if(isUser(role) && isAuthorization(authorizationStatus)){
    return children;
  }

  if(isTrainer(role) && isAuthorization(authorizationStatus)){
    //return <Navigate to={AppRoute.Login} />; кабинет тренера
  }

  // if (isAuthorizationUnknown(authorizationStatus)) {
  //   return <Loading />;
  // }

  return <Navigate to={AppRoute.MainRegister}/>;
}

export default PrivateRoute;
