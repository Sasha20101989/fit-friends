import {Navigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus, RegisterStatus, isAuthorization, isAuthorizationUnknown} from '../../const';
import Loading from '../loading/loading';
import { useAppSelector } from '../../hooks/index';
import { getCurrentUser } from '../../store/user-process/user-process.selectors';

type PrivateRegisterRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
  registerStatus?: RegisterStatus;
}

function PrivateRegisterRoute(props: PrivateRegisterRouteProps): JSX.Element | null {
  const {authorizationStatus, registerStatus, children} = props;

  const currentUser = useAppSelector(getCurrentUser);

  if(registerStatus === RegisterStatus.InProgress){
    return children;
  }

  if(isAuthorizationUnknown(authorizationStatus, currentUser)) {
    return <Loading />;
  }

  if(isAuthorization(authorizationStatus) && registerStatus === RegisterStatus.Done){
    return <Navigate to={AppRoute.Main}/>;
  }

  return null;
}

export default PrivateRegisterRoute;

