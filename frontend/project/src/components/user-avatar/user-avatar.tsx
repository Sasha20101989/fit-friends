type UserAvatarProps = {
  avatar: string;
}

function UserAvatar({avatar}: UserAvatarProps): JSX.Element {
  const fileExtension = avatar.split('.').pop();
  const imageNameWithoutExtension = avatar.replace(/\.[^/.]+$/, '');
  const hostedImage = `http://localhost:3000/${imageNameWithoutExtension}`;

  return (
    <div className="input-load-avatar">
      <label>
        <input className="visually-hidden" type="file" name="user-photo-1" accept="image/png, image/jpeg" />
        <span className="input-load-avatar__avatar">
          <img src={`${hostedImage}.${fileExtension}`} srcSet={`${hostedImage}@2x.${fileExtension} 2x`} width="98" height="98" alt="user avatar" />
        </span>
      </label>
    </div>
  );
}


export default UserAvatar;
