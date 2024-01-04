import { render, screen } from '@testing-library/react';
import PopupMap from './popup-map';
import { Location } from '../../types/location.enum';

describe('PopupMap', () => {
  const onCloseMock = jest.fn();

  it('renders PopupMap component with correct attributes and handles close button click', () => {
    render(
      <PopupMap station={Location.Pioneer} onClose={onCloseMock} />
    );

    expect(screen.getByText('Валерия')).toBeInTheDocument();
    expect(screen.getByLabelText('close')).toBeInTheDocument();
  });
});
