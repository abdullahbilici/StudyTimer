const { app, BrowserWindow, ipcMain } = require('electron');
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 400,
    height: 300,
    resizable: false,
    frame:false,
    icon: path.join(__dirname, "assets/icon.jpeg"),
    maximizable: false,  // Disable maximize button
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadFile('index.html');

  // Listen for the close-window message
  ipcMain.on('close-window', () => {
    win.close();
  });

  // Listen for the minimize-window message
  ipcMain.on('minimize-window', () => {
    win.minimize();
  });

}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
