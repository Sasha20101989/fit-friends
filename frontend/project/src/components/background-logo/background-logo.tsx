function BackgroundLogo(): JSX.Element {
  return (
    <div className="background-logo" data-testid="background-logo">
      <svg className="background-logo__logo" width="750" height="284" aria-hidden="true" data-testid="background-logo-logo">
        <use xlinkHref="#logo-big"></use>
      </svg>
      <svg className="background-logo__icon" width="343" height="343" aria-hidden="true" data-testid="background-logo-icon">
        <use xlinkHref="#icon-logotype"></use>
      </svg>
    </div>
  );
}

export default BackgroundLogo;
