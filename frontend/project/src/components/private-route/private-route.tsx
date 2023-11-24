import {Navigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus, RegisterStatus, isAuthorization, isAuthorizationUnknown, isRegister} from '../../const';
import Loading from '../loading/loading';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
  registerStatus: RegisterStatus;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {authorizationStatus, registerStatus, children} = props;

  if(isRegister(registerStatus)){
    return children;
  }

  if (isAuthorization(authorizationStatus)) {
    return children;
  }

  if (isAuthorizationUnknown(authorizationStatus)) {
    return <Loading />;
  }

  return <Navigate to={AppRoute.Login} />;
}

export default PrivateRoute;
