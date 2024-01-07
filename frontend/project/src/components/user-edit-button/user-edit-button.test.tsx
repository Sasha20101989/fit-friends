import { render, fireEvent, screen } from '@testing-library/react';
import UserEditButton from './user-edit-button';

describe('UserEditButton Component', () => {
  it('calls onToggleFormEditable when clicked', () => {
    const mockOnToggleFormEditable = jest.fn();
    const mockOnSave = jest.fn();

    render(
      <UserEditButton isFormEditable={false} onToggleFormEditable={mockOnToggleFormEditable} onSave={mockOnSave} />
    );

    const button = screen.getByLabelText('Редактировать');
    fireEvent.click(button);

    expect(mockOnToggleFormEditable).toHaveBeenCalled();
  });
});
