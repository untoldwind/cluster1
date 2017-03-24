import store from '../store';
import {imageFiles} from '../utils/dir';
import {setCurrentDirectory} from '../../common/actions/current_directory';

export default function(directoryId) {
    const directories = store.getState().directories;
    const directory = directories[directoryId];

    if (directory) {
        imageFiles(directory.filename).then(files => {
            const action = setCurrentDirectory(directoryId, files);
            store.dispatch(action);
        }, err => console.log(err));
    } else {
        console.log(`state does not have ${directoryId}`);
    }
}
