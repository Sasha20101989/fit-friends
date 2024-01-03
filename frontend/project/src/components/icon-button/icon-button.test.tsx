import { render, screen, fireEvent } from '@testing-library/react';
import IconButton from './icon-button';

describe('IconButton', () => {
  it('renders IconButton component with correct attributes and calls onClick when clicked', () => {
    const sourceName = 'test-icon-button';
    const direction = 'left';
    const onClick = jest.fn();
    const ariaLabel = 'Test Button';
    const width = 20;
    const height = 20;
    const disabled = false;

    render(
      <IconButton
        sourceName={sourceName}
        direction={direction}
        onClick={onClick}
        ariaLabel={ariaLabel}
        width={width}
        height={height}
        disabled={disabled}
      />
    );

    // Проверяем, что компонент отрисован
    const iconButtonElement = screen.getByTestId('test-icon-button');
    expect(iconButtonElement).toBeInTheDocument();

    // Проверяем атрибуты кнопки
    expect(iconButtonElement).toHaveAttribute('name', 'arrow-left');
    expect(iconButtonElement).toHaveAttribute('aria-label', 'Test Button');

    // Проверяем, что иконка отрисована
    const svgElement = screen.getByRole('button');
    expect(svgElement).toBeInTheDocument();

    // Симулируем клик по кнопке и проверяем, что функция обратного вызова была вызвана
    fireEvent.click(iconButtonElement);
    expect(onClick).toHaveBeenCalled();
  });
});
