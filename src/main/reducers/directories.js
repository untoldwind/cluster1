import {handleActions} from 'redux-actions';
import {ADD_DIRECTORY, REMOVE_DIRECTORY} from '../../common/actions/directories';
import {wrapHandler} from '../../common/immutable';
import {Map, List} from 'immutable';

export default handleActions({
    ADD_DIRECTORY: (state, {payload}) => {
        return payload.reduce((state, dir) => state.set(dir.id, {
            ...dir,
            children: List()
        }).update(dir.parent, {
            id: dir.parent,
            children: List()
        }, parent => {
            return {
                ...parent,
                children: parent.children.push(dir.id)
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
                children: parent.children.delete(parent.children.keyOf(payload))
            };
        }).deleteAll(to_remove);
    }
}, Map());
