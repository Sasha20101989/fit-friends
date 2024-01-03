import { render, screen } from '@testing-library/react';
import Layout from './layout';
import { mockState, mockStore } from '../../utils/mocks';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

describe('Layout', () => {
  it('renders Layout component with header', () => {
    const state = mockState();
    const store = mockStore(state);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Layout includeHeader>Test Content</Layout>
        </MemoryRouter>
      </Provider>
    );

    const headerElement = screen.getByTestId('header');
    expect(headerElement).toBeInTheDocument();

    const contentElement = screen.getByText('Test Content');
    expect(contentElement).toBeInTheDocument();
  });

  it('renders Layout component without header', () => {
    const state = mockState();
    const store = mockStore(state);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Layout includeHeader={false}>Test Content</Layout>
        </MemoryRouter>
      </Provider>
    );

    const headerElement = screen.queryByTestId('header');
    expect(headerElement).toBeNull();

    const contentElement = screen.getByText('Test Content');
    expect(contentElement).toBeInTheDocument();
  });
});
