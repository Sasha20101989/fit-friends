import {RingLoader} from 'react-spinners';
import { RING_LOADER_COLOR } from '../../const';

const loadingStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh'
};

function Loading():JSX.Element {
  return (
    <div style={loadingStyle}>
      <RingLoader size={150} color={RING_LOADER_COLOR} loading/>
    </div>
  );
}

export default Loading;
