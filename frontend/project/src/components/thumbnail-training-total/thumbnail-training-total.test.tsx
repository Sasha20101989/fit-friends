
import { render, screen } from '@testing-library/react';
import ThumbnailTrainingTotal from './thumbnail-training-total';

describe('ThumbnailTrainingTotal', () => {
  it('renders the ThumbnailTrainingTotal component with correct values', () => {
    const testProps = {
      purchasedQuantity: 10,
      totalSalesAmount: 5000,
    };

    render(<ThumbnailTrainingTotal {...testProps} />);

    const purchasedQuantityElement = screen.getByText(`${testProps.purchasedQuantity}`);
    const totalSalesAmountElement = screen.getByText(`${testProps.totalSalesAmount}`);

    expect(purchasedQuantityElement).toBeInTheDocument();
    expect(totalSalesAmountElement).toBeInTheDocument();
  });
});
