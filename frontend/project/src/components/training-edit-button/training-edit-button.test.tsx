import { render, screen, fireEvent } from '@testing-library/react';
import TrainingEditButton from './training-edit-button';

describe('TrainingEditButton', () => {
  const mockProps = {
    isFormEditable: false,
    onToggleFormEditable: jest.fn(),
    onSave: jest.fn(),
  };

  it('renders TrainingEditButton component with "Редактировать" text when form is not editable', () => {
    render(<TrainingEditButton {...mockProps} />);
    const buttonText = screen.getByText('Редактировать');
    expect(buttonText).toBeInTheDocument();
  });

  it('renders TrainingEditButton component with "Сохранить" text when form is editable', () => {
    const editableProps = { ...mockProps, isFormEditable: true };
    render(<TrainingEditButton {...editableProps} />);
    const buttonText = screen.getByText('Сохранить');
    expect(buttonText).toBeInTheDocument();
  });

  it('handles button click when form is not editable', () => {
    render(<TrainingEditButton {...mockProps} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(mockProps.onToggleFormEditable).toHaveBeenCalled();
    expect(mockProps.onSave).not.toHaveBeenCalled();
  });

  it('handles button click when form is editable', () => {
    const editableProps = { ...mockProps, isFormEditable: true };
    render(<TrainingEditButton {...editableProps} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(mockProps.onToggleFormEditable).toHaveBeenCalled();
  });
});
