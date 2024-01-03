import { render, screen } from '@testing-library/react';
import CardGalery from './card-galery';

describe('CardGalery', () => {
  it('renders CardGalery component for coach', () => {
    render(<CardGalery isCoach />);

    // Проверяем, что изображение photo1 отображается для тренера
    expect(screen.getByAltText('photo1')).toBeInTheDocument();

    // Проверяем, что изображение photo2 отображается для тренера
    expect(screen.getByAltText('photo2')).toBeInTheDocument();
  });

  it('renders CardGalery component for user', () => {
    render(<CardGalery isCoach={false} />);

    // Проверяем, что изображение photo1 отображается для пользователя
    expect(screen.getByAltText('photo1')).toBeInTheDocument();

    // Проверяем, что изображение photo2 отображается для пользователя
    expect(screen.getByAltText('photo2')).toBeInTheDocument();
  });
});
