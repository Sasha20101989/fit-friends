import {Navigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus, RegisterStatus, isAuthorization, isAuthorizationUnknown, isTrainer, isUser} from '../../const';
import { Role } from '../../types/role.enum';
import Loading from '../loading/loading';

type PrivateRegisterRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
  registerStatus?: RegisterStatus;
  currentRole: Role;
}

function PrivateRegisterRoute(props: PrivateRegisterRouteProps): JSX.Element | null {
  const {authorizationStatus, currentRole, registerStatus, children} = props;

  if((isTrainer(currentRole) || isUser(currentRole)) && isAuthorization(authorizationStatus) && registerStatus === RegisterStatus.InProgress){
    return children;
  }

  if(isAuthorizationUnknown(authorizationStatus, currentRole)) {
    return <Loading />;
  }

  if((isTrainer(currentRole) || isUser(currentRole)) && isAuthorization(authorizationStatus) && registerStatus === RegisterStatus.Done){
    return <Navigate to={AppRoute.Main}/>;
  }

  return null;
}

export default PrivateRegisterRoute;

