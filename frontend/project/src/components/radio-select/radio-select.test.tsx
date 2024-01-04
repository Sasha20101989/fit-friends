import { render, screen, fireEvent } from '@testing-library/react';
import RadioSelect from './radio-select';
import { Gender } from '../../types/gender.enum';

describe('RadioSelect', () => {
  const mockProps = {
    name: 'testName',
    classType: 'test-radio-select',
    classChildType: 'test-radio-select-child',
    classLabelType: 'test-radio-label',
    label: 'Test Label',
    selectedValue: Gender.Other,
    object: Object.values(Gender),
    toNextLine: true,
    error: '',
    onValueChange: jest.fn(),
  };

  it('renders with correct content', () => {
    render(<RadioSelect {...mockProps} />);

    const radioOptions = screen.getAllByRole('radio');
    expect(radioOptions.length).toBe(4);
  });
});
