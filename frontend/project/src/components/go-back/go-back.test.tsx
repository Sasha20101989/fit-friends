import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import GoBack from './go-back';
import { AppRoute } from '../../const';

const mockProps = {
  sourceName: 'btn-flat my-purchases__back',
  width: 20,
  height: 20,
  route: AppRoute.Main,
};

describe('GoBack', () => {
  it('renders GoBack component with correct attributes and navigates on button click', () => {
    render(
      <MemoryRouter initialEntries={[AppRoute.CreateTraining]}>
        <GoBack {...mockProps} />
      </MemoryRouter>
    );

    const goBackButton = screen.getByText('Назад');
    expect(goBackButton).toBeInTheDocument();

    goBackButton.click();

    expect(window.location.pathname).toBe(AppRoute.Main);
  });
});
