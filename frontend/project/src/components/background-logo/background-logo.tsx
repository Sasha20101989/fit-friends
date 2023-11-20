function BackgroundLogo(): JSX.Element {
  return (
    <div className="background-logo">
      <svg className="background-logo__logo" width="750" height="284" aria-hidden="true">
        <use xlinkHref="#logo-big"></use>
      </svg>
      <svg className="background-logo__icon" width="343" height="343" aria-hidden="true">
        <use xlinkHref="#icon-logotype"></use>
      </svg>
    </div>
  );
}

export default BackgroundLogo;
