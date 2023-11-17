import { Routes, Route } from 'react-router-dom';
//import { AuthorizationStatus } from '../../const';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
//import { useAppSelector } from '../../hooks/index';
//import { getAuthorizationStatus } from '../../store/user-process/user-process.selectors';

function App(): JSX.Element {
  //const authorizationStatus = useAppSelector(getAuthorizationStatus) as AuthorizationStatus;
  return (
    <Routes>
      <Route path={'*'} element={<NotFoundScreen/>}/>
    </Routes>
  );
}

export default App;
