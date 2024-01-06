import { render, screen } from '@testing-library/react';
import UserAvatar from './user-avatar';
import { initialUserState } from '../../utils/mocks';

global.URL.createObjectURL = jest.fn(() => 'mocked-url');

describe('UserAvatar', () => {
  it('renders UserAvatar component with correct content', () => {
    const currentUser = {
      ...initialUserState,
      avatar: 'user-avatar.jpg',
    };

    const onImageUpload = jest.fn();
    const image = new File(['avatar'], 'avatar.jpg', { type: 'image/jpeg' });

    render(<UserAvatar currentUser={currentUser} onImageUpload={onImageUpload} image={URL.createObjectURL(image)} />);

    expect(screen.getByAltText('user avatar')).toBeInTheDocument();
  });
});
