import {Navigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus, RegisterStatus, isAuthorization, isAuthorizationUnknown, isRegister, isTrainer} from '../../const';
import { Role } from '../../types/role.enum';
import Loading from '../loading/loading';

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

  // if(isUser(role) && isAuthorization(authorizationStatus)){
  //   return children;
  // }

  if(isTrainer(role) && isAuthorization(authorizationStatus)){
    return children;
  }

  if (isAuthorizationUnknown(authorizationStatus)) {
    return <Loading />;
  }

  return <Navigate to={AppRoute.MainRegister}/>;
}

export default PrivateRoute;
