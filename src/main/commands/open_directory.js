import {dialog} from 'electron';

export default () => {
  console.log("Doit");
  const dir = dialog.showOpenDialog({properties: ['openDirectory']});
  console.log(dir);

};
