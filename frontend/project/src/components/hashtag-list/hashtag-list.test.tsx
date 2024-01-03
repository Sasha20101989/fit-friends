import { render, screen } from '@testing-library/react';
import HashtagList from './hashtag-list';

describe('HashtagList', () => {
  it('renders HashtagList component with correct attributes', () => {
    const classType = 'test-list';
    const hashtagClassType = 'test-hashtag';
    const hashtagItemClassType = 'test-hashtag-item';
    const hashtags = ['tag1', 'tag2', 'tag3'];

    render(
      <HashtagList
        classType={classType}
        hashtagClassType={hashtagClassType}
        hashtagItemClassType={hashtagItemClassType}
        hashtags={hashtags}
      />
    );

    const hashtagListElement = screen.getByTestId(classType);
    expect(hashtagListElement).toBeInTheDocument();

    hashtags.forEach((tag) => {
      const hashtagElement = screen.getByText(`#${tag}`);
      expect(hashtagElement).toBeInTheDocument();
    });
  });
});
