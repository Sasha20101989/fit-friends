function IntroTitleLogo(): JSX.Element {
  return (
    <div className="intro__title-logo">
      <picture>
        <source type="image/webp" srcSet="img/content/sitemap//title-logo.webp, img/content/sitemap//title-logo@2x.webp 2x"/>
        <img src="img/content/sitemap//title-logo.png" srcSet="img/content/sitemap//title-logo@2x.png 2x" width="934" height="455" alt="Логотип Fit Friends"/>
      </picture>
    </div>
  );
}

export default IntroTitleLogo;
