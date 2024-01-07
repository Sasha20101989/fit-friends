import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ThumbnailLink from './thumbnail-link';

describe('ThumbnailLink', () => {
  const mockProps = {
    to: '/path',
    icon: '#icon-home',
    text: 'Home',
  };

  it('renders the ThumbnailLink component with correct content', () => {
    render(
      <Router>
        <ThumbnailLink {...mockProps} />
      </Router>
    );

    const linkElement = screen.getByRole('link', { name: /home/i });

    expect(linkElement).toBeInTheDocument();
  });

  it('navigates to the correct path when clicked', () => {
    render(
      <Router>
        <ThumbnailLink {...mockProps} />
      </Router>
    );

    const linkElement = screen.getByRole('link', { name: /home/i });

    expect(linkElement).toHaveAttribute('href', '/path');
  });

});
