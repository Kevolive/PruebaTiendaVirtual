import { render, screen } from '@testing-library/react'
import Products from './Products'

test('renderiza mensaje si no hay productos', () => {
  render(<Products />)
  const title = screen.getByText(/Productos disponibles/i)
  expect(screen.getByText(/Cargando productos/i)).toBeInTheDocument()
})
