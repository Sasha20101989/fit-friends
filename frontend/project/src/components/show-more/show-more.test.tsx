import { render, screen, fireEvent } from '@testing-library/react';
import ShowMore from './show-more';

describe('ShowMore', () => {
  const mockProps = {
    sourceName: 'test-source',
    length: 10,
    limit: 5,
    onShowMoreClick: jest.fn(),
  };

  it('renders "Показать еще" button when length is a multiple of the limit', () => {
    render(<ShowMore {...mockProps} />);

    const showMoreButton = screen.getByText('Показать еще');
    expect(showMoreButton).toBeInTheDocument();
  });

  it('does not render "Показать еще" button when length is not a multiple of the limit', () => {
    render(<ShowMore {...mockProps} length={8} />);

    const showMoreButton = screen.queryByText('Показать еще');
    expect(showMoreButton).not.toBeInTheDocument();
  });

  it('calls onShowMoreClick when "Показать еще" button is clicked', () => {
    render(<ShowMore {...mockProps} />);

    const showMoreButton = screen.getByText('Показать еще');
    fireEvent.click(showMoreButton);

    expect(mockProps.onShowMoreClick).toHaveBeenCalled();
  });

  it('renders "Вернуться в начало" button', () => {
    render(<ShowMore {...mockProps} />);

    const toTopButton = screen.getByText('Вернуться в начало');
    expect(toTopButton).toBeInTheDocument();
  });
});
