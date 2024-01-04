import { render, screen } from '@testing-library/react';
import BackgroundLogo from './background-logo';

describe('BackgroundLogo component', () => {
  it('renders BackgroundLogo', () => {
    render(<BackgroundLogo />);

    const backgroundLogoElement = screen.getByTestId('background-logo');
    expect(backgroundLogoElement).toBeInTheDocument();

    const logoElement = screen.getByTestId('background-logo-logo');
    expect(logoElement).toBeInTheDocument();

    const iconElement = screen.getByTestId('background-logo-icon');
    expect(iconElement).toBeInTheDocument();
  });
});
