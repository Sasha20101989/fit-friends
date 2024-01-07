function IntroIcon(): JSX.Element {
  return (
    <svg className="intro__icon" width="60" height="60" aria-hidden="true" data-testid="intro-icon">
      <use xlinkHref="#icon-logotype"></use>
    </svg>
  );
}

export default IntroIcon;
