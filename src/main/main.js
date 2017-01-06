import {app, BrowserWindow} from 'electron';
import url from 'url';
import path from 'path';

const HOST = `localhost:${process.env.PORT || 19998}`;
const DEV = process.env.NODE_ENV === 'development';

if (DEV) {
    try {
        require('electron-debug')();
    } catch (err) {}
}

let mainWindow;
let store;

function createWindow() {
    mainWindow = new BrowserWindow({width: 1200, height: 900});
    if (DEV) {
        mainWindow.loadURL(`http://${HOST}/`);
        mainWindow.toggleDevTools();
    } else {
        mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'index.html'),
            protocol: 'file:',
            slashes: true
        }));
    }
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('ready', () => {
  if (DEV) {
    const installer = require('electron-devtools-installer');
    const {REDUX_DEVTOOLS} = installer;

    installer.default(REDUX_DEVTOOLS).then((name) => console.log(`Added Extension:  ${name}`)).catch((err) => console.log('An error occurred: ', err));
  }
  store = require('./store');

  createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform != 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
});
