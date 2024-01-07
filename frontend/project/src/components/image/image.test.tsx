import { render, screen } from '@testing-library/react';
import Image from './image';

describe('Image', () => {
  it('renders Image component with correct attributes', () => {
    const imageSrc = 'path/to/image.jpg';
    const sourceName = 'test-source';
    const width = 300;
    const height = 200;
    const alt = 'Test Alt Text';

    render(<Image imageSrc={imageSrc} sourceName={sourceName} width={width} height={height} alt={alt} />);

    const imageElement = screen.getByTestId('certificate-card-image');
    expect(imageElement).toBeInTheDocument();
  });
});
