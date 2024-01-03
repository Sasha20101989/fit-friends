import { render, screen, fireEvent } from '@testing-library/react';
import Filter from './filter';
import { Location } from '../../types/location.enum';
import { WorkoutType } from '../../types/workout-type.enum';

// Mock функции
const onFilterChangeMock = jest.fn();

describe('Filter', () => {
  it('renders Filter component with correct values and calls onFilterChange on checkbox change', () => {
    render(
      <Filter
        title="Test Filter"
        filterName="location"
        values={Object.values(Location)}
        onFilterChange={onFilterChangeMock}
      />
    );

    const filterElement = screen.getByTestId('location');
    expect(filterElement).toBeInTheDocument();

    Object.values(Location).slice(0, 5).forEach((location) => {
      expect(screen.getByText(location)).toBeInTheDocument();
    });

    // Проверяем, что "Посмотреть все" кнопка отображается, так как есть более 5 элементов
    expect(screen.getByText('Посмотреть все')).toBeInTheDocument();

    // Симулируем клик по "Посмотреть все"
    fireEvent.click(screen.getByText('Посмотреть все'));

    // Проверяем, что все элементы отображаются
    Object.values(Location).forEach((location) => {
      expect(screen.getByText(location)).toBeInTheDocument();
    });

    // Симулируем изменение чекбокса
    const checkbox = screen.getByLabelText(Location.Petrograd);
    fireEvent.click(checkbox);

    // Проверяем, что функция обратного вызова onFilterChange вызывается с правильными аргументами
    expect(onFilterChangeMock).toHaveBeenCalledWith('location', [Location.Petrograd]);

    // Проверяем, что состояние компонента обновлено
    expect(checkbox).toBeChecked();
  });

  it('renders Filter component with correct values and calls onFilterChange on checkbox change - workoutTypes', () => {
    render(
      <Filter
        title="Test Filter"
        filterName="spezialization"
        values={Object.values(WorkoutType)}
        onFilterChange={onFilterChangeMock}
      />
    );

    const filterElement = screen.getByTestId('spezialization');
    expect(filterElement).toBeInTheDocument();

    Object.values(WorkoutType).slice(0, 5).forEach((type) => {
      expect(screen.getByText(type)).toBeInTheDocument();
    });

    // Проверяем, что "Посмотреть все" кнопка отображается, так как есть более 5 элементов
    expect(screen.getByText('Посмотреть все')).toBeInTheDocument();

    // Симулируем клик по "Посмотреть все"
    fireEvent.click(screen.getByText('Посмотреть все'));

    // Проверяем, что все элементы отображаются
    Object.values(WorkoutType).forEach((type) => {
      expect(screen.getByText(type)).toBeInTheDocument();
    });

    // Симулируем изменение чекбокса
    const checkbox = screen.getByLabelText(WorkoutType.Aerobics);
    fireEvent.click(checkbox);

    // Проверяем, что функция обратного вызова onFilterChange вызывается с правильными аргументами
    expect(onFilterChangeMock).toHaveBeenCalledWith('spezialization', [WorkoutType.Aerobics]);

    // Проверяем, что состояние компонента обновлено
    expect(checkbox).toBeChecked();
  });
});
