function IntroBackground(): JSX.Element {
  return (
    <div className="intro__background">
      <picture>
        <source type="image/webp" srcSet="img/content/sitemap//background.webp, img/content/sitemap//background@2x.webp 2x"/>
        <img src="img/content/sitemap//background.jpg" srcSet="img/content/sitemap//background@2x.jpg 2x" width="1440" height="1024" alt="Фон с бегущей девушкой"/>
      </picture>
    </div>
  );
}

export default IntroBackground;
