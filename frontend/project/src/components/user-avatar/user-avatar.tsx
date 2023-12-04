type UserAvatarProps = {
  avatar: string;
}

function UserAvatar({avatar}: UserAvatarProps): JSX.Element {
  return (
    <div className="input-load-avatar">
      <label>
        <input className="visually-hidden" type="file" name="user-photo-1" accept="image/png, image/jpeg" />
        <span className="input-load-avatar__avatar">
          <img src={avatar} srcSet={`${avatar}@2x.jpg 2x`} width="98" height="98" alt="user avatar" />
        </span>
      </label>
    </div>
  );
}


export default UserAvatar;
