import { app, shell, BrowserWindow, ipcMain, screen } from 'electron'
import { join, resolve } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/cloud-logo.png?asset'
import { execSync } from 'child_process'
import { session } from 'electron'
import fs from 'fs'

//关闭安全警告
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

const winUrl = process.env.NODE_ENV === 'development' ? `http://localhost:5173` : ''
function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1050,
    height: 650,
    minHeight: 650,
    minWidth: 1050,
    frame: false,
    show: false,
    resizable: false,
    icon,
    // autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })
  //最大化
  ipcMain.on('MaxScreen', () => {
    const win = BrowserWindow.getFocusedWindow()
    if (win) {
      if (win.isMaximized()) {
        win.unmaximize()
      } else {
        win.maximize()
      }
    }
  })
  //最小化
  ipcMain.on('MinScreen', () => {
    const win = BrowserWindow.getFocusedWindow()
    if (win) {
      win.minimize()
    }
  })
  //关闭
  ipcMain.on('CloseScreen', () => {
    app.exit()
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })
  ipcMain.on('ScreenResize', (event) => {
    event.reply('isMaxScreen', BrowserWindow.getFocusedWindow()?.isMaximized())
    // console.log(BrowserWindow.getFocusedWindow()?.isMaximized());
  })
  ipcMain.on('win-start', (e) => {
    const winposition = mainWindow.getPosition()
    const cursorPosition = screen.getCursorScreenPoint()
    console.log(winposition)
    const x = cursorPosition.x - winposition[0]
    const y = cursorPosition.y - winposition[1]
    e.returnValue = JSON.stringify({ x, y })
  })
  ipcMain.on('win-move', (_, params) => {
    const param = JSON.parse(params)
    console.log(param, 'param')

    mainWindow.setPosition(param.x, param.y, true)
    mainWindow.setSize(1050, 650, true)
  })
  ipcMain.on('login', () => {
    //调用 BrowserWindow打开新窗口
    const win2 = new BrowserWindow({
      width: 300,
      height: 500,
      parent: mainWindow,
      resizable: false,
      frame: false,
      icon,
      webPreferences: {
        // nodeIntegration: true,
        // contextIsolation: false,
        preload: join(__dirname, '../preload/index.js'),
        sandbox: false
      }
    })
    //test页面路由
    win2.loadURL(winUrl + '/#/login/QRcodeLogin')
    win2.on('ready-to-show', () => {
      win2.show()
    })
    ipcMain.on('closeLogin', () => {
      win2.destroy()
    })
    ipcMain.on('toWebLogin', (e, url) => {
      e.preventDefault()
      execSync(`start ${url}`)
    })
    // win2.webContents.openDevTools()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')
  //引入devtools
  if (
    process.env.NODE_ENV === 'development' &&
    fs.existsSync(resolve(__dirname, '../../devtools/6.5.1_0'))
  ) {
    await session.defaultSession.loadExtension(resolve(__dirname, '../../devtools/6.5.1_0'))
  }
  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
