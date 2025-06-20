const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  printContent: ({flower, roots, height, pods}) => ipcRenderer.send('print-content', {flower, roots, height, pods, name})
});