import '@testing-library/jest-dom/vitest';

// Mock electronAPI for renderer tests
Object.defineProperty(window, 'electronAPI', {
  value: {
    getAppVersion: () => Promise.resolve('1.0.0'),
    getPlatform: () => Promise.resolve('test'),
    versions: {
      electron: '33.0.0',
      node: '20.0.0',
      chrome: '130.0.0',
    },
  },
  writable: true,
});
