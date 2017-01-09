import {handleActions} from 'redux-actions';
import {ADD_DIRECTORY, REMOVE_DIRECTORY} from '../../common/actions/directories';
import {wrapHandler} from '../../common/immutable';

export default handleActions({
    ADD_DIRECTORY: wrapHandler((state, {payload}) => {
      for(const dir of payload) {
        state.put(dir.id, {...dir, children: []});
        state.update(dir.parent, parent => {
          parent.update('children', children => children.add(dir.id));
        }, {
            id: dir.parent,
            children: []
        });
      }
    }),

    REMOVE_DIRECTORY: wrapHandler((state, {payload}) => {
        const dir = state.get(payload);
        if (!dir) {
            return;
        }
        state.update(dir.parent, parent => {
          parent.update('children', children => children.removeItem(payload));
        });
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
        state.remove(...to_remove);
    })
}, {});
