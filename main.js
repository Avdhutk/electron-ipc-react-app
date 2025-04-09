const {
    app,
    BrowserWindow,
    ipcMain,
    dialog
} = require('electron')
const path = require('path');
const {
    fork
} = require('child_process');

let childProcess;
const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
          preload: path.join(__dirname, 'preload.js'),
          contextIsolation: true,
          nodeIntegration: false
        }
      })

    win.loadURL("http://localhost:5173/");
    childProcess = fork(path.join(__dirname, 'child.js'));

    ipcMain.on('message_to_main', async (event, count)=> {
        console.log("received count",count)
        if (count%5 === 0) {
            const result = await dialog.showMessageBox({
                type: 'info',
                title: 'Milestone',
                message: `You clicked ${count} times`,
                buttons: ['OK', 'Reset'],
                cancelId: 1,
                defaultId: 0
            });
            if (result.response === 1) {
                win.webContents.send('reset_counter');
            }
        }
        childProcess.send(count);
    })

    childProcess.on('message', (data) => {
        console.log("Child sent message: ", data);
        win.webContents.send('message_from_child', data)
    })
}

app.whenReady().then(() => {
    createWindow()
})