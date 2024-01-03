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

    // Проверяем, что компонент отрисован
    const coachAdditionalInfoElement = screen.getByTestId('coach-additional-info');
    expect(coachAdditionalInfoElement).toBeInTheDocument();

    // Проверяем, что заголовок "Дипломы и сертификаты" отображается
    const labelElement = screen.getByText('Дипломы и сертификаты');
    expect(labelElement).toBeInTheDocument();

    // Проверяем, что кнопка "Загрузить" отображается
    const uploadButtonElement = screen.getByText('Загрузить');
    expect(uploadButtonElement).toBeInTheDocument();

    // Проверяем, что компонент CertificateList отрисован
    const certificateListElement = screen.getByTestId('certificate-list');
    expect(certificateListElement).toBeInTheDocument();
  });
});
