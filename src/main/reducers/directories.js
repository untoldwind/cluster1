import {handleActions} from 'redux-actions';
import {ADD_DIRECTORY, REMOVE_DIRECTORY,} from '../../common/actions/directories';
import {clone, emptyArr, emptyObj,} from '../../common/immutable';

export default handleActions({
    ADD_DIRECTORY: (oldState, {payload}) => {
        return payload.reduce((state, dir) => state.set(dir.id, {
            ...dir,
            children: emptyArr,
        }).update(dir.parent, {
            id: dir.parent,
            children: emptyArr,
        }, parent => parent.update('children', children => children.add(dir.id).sort())), clone(oldState)).freeze();
    },

    REMOVE_DIRECTORY: (oldState, {payload}) => {
        const state = clone(oldState);
        const dir = state.get(payload);
        if (!dir) {
            return state;
        }
        const scan = dir.children || [];
        const to_remove = [payload];

        while (scan.length > 0) {
            const child = state.get(scan.pop());

            if (child) {
                to_remove.push(child.id);

                if (child.children) {
                    scan.push(...child.children);
                }
            }
        }

        return state
            .update(dir.parent, parent => parent.update('children', children => children.removeItem(dir.id)))
            .remove(...to_remove)
            .freeze();
    },
}, emptyObj);
