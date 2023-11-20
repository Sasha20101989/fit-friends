type LayoutProps = {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <div className="wrapper">
      {/* <Header/> */}
      <main>
        {children}
      </main>
      {/* <Footer/> */}
    </div>
  );
}

export default Layout;
