import { render, screen } from '@testing-library/react';
import CertificateList from './certificate-list';

describe('CertificateList', () => {
  it('renders CertificateList component', () => {
    const certificates = ['path/to/certificate1.jpg', 'path/to/certificate2.jpg'];
    render(<CertificateList certificates={certificates} />);

    expect(screen.getAllByTestId('certificate-card')).toHaveLength(certificates.length);
  });
});
