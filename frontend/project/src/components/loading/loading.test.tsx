import { render, screen } from '@testing-library/react';
import Loading from './loading';

describe('Loading', () => {
  it('renders Loading component with correct attributes', () => {
    render(<Loading />);

    const loadingElement = screen.getByTestId('loading-component');
    expect(loadingElement).toBeInTheDocument();

    const ringLoaderElement = screen.getByTestId('ring-loader');
    expect(ringLoaderElement).toBeInTheDocument();
  });
});
