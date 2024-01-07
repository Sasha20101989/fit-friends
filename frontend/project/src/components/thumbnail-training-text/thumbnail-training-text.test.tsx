import { render, screen } from '@testing-library/react';
import ThumbnailTrainingText from './thumbnail-training-text';

describe('ThumbnailTrainingText', () => {
  it('renders the ThumbnailTrainingText component with correct text', () => {
    const testText = 'Sample text';

    render(<ThumbnailTrainingText text={testText} />);

    const textElement = screen.getByText(testText);

    expect(textElement).toBeInTheDocument();
  });
});
