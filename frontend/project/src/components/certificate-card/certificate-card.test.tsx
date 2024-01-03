import { render, screen, fireEvent } from '@testing-library/react';
import CertificateCard from './certificate-card';

describe('CertificateCard', () => {
  it('renders CertificateCard with editing and saving functionality', () => {
    const certificateImage = 'path/to/certificate.jpg';

    render(<CertificateCard certificate={certificateImage} />);

    // Проверяем, что компонент отрисован
    const certificateCardElement = screen.getByTestId('certificate-card');
    expect(certificateCardElement).toBeInTheDocument();

    // Проверяем, что кнопка "Изменить" отображается
    const editButtonElement = screen.getByTestId('edit-button');
    expect(editButtonElement).toBeInTheDocument();

    // Симулируем клик по кнопке "Изменить"
    fireEvent.click(editButtonElement);

    // Проверяем, что кнопка "Сохранить" появляется после клика
    const saveButtonElement = screen.getByTestId('save-button');
    expect(saveButtonElement).toBeInTheDocument();

    // Симулируем клик по кнопке "Сохранить"
    fireEvent.click(saveButtonElement);

    // Проверяем, что кнопка "Сохранить" исчезает после сохранения
    expect(saveButtonElement).not.toBeInTheDocument();
  });
});
