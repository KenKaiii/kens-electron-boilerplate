export {};

declare global {
  interface Window {
    electronAPI: {
      getAppVersion: () => Promise<string>;
      getPlatform: () => Promise<string>;
      versions: {
        electron: string;
        node: string;
        chrome: string;
      };
    };
  }
}
