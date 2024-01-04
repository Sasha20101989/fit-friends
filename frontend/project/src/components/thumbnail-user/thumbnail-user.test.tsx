import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ThumbnailUser from './thumbnail-user';
import { initialUserState } from '../../utils/mocks';
import { Location } from '../../types/location.enum';
import { WorkoutType } from '../../types/workout-type.enum';

describe('ThumbnailUser', () => {
  it('navigates to the correct route when "Подробнее" button is clicked', () => {
    const testProps = {
      sourceName: 'test-source',
      childSourceName: 'test-child-source',
      buttonSourceName: 'test-button-source',
      user: {...initialUserState,
        id: '123',
        avatar: 'test-avatar.jpg',
        name: 'Test User',
        location: Location.Pioneer,
        workoutTypes: [WorkoutType.Aerobics, WorkoutType.Boxing],
      },
    };

    render(
      <Router>
        <ThumbnailUser {...testProps} />
      </Router>
    );

    const detailsButton = screen.getByText('Подробнее');

    fireEvent.click(detailsButton);

    const detailsLink = screen.getByText('Подробнее');
    expect(detailsLink).toBeInTheDocument();
  });
});
