import { render, screen, fireEvent } from '@testing-library/react';
import PopupCertificates from './popup-certificates';

describe('PopupCertificates', () => {
  const onCloseMock = jest.fn();

  it('renders PopupCertificates component with correct attributes and handles close button click', () => {
    render(
      <PopupCertificates certificates={['Certificate 1', 'Certificate 2']} onClose={onCloseMock} />
    );

    expect(screen.getByText('Сертификаты')).toBeInTheDocument();
    expect(screen.getByLabelText('close')).toBeInTheDocument();

    const closeButton = screen.getByLabelText('close');
    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalled();
  });
});
