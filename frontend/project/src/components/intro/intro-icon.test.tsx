import { render, screen } from '@testing-library/react';
import IntroIcon from './intro-icon';


describe('IntroIcon', () => {
  it('renders IntroIcon component', () => {
    render(<IntroIcon />);

    const introIconElement = screen.getByTestId('intro-icon');
    expect(introIconElement).toBeInTheDocument();
  });
});
