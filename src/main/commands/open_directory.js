import {createAction} from 'redux-actions';
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

  const action = scanDir(selected[0]).then(dirs => {
    return {
      type: "ADD_DIRECTORY",
      payload: dirs
    };
  });
  store.dispatch(action);
}
