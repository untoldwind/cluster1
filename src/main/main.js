import {app, BrowserWindow, Menu, ipcMain} from 'electron';
import url from 'url';
import path from 'path';
import menu from './menu';
import command_handler from './command_handler';

const HOST = `localhost:${process.env.PORT || 19998}`;
const DEV = process.env.NODE_ENV === 'development';

if (DEV) {
    try {
        require('electron-debug')();
    } catch (err) {}
}

let mainWindow;
let store;

/*
let Db = require('tingodb')().Db;

console.log("hurra");
console.log(Db);

var db = new Db('./data', {});
db.collection("batch_document_insert_collection_safe", function(err, collection) {
console.log(collection);
    collection.insert([
        {
            hello: 'world_safe1'
        }, {
            hello: 'world_safe2'
        }
    ], function(err, result) {

        console.log("init");
        // Fetch the document
        collection.findOne({
            hello: 'world_safe2'
        }, function(err, item) {
            console.log(err);
            console.log(item);
        })
    });
});
*/

function createWindow() {
    ipcMain.on('commands', command_handler);
    Menu.setApplicationMenu(menu);

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

if (module.hot) {
  console.log("Iam hot main");
  module.hot.accept('./menu', () => {
    const menu = require('./menu').default;

    Menu.setApplicationMenu(menu);
    console.log('Updated main menu');
  });
  module.hot.accept('./command_handler', () => {
    const command_handler = require('./command_handler').default;
    
    ipcMain.on('commands', command_handler);
  });
  setInterval(() => {
    try {
      module.hot.check(true);
    } catch (err) {
      console.log(`Hot err ${err}`);
    }
  }, 1000);
}
