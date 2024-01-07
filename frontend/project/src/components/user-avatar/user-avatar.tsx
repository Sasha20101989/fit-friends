import { ChangeEvent, useEffect, useState } from 'react';
import { Trainer } from '../../types/trainer.interface';
import { User } from '../../types/user.interface';

type UserAvatarProps = {
  currentUser: User | Trainer;
  onImageUpload: (evt: ChangeEvent<HTMLInputElement>) => void;
  image: string | null;
}

function UserAvatar({currentUser, onImageUpload, image}: UserAvatarProps): JSX.Element {
  const [hostedImage, setHostedImage] = useState<string>('');
  const [fileExtension, setFileExtension] = useState<string>('');

  useEffect(() => {
    if (currentUser.avatar) {
      const extension = currentUser.avatar.split('.').pop() || '';
      const imageNameWithoutExtension = currentUser.avatar.replace(/\.[^/.]+$/, '');
      setHostedImage(imageNameWithoutExtension);
      setFileExtension(extension);
    }
  }, [currentUser.avatar]);

  return (
    <div className="input-load-avatar">
      <label>
        <input className="visually-hidden" type="file" name="user-photo-1" accept="image/png, image/jpeg" onChange={onImageUpload} />
        <span className="input-load-avatar__avatar">
          {image ? (
            <img
              src={image}
              width="98"
              height="98"
              alt="user avatar"
            />
          ) : (
            <img
              src={`${hostedImage}${fileExtension ? `.${fileExtension}` : ''}`}
              srcSet={`${hostedImage}@2x.${fileExtension ? fileExtension : ''} 2x`}
              width="98"
              height="98"
              alt="user avatar"
            />
          )}
        </span>
      </label>
    </div>
  );
}

export default UserAvatar;
