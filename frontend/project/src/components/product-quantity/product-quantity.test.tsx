import { render, screen } from '@testing-library/react';
import ProductQuantity from './product-quantity';

describe('ProductQuantity', () => {
  it('renders with initial quantity', () => {
    const selectedQuantity = 3;
    const onQuantityChangeMock = jest.fn();

    render(
      <ProductQuantity
        selectedQuantity={selectedQuantity}
        onQuantityChange={onQuantityChangeMock}
      />
    );

    expect(screen.getByLabelText('minus')).toBeInTheDocument();
    expect(screen.getByLabelText('plus')).toBeInTheDocument();
    expect(screen.getByDisplayValue('3')).toBeInTheDocument();
  });
});
