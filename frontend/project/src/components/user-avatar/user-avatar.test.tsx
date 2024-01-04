import { render, screen, fireEvent } from '@testing-library/react';
import UserAvatar from './user-avatar';
import { initialUserState } from '../../utils/mocks';

describe('UserAvatar', () => {
  it('renders UserAvatar component with correct content', () => {
    const currentUser = {
      ...initialUserState,
      avatar: 'user-avatar.jpg',
    };

    const onImageUpload = jest.fn();
    const image = new File(['(⌐□_□)'], 'avatar.jpg', { type: 'image/jpeg' });

    render(<UserAvatar currentUser={currentUser} onImageUpload={onImageUpload} image={image} />);

    expect(screen.getByAltText('user avatar')).toBeInTheDocument();
  });
});
