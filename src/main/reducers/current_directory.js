import {handleActions} from 'redux-actions';
import {clone} from '../../common/immutable';

export default handleActions({
    SET_CURRENT_DIRECTORY: (oldState, {payload}) => {
        return clone(oldState)
            .set('directoryId', payload.directoryId)
            .set('files', clone(payload.files).freeze())
            .freeze();
    }
}, {});
