import { useAppSelector } from '../../hooks/index';
import { getAvatar } from '../../store/main-process/main-process.selectors';

function UserAvatar(): JSX.Element {
  const avatar = useAppSelector(getAvatar);
  let hostedImage = '';
  let fileExtension = '';

  if (avatar) {
    fileExtension = avatar.split('.').pop() || '';
    const imageNameWithoutExtension = avatar.replace(/\.[^/.]+$/, '');
    hostedImage = `http://localhost:3000/${imageNameWithoutExtension}`;
  }

  return (
    <div className="input-load-avatar">
      <label>
        <input className="visually-hidden" type="file" name="user-photo-1" accept="image/png, image/jpeg" />
        <span className="input-load-avatar__avatar">
          <img
            src={`${hostedImage}${fileExtension ? `.${fileExtension}` : ''}`}
            srcSet={`${hostedImage}@2x.${fileExtension ? fileExtension : ''} 2x`}
            width="98"
            height="98"
            alt="user avatar"
          />
        </span>
      </label>
    </div>
  );
}


export default UserAvatar;
