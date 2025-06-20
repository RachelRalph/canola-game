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

  mainWindow.loadFile("public/index.html");
}

app.whenReady().then(createWindow);

ipcMain.on('print-content', (event, {flower, roots, height, pods, name}) => {
  const printWindow = new BrowserWindow({ show: true});
  printWindow.loadURL(`http://localhost:3000/#/postcard?colour=${flower}&roots=${roots}&pods=${pods}&height=${height}&name=${name}`);
  console.log(`http://localhost:3000/#/postcard?colour=${flower}&roots=${roots}&pods=${pods}&height=${height}&name=${name}`);

  printWindow.webContents.on('did-finish-load', () => {
    printWindow.webContents.print({ silent: false, printBackground: true }, (success, errorType) => {
      if (!success) console.error(errorType);
      printWindow.close();
    });
  });
});
