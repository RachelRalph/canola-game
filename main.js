const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false, // ❌ do not enable this
    },
  });

  mainWindow.loadURL("http://localhost:3000");
}

app.whenReady().then(createWindow);

ipcMain.on('print-content', (event, htmlContent) => {
  const printWindow = new BrowserWindow({ show: true});
  printWindow.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(htmlContent));

  printWindow.webContents.on('did-finish-load', () => {
    printWindow.webContents.print({ silent: true, printBackground: true }, (success, errorType) => {
      if (!success) console.error(errorType);
      printWindow.close();
    });
  });
});
