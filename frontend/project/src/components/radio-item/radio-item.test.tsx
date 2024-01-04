import { render, screen, fireEvent } from '@testing-library/react';
import RadioItem from './radio-item';
import { Gender } from '../../types/gender.enum';

describe('RadioItem', () => {
  const mockProps = {
    classType: 'test-radio-item',
    name: 'testName',
    value: Gender.Other,
    selectedValue: Gender.Male,
    onValueChange: jest.fn(),
  };

  it('renders with correct content', () => {
    render(<RadioItem {...mockProps} />);

    const radioItem = screen.getByLabelText('неважно');
    expect(radioItem).toBeInTheDocument();
  });

  it('calls onValueChange when radio is clicked', () => {
    render(<RadioItem {...mockProps} />);

    const radioItem = screen.getByLabelText('неважно');
    fireEvent.click(radioItem);

    expect(mockProps.onValueChange).toHaveBeenCalled();
  });
});
