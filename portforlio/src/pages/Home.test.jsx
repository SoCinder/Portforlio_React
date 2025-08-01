import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

// Create a manual mock for useNavigate
const navigateMock = vi.fn();

// Mock the useNavigate function from react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

describe('Home Page', () => {
  beforeEach(() => {
    navigateMock.mockClear();
  });

  it('renders welcome content and button', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByText(/welcome to my portfolio/i)).toBeInTheDocument();
    expect(screen.getByText(/passionate about developing full-stack/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /learn more about me/i })).toBeInTheDocument();
  });

  it('navigates to /about when button is clicked', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const button = screen.getByRole('button', { name: /learn more about me/i });
    fireEvent.click(button);
    expect(navigateMock).toHaveBeenCalledWith('/about');
  });
});
