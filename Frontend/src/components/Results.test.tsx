import { render, screen,  } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi, test, describe, expect, beforeEach } from 'vitest';
import Results from './Results';

// Mock de useNavigate
const mockNavigate = vi.fn();

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Results', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    localStorage.clear();
  });

  test('muestra mensaje de éxito si la transacción fue aprobada', () => {
    render(
      <MemoryRouter initialEntries={['/results?status=APPROVED']}>
        <Routes>
          <Route path="/results" element={<Results />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText(/¡Pago aprobado!/i)).toBeInTheDocument();
  });

  test('redirige al inicio después de 5 segundos', async () => {
  vi.useFakeTimers();
  
  render(
    <MemoryRouter initialEntries={['/results?status=APPROVED']}>
      <Routes>
        <Route path="/results" element={<Results />} />
      </Routes>
    </MemoryRouter>
  );
  
  // Avanzamos los timers falsos inmediatamente
  vi.advanceTimersByTime(5000);
  
  // Verificamos la navegación sin esperar
  expect(mockNavigate).toHaveBeenCalledWith('/');
  
  vi.useRealTimers();
});
});