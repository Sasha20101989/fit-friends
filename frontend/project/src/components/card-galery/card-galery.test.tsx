import { render, screen } from '@testing-library/react';
import CardGalery from './card-galery';

describe('CardGalery', () => {
  it('renders CardGalery component for coach', () => {
    render(<CardGalery isCoach />);

    expect(screen.getByAltText('photo1')).toBeInTheDocument();

    expect(screen.getByAltText('photo2')).toBeInTheDocument();
  });

  it('renders CardGalery component for user', () => {
    render(<CardGalery isCoach={false} />);

    expect(screen.getByAltText('photo1')).toBeInTheDocument();

    expect(screen.getByAltText('photo2')).toBeInTheDocument();
  });
});
