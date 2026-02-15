import { ipcMain, app } from 'electron';

export function registerIpcHandlers(): void {
  ipcMain.handle('get-app-version', () => {
    return app.getVersion();
  });

  ipcMain.handle('get-platform', () => {
    return process.platform;
  });
}
