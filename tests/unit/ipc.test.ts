// @vitest-environment node
import { describe, it, expect, vi, beforeEach } from 'vitest';

const mocks = vi.hoisted(() => ({
  handle: vi.fn(),
  getVersion: vi.fn(() => '1.0.0'),
}));

vi.mock('electron', () => ({
  ipcMain: { handle: mocks.handle },
  app: { getVersion: mocks.getVersion },
}));

import { registerIpcHandlers } from '../../src/main/ipc';

describe('IPC Handlers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('registers get-app-version handler', () => {
    registerIpcHandlers();
    expect(mocks.handle).toHaveBeenCalledWith('get-app-version', expect.any(Function));
  });

  it('registers get-platform handler', () => {
    registerIpcHandlers();
    expect(mocks.handle).toHaveBeenCalledWith('get-platform', expect.any(Function));
  });

  it('registers exactly 2 handlers', () => {
    registerIpcHandlers();
    expect(mocks.handle).toHaveBeenCalledTimes(2);
  });

  it('get-app-version handler returns app version', () => {
    registerIpcHandlers();
    const handler = mocks.handle.mock.calls.find(
      (call: unknown[]) => call[0] === 'get-app-version',
    )?.[1] as () => string;
    expect(handler()).toBe('1.0.0');
  });

  it('get-app-version handler calls app.getVersion()', () => {
    registerIpcHandlers();
    const handler = mocks.handle.mock.calls.find(
      (call: unknown[]) => call[0] === 'get-app-version',
    )?.[1] as () => string;
    handler();
    expect(mocks.getVersion).toHaveBeenCalled();
  });

  it('get-platform handler returns process.platform', () => {
    registerIpcHandlers();
    const handler = mocks.handle.mock.calls.find(
      (call: unknown[]) => call[0] === 'get-platform',
    )?.[1] as () => string;
    expect(handler()).toBe(process.platform);
  });
});
