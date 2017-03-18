import {Menu} from 'electron';
import {openDirectory} from './commands';

export default Menu.buildFromTemplate([
    {
        label: "File",
        submenu: [
            {
                label: 'Open directory',
                click: openDirectory
            }, {
                type: 'separator'
            }, {
                role: 'close'
            }
        ]
    }, {
        label: 'View',
        submenu: [
            {
                role: 'reload'
            }, {
                role: 'forcereload'
            }, {
                role: 'toggledevtools'
            }, {
                type: 'separator'
            }, {
                role: 'resetzoom'
            }, {
                role: 'zoomin'
            }, {
                role: 'zoomout'
            }, {
                type: 'separator'
            }, {
                role: 'togglefullscreen'
            }
        ]
    }
]);
