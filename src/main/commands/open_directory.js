import {addDirectories} from '../../common/actions/directories';
import {scanDir} from '../utils/dir';
import {dialog} from 'electron';
import store from '../store';

export default function() {
  console.log("Doit");
  const selected = dialog.showOpenDialog({properties: ['openDirectory']});
  console.log(selected);

  if(!selected) {
    return;
  }

  const action = addDirectories(scanDir(selected[0]));
  store.dispatch(action);
}
