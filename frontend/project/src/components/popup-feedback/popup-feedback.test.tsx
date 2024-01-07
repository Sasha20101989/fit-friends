import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PopupFeedback from './popup-feedback';

describe('PopupFeedback', () => {
  const onCloseMock = jest.fn();
  const onSubmitMock = jest.fn();

  it('renders PopupFeedback component with correct attributes and handles close button click', () => {
    render(
      <PopupFeedback onClose={onCloseMock} onSubmit={onSubmitMock} />
    );

    expect(screen.getByText('Оставить отзыв')).toBeInTheDocument();
    expect(screen.getByLabelText('close')).toBeInTheDocument();

    const closeButton = screen.getByLabelText('close');
    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalled();
  });
});
