const { app, BrowserWindow, screen } = require('electron')

function createWindow () {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  
  const win = new BrowserWindow({
    width: 42,
    height: 280,
    x: 7, // position at the far left
    y: height / 2 - 150, // position in the vertical center
    frame: false,
    transparent: true,
    resizable: false,
    skipTaskbar: true,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    }
  })
  win.loadFile('index.html')
  win.setAlwaysOnTop(true, 'floating')
  win.setVisibleOnAllWorkspaces(true)

  win.on('minimize', function(event){
    event.preventDefault()
    win.hide()
    win.setSkipTaskbar(false);
  });

  win.on('restore', function(event){
    win.show()
    win.setSize(32, 280);
    win.setPosition(0, height / 2 - 150);
    win.setSkipTaskbar(true);
  });
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})