import {Navigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus, RegisterStatus, isAuthorization, isAuthorizationUnknown, isTrainer, isUser} from '../../const';
import { Role } from '../../types/role.enum';
import Loading from '../loading/loading';

type PrivateRegisterRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
  registerStatus?: RegisterStatus;
  role: Role;
}

function PrivateTrainerRegisterRoute(props: PrivateRegisterRouteProps): JSX.Element {
  const {authorizationStatus, role, registerStatus, children} = props;

  if((isTrainer(role) || isUser(role)) && isAuthorization(authorizationStatus) && registerStatus === RegisterStatus.InProgress){
    return children;
  }

  if(isAuthorizationUnknown(authorizationStatus, role)) {
    return <Loading />;
  }

  if((isTrainer(role) || isUser(role)) && isAuthorization(authorizationStatus) && registerStatus === RegisterStatus.Done){
    return <Navigate to={AppRoute.Main}/>;
  }

  return <Navigate to={AppRoute.MainRegister}/>;
}

export default PrivateTrainerRegisterRoute;
