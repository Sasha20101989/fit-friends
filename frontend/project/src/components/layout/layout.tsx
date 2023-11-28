import Header from '../header/header';

type LayoutProps = {
  children: React.ReactNode;
  includeHeader?: boolean;
}

function Layout({ children, includeHeader = true }: LayoutProps): JSX.Element {
  return (
    <div className="wrapper">
      {includeHeader && <Header />}
      <main>
        {children}
      </main>
    </div>
  );
}

export default Layout;

