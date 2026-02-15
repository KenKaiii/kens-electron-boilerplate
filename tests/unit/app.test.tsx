import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import App from '../../src/renderer/App';

describe('App', () => {
  beforeEach(() => {
    cleanup();
    render(<App />);
  });

  it('renders the app title', () => {
    expect(screen.getByText('Electron Boilerplate')).toBeInTheDocument();
  });

  it('renders the subtitle', () => {
    expect(screen.getByText('Ready to build something amazing')).toBeInTheDocument();
  });

  it('displays version info from electronAPI', () => {
    expect(screen.getByText('33.0.0')).toBeInTheDocument();
    expect(screen.getByText('20.0.0')).toBeInTheDocument();
    expect(screen.getByText('130.0.0')).toBeInTheDocument();
  });

  it('renders tech stack badges', () => {
    const badges = screen.getAllByText(/^(Electron|React|TypeScript|Vite)$/);
    expect(badges.length).toBeGreaterThanOrEqual(4);
  });
});
