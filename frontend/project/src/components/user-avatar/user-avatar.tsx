import { Trainer } from '../../types/trainer.interface';
import { User } from '../../types/user.interface';

type UserAvatarProps = {
  currentUser: User | Trainer;
}

function UserAvatar({currentUser}: UserAvatarProps): JSX.Element {
  let hostedImage = '';
  let fileExtension = '';

  if (currentUser.avatar) {
    fileExtension = currentUser.avatar.split('.').pop() || '';
    const imageNameWithoutExtension = currentUser.avatar.replace(/\.[^/.]+$/, '');
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
