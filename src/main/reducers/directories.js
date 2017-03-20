import {handleActions} from 'redux-actions';
import {ADD_DIRECTORY, REMOVE_DIRECTORY} from '../../common/actions/directories';
import {wrapHandler} from '../../common/immutable';
import {Map, Set} from 'immutable';

export default handleActions({
    ADD_DIRECTORY: (state, {payload}) => {
        return payload.reduce((state, dir) => state.set(dir.id, {
            ...dir,
            children: Set()
        }).update(dir.parent, {
            id: dir.parent,
            children: Set()
        }, parent => {
            return {
                ...parent,
                children: parent.children.add(dir.id)
            };
        }), state);
    },

    REMOVE_DIRECTORY: (state, {payload}) => {
        const dir = state.get(payload);
        if (!dir) {
            return state;
        }
        const scan = dir.children.toJS() || [];
        const to_remove = [payload];

        while (scan.length > 0) {
            const child = state.get(scan.pop());

            if (child) {
                to_remove.push(child.id);

                if (child.children) {
                    scan.push(...child.children.toJS());
                }
            }
        }

        return state.update(dir.parent, parent => {
            return {
                ...parent,
                children: parent.children.delete(payload)
            };
        }).deleteAll(to_remove);
    }
}, Map());
