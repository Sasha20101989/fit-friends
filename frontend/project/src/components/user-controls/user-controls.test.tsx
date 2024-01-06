import { render, fireEvent, screen } from '@testing-library/react';
import UserControls from './user-controls';

describe('UserControls Component', () => {
  it('calls onImageSubmit when the "обновить" button is clicked', () => {
    const mockOnImageSubmit = jest.fn();

    render(
      <UserControls onImageSubmit={mockOnImageSubmit} />
    );

    const updateButton = screen.getByLabelText('обновить');
    fireEvent.click(updateButton);

    expect(mockOnImageSubmit).toHaveBeenCalled();
  });

  it('does not call onImageSubmit when the "удалить" button is clicked', () => {
    const mockOnImageSubmit = jest.fn();

    render(
      <UserControls onImageSubmit={mockOnImageSubmit} />
    );

    const deleteButton = screen.getByLabelText('удалить');
    fireEvent.click(deleteButton);

    expect(mockOnImageSubmit).not.toHaveBeenCalled();
  });
});
