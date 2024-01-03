import { render, screen } from '@testing-library/react';
import { mockState, mockStore } from '../../utils/mocks';
import { Provider } from 'react-redux';
import VideoSection from './video-section';
import { Role } from '../../types/role.enum';
import { MemoryRouter } from 'react-router-dom';

describe('VideoSection', () => {
  it('renders VideoSection component with correct attributes for user', () => {
    const state = mockState();
    // Установите currentUser с ролью пользователя
    state.user.user.role = Role.User;

    const store = mockStore(state);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <VideoSection isInBalance />
        </MemoryRouter>
      </Provider>
    );

    // Проверьте, что компонент отрисован
    const videoSectionElement = screen.getByText('Видео');
    expect(videoSectionElement).toBeInTheDocument();

    // Например, проверьте наличие кнопки "Приступить"
    const startButton = screen.getByText('Приступить');
    expect(startButton).toBeInTheDocument();
  });

  it('renders VideoSection component with correct attributes for trainer', () => {
    const state = mockState();
    // Установите currentUser с ролью тренера
    state.user.user.role = Role.Trainer;

    const store = mockStore(state);

    render(
      <Provider store={store}>
        <VideoSection isInBalance />
      </Provider>
    );

    // Проверьте, что компонент отрисован
    const videoSectionElement = screen.getByText('Видео');
    expect(videoSectionElement).toBeInTheDocument();

    // Добавьте дополнительные проверки для убеждения в корректной отрисовке

    // Например, проверьте наличие кнопок "Сохранить" и "Удалить"
    const saveButton = screen.getByText('Сохранить');
    const deleteButton = screen.getByText('Удалить');

    expect(saveButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
  });
});
