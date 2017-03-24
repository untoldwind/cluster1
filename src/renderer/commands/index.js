import {ipcRenderer} from 'electron';

export function selectDirectory(directoryId) {
  ipcRenderer.send('commands', {
    command: 'selectDirectory',
    args: [directoryId]
  });
}
