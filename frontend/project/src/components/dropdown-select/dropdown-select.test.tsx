import { render, screen, fireEvent } from '@testing-library/react';
import DropdownSelect from './dropdown-select';
import { WorkoutDuration } from '../../types/workout-duration.enum';
import { TrainingLevel } from '../../types/training-level.enum';
import { Location } from '../../types/location.enum';
import { Gender } from '../../types/gender.enum';

// Mock функции
const onValueChangeMock = jest.fn();
const onToggleDropdownMock = jest.fn();

describe('DropdownSelect', () => {
  it('renders DropdownSelect component with correct values and calls functions on interaction', () => {
    // Тестирование компонента с WorkoutDuration
    render(
      <DropdownSelect
        classType="workout-duration-select"
        label="Длительность тренировки"
        selectedValue="Выберите длительность"
        error=""
        object={Object.values(WorkoutDuration)}
        onValueChange={onValueChangeMock}
        onToggleDropdown={onToggleDropdownMock}
      />
    );

    // Проверяем, что компонент отрисован
    const dropdownSelectElement = screen.getByTestId('workout-duration-select');
    expect(dropdownSelectElement).toBeInTheDocument();

    // Проверяем, что значения отображаются
    Object.values(WorkoutDuration).forEach((duration) => {
      expect(screen.getByText(duration)).toBeInTheDocument();
    });

    // Симулируем клик по кнопке
    fireEvent.click(screen.getByLabelText('Выберите одну из опций'));

    // Проверяем, что функция onToggleDropdown была вызвана
    expect(onToggleDropdownMock).toHaveBeenCalled();

    // Симулируем выбор значения
    fireEvent.click(screen.getByText(WorkoutDuration.ExtraLong));

    // Проверяем, что функция onValueChange была вызвана
    expect(onValueChangeMock).toHaveBeenCalled();
  });

  it('renders DropdownSelect component with correct values and calls functions on interaction - TrainingLevel', () => {
    render(
      <DropdownSelect
        classType="training-level-select"
        label="Уровень тренировки"
        selectedValue="Выберите уровень"
        error=""
        object={Object.values(TrainingLevel)}
        onValueChange={onValueChangeMock}
        onToggleDropdown={onToggleDropdownMock}
      />
    );

    const dropdownSelectElement = screen.getByTestId('training-level-select');
    expect(dropdownSelectElement).toBeInTheDocument();

    Object.values(TrainingLevel).forEach((level) => {
      expect(screen.getByText(level)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByLabelText('Выберите одну из опций'));
    expect(onToggleDropdownMock).toHaveBeenCalled();

    fireEvent.click(screen.getByText(TrainingLevel.Amateur));
    expect(onValueChangeMock).toHaveBeenCalled();
  });

  it('renders DropdownSelect component with correct values and calls functions on interaction - locations', () => {
    render(
      <DropdownSelect
        classType="location-select"
        label="Место тренировки"
        selectedValue="Выберите место"
        error=""
        object={Object.values(Location)}
        onValueChange={onValueChangeMock}
        onToggleDropdown={onToggleDropdownMock}
      />
    );

    const dropdownSelectElement = screen.getByTestId('location-select');
    expect(dropdownSelectElement).toBeInTheDocument();

    Object.values(Location).forEach((location) => {
      expect(screen.getByText(location)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByLabelText('Выберите одну из опций'));
    expect(onToggleDropdownMock).toHaveBeenCalled();

    fireEvent.click(screen.getByText(Location.Petrograd));
    expect(onValueChangeMock).toHaveBeenCalled();
  });

  it('renders DropdownSelect component with correct values and calls functions on interaction - genders', () => {
    render(
      <DropdownSelect
        classType="gender-select"
        label="Пол"
        selectedValue="Выберите пол"
        error=""
        object={Object.values(Gender)}
        onValueChange={onValueChangeMock}
        onToggleDropdown={onToggleDropdownMock}
      />
    );

    const dropdownSelectElement = screen.getByTestId('gender-select');
    expect(dropdownSelectElement).toBeInTheDocument();

    Object.values(Gender).forEach((gender) => {
      expect(screen.getByText(gender)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByLabelText('Выберите одну из опций'));
    expect(onToggleDropdownMock).toHaveBeenCalled();

    fireEvent.click(screen.getByText(Gender.Female));
    expect(onValueChangeMock).toHaveBeenCalled();
  });
});
