import { render, screen } from '@testing-library/react';
import CoachAdditionalInfo from './coach-additional-info';

describe('CoachAdditionalInfo', () => {
  it('renders CoachAdditionalInfo component with correct controls and certificates', () => {
    const certificates = ['path/to/certificate1.jpg', 'path/to/certificate2.jpg'];
    const isPreviousButtonDisabled = false;
    const isNextButtonDisabled = false;
    const onPreviousClick = jest.fn();
    const onNextClick = jest.fn();

    render(
      <CoachAdditionalInfo
        certificates={certificates}
        isPreviousButtonDisabled={isPreviousButtonDisabled}
        isNextButtonDisabled={isNextButtonDisabled}
        onPreviousClick={onPreviousClick}
        onNextClick={onNextClick}
      />
    );

    const coachAdditionalInfoElement = screen.getByTestId('coach-additional-info');
    expect(coachAdditionalInfoElement).toBeInTheDocument();

    const labelElement = screen.getByText('Дипломы и сертификаты');
    expect(labelElement).toBeInTheDocument();

    const uploadButtonElement = screen.getByText('Загрузить');
    expect(uploadButtonElement).toBeInTheDocument();

    const certificateListElement = screen.getByTestId('certificate-list');
    expect(certificateListElement).toBeInTheDocument();
  });
});
