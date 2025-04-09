const { contextBridge, ipcRenderer } = require('electron');
console.log("preload loaded");
contextBridge.exposeInMainWorld('electronAPI', {
  sendToMain: (msg) => ipcRenderer.send('message_to_main', msg),
  onFromChild: (callback) => ipcRenderer.on('message_from_child', (event, data) => callback(data)),
  onReset: (callback) => ipcRenderer.on('reset_counter', callback)
});
