import { render, screen } from '@testing-library/react';
import ThumbnailSpecGym from './thumbnail-spec-gym';

describe('ThumbnailSpecGym', () => {
  it('renders the ThumbnailSpecGym component with correct content', () => {
    render(<ThumbnailSpecGym />);

    const thumbnailElement = screen.getByTestId('thumbnail-spec-gym');
    const imageElement = screen.getByRole('img');
    const titleElement = screen.getByText(/скоро здесь появится что-то полезное/i);

    expect(thumbnailElement).toBeInTheDocument();
    expect(imageElement).toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();
  });
});
