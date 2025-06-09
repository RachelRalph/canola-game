const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  printContent: (html) => ipcRenderer.send('print-content', html)
});