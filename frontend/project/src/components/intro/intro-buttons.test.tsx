import { render, fireEvent, screen } from '@testing-library/react';
import IntroButtons from './intro-buttons';
import { MemoryRouter } from 'react-router-dom';

describe('IntroButtons', () => {
  it('renders IntroButtons component with buttons and links', () => {
    const handleGoToRegisterClick = jest.fn();
    const handleGoToLoginClick = jest.fn();

    render(
      <MemoryRouter>
        <IntroButtons
          handleGoToRegisterClick={handleGoToRegisterClick}
          handleGoToLoginClick={handleGoToLoginClick}
        />
      </MemoryRouter>
    );

    const introButtonsElement = screen.getByTestId('intro-buttons');
    expect(introButtonsElement).toBeInTheDocument();

    const registerButton = screen.getByText('Регистрация');
    expect(registerButton).toBeInTheDocument();
    fireEvent.click(registerButton);
    expect(handleGoToRegisterClick).toHaveBeenCalledTimes(1);

    const loginLink = screen.getByText('Вход');
    expect(loginLink).toBeInTheDocument();
    fireEvent.click(loginLink);
    expect(handleGoToLoginClick).toHaveBeenCalledTimes(1);
  });
});
