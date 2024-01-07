import { render, screen, fireEvent } from '@testing-library/react';
import LabeledInput from './labeled-input';

describe('LabeledInput', () => {
  it('renders LabeledInput component', () => {
    const mockOnChange = jest.fn();

    render(
      <LabeledInput
        classType="class-type"
        type="text"
        label="Your Label"
        inputName="input-name"
        onChange={mockOnChange}
      />
    );

    const inputElement = screen.getByLabelText('Your Label');
    expect(inputElement).toBeInTheDocument();

    fireEvent.change(inputElement, { target: { value: 'test value' } });

    expect(mockOnChange).toHaveBeenCalledWith('test value');
  });
});
