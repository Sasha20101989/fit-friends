import { render, screen } from '@testing-library/react';
import SpecialForYouItem from './special-for-you-item';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { mockState, mockStore } from '../../utils/mocks';

describe('SpecialForYouItem', () => {
  const mockProps = {
    title: 'Special Training',
    imageSrc: 'path/to/image.jpg',
    trainingId: '123',
  };

  it('renders the title', () => {
    const state = mockState();
    const store = mockStore(state);

    render(<Provider store={store}>
      <MemoryRouter>
        <SpecialForYouItem {...mockProps} />
      </MemoryRouter>
    </Provider>
    );

    const titleElement = screen.getByText(mockProps.title);
    expect(titleElement).toBeInTheDocument();
  });

  it('renders the image', () => {
    const state = mockState();
    const store = mockStore(state);

    render(<Provider store={store}>
      <MemoryRouter>
        <SpecialForYouItem {...mockProps} />
      </MemoryRouter>
    </Provider>
    );

    const imageElement = screen.getByAltText('special card');
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', mockProps.imageSrc);
  });
});
