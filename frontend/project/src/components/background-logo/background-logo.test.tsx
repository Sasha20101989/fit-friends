import { render, screen } from '@testing-library/react';
import BackgroundLogo from './background-logo';

describe('BackgroundLogo component', () => {
  it('renders BackgroundLogo', () => {
    render(<BackgroundLogo />);

    // Проверяем, что компонент отрисован
    const backgroundLogoElement = screen.getByTestId('background-logo');
    expect(backgroundLogoElement).toBeInTheDocument();

    // Проверяем, что логотип компании отрисован
    const logoElement = screen.getByTestId('background-logo-logo');
    expect(logoElement).toBeInTheDocument();

    // Проверяем, что иконка логотипа отрисована
    const iconElement = screen.getByTestId('background-logo-icon');
    expect(iconElement).toBeInTheDocument();
  });
});
