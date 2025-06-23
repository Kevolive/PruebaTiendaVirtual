// src/components/Checkout.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Checkout from './Checkout';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import { vi } from 'vitest';

// Mock de navigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock de axios
vi.mock('axios');

beforeEach(() => {
  vi.clearAllMocks();
  localStorage.clear(); // ✅ Limpia el localStorage antes de cada test
});

test('envía el formulario correctamente y navega a la página de resultado', async () => {
  // Simula respuesta de axios
  (axios.post as jest.Mock).mockResolvedValueOnce({
    data: {
      transactionId: '12345',
      status: 'APPROVED',
    },
  });

  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<Checkout />} />
        <Route path="/result" element={<div>Result Page</div>} />
      </Routes>
    </MemoryRouter>
  );

  // Completa el formulario
  fireEvent.change(screen.getByPlaceholderText('Nombre'), {
    target: { value: 'John Doe' },
  });
  fireEvent.change(screen.getByPlaceholderText('Correo electrónico'), {
    target: { value: 'john@example.com' },
  });
  fireEvent.change(screen.getByPlaceholderText('Dirección de envío'), {
    target: { value: 'Calle 123' },
  });
  fireEvent.change(screen.getByPlaceholderText('Número de la tarjeta'), {
    target: { value: '4111111111111111' },
  });
  fireEvent.change(screen.getByPlaceholderText('CVC'), {
    target: { value: '123' },
  });
  fireEvent.change(screen.getByPlaceholderText('Fecha de vencimiento'), {
    target: { value: '2025-12-31' },
  });

  // Envía el formulario
  fireEvent.click(screen.getByRole('button', { name: /pagar/i }));

  // Espera la navegación y el localStorage
  await waitFor(() => {
    const data = localStorage.getItem('lastTransaction');
    expect(data).toBeTruthy();
    expect(mockNavigate).toHaveBeenCalledWith('/result?status=APPROVED');
  });
});
