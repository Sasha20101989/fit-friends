function UserAvatar(): JSX.Element {
  return (
    <div className="input-load-avatar">
      <label>
        <input className="visually-hidden" type="file" name="user-photo-1" accept="image/png, image/jpeg" />
        <span className="input-load-avatar__avatar">
          <img src="img/content/user-photo-1.png" srcSet="img/content/user-photo-1@2x.png 2x" width="98" height="98" alt="user avatar" />
        </span>
      </label>
    </div>
  );
}

export default UserAvatar;
