import { render, screen } from '@testing-library/react';
import Transactions from './Transactions';
import { vi } from 'vitest';
import axios from 'axios';

// Mock de axios
vi.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Transactions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renderiza mensaje si no hay transacciones', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: [] });

    render(<Transactions />);

    expect(await screen.findByText(/no hay transacciones registradas/i)).toBeInTheDocument();
  });

  it('muestra lista de transacciones si hay datos', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: [
        {
          id: 1,
          customerName: 'Kevin',
          amount: 45000,
          status: 'APPROVED',
          createdAt: new Date().toISOString(),
          product: { name: 'Camisa Goku', price: '45000' },
        },
      ],
    });

    render(<Transactions />);

    expect(await screen.findByText(/Kevin/i)).toBeInTheDocument();
    expect(await screen.findByText(/Camisa Goku/i)).toBeInTheDocument();
    expect(await screen.findByText(/45000/i)).toBeInTheDocument();
    expect(await screen.findByText(/APPROVED/i)).toBeInTheDocument();
  });
});
