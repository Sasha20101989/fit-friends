import { render, screen, fireEvent } from '@testing-library/react';
import Filter from './filter';
import { Location } from '../../types/location.enum';
import { WorkoutType } from '../../types/workout-type.enum';

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

    expect(screen.getByText('Посмотреть все')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Посмотреть все'));

    Object.values(Location).forEach((location) => {
      expect(screen.getByText(location)).toBeInTheDocument();
    });

    const checkbox = screen.getByLabelText(Location.Petrograd);
    fireEvent.click(checkbox);

    expect(onFilterChangeMock).toHaveBeenCalledWith('location', [Location.Petrograd]);

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

    expect(screen.getByText('Посмотреть все')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Посмотреть все'));

    Object.values(WorkoutType).forEach((type) => {
      expect(screen.getByText(type)).toBeInTheDocument();
    });

    const checkbox = screen.getByLabelText(WorkoutType.Aerobics);
    fireEvent.click(checkbox);

    expect(onFilterChangeMock).toHaveBeenCalledWith('spezialization', [WorkoutType.Aerobics]);

    expect(checkbox).toBeChecked();
  });
});
