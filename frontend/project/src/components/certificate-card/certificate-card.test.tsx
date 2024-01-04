import { render, screen, fireEvent } from '@testing-library/react';
import CertificateCard from './certificate-card';

describe('CertificateCard', () => {
  it('renders CertificateCard with editing and saving functionality', () => {
    const certificateImage = 'path/to/certificate.jpg';

    render(<CertificateCard certificate={certificateImage} />);

    const certificateCardElement = screen.getByTestId('certificate-card');
    expect(certificateCardElement).toBeInTheDocument();

    const editButtonElement = screen.getByTestId('edit-button');
    expect(editButtonElement).toBeInTheDocument();

    fireEvent.click(editButtonElement);

    const saveButtonElement = screen.getByTestId('save-button');
    expect(saveButtonElement).toBeInTheDocument();

    fireEvent.click(saveButtonElement);

    expect(saveButtonElement).not.toBeInTheDocument();
  });
});
