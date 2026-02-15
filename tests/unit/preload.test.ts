// @vitest-environment node
import { describe, it, expect, vi, beforeEach } from 'vitest';

const mocks = vi.hoisted(() => ({
  exposeInMainWorld: vi.fn(),
  invoke: vi.fn(),
}));

vi.mock('electron', () => ({
  contextBridge: { exposeInMainWorld: mocks.exposeInMainWorld },
  ipcRenderer: { invoke: mocks.invoke },
}));

describe('Preload Script', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
  });

  async function loadPreload() {
    await import('../../src/preload/index');
  }

  function getExposedApi() {
    return mocks.exposeInMainWorld.mock.calls[0][1] as Record<string, unknown>;
  }

  it('exposes electronAPI to the main world', async () => {
    await loadPreload();
    expect(mocks.exposeInMainWorld).toHaveBeenCalledWith('electronAPI', expect.any(Object));
  });

  it('exposes exactly one API namespace', async () => {
    await loadPreload();
    expect(mocks.exposeInMainWorld).toHaveBeenCalledTimes(1);
  });

  it('electronAPI has getAppVersion method', async () => {
    await loadPreload();
    const api = getExposedApi();
    expect(typeof api.getAppVersion).toBe('function');
  });

  it('electronAPI has getPlatform method', async () => {
    await loadPreload();
    const api = getExposedApi();
    expect(typeof api.getPlatform).toBe('function');
  });

  it('electronAPI has versions object with expected keys', async () => {
    await loadPreload();
    const api = getExposedApi();
    const versions = api.versions as Record<string, unknown>;
    expect(versions).toHaveProperty('electron');
    expect(versions).toHaveProperty('node');
    expect(versions).toHaveProperty('chrome');
  });

  it('getAppVersion invokes correct IPC channel', async () => {
    await loadPreload();
    const api = getExposedApi();
    (api.getAppVersion as () => void)();
    expect(mocks.invoke).toHaveBeenCalledWith('get-app-version');
  });

  it('getPlatform invokes correct IPC channel', async () => {
    await loadPreload();
    const api = getExposedApi();
    (api.getPlatform as () => void)();
    expect(mocks.invoke).toHaveBeenCalledWith('get-platform');
  });

  it('versions.node matches current process', async () => {
    await loadPreload();
    const api = getExposedApi();
    const versions = api.versions as Record<string, string>;
    expect(versions.node).toBe(process.versions.node);
  });
});
