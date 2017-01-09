import {ADD_DIRECTORY, REMOVE_DIRECTORY} from '../../common/actions/directories';
import {clone, modify} from '../../common/immutable';

export default function(state = {}, action) {
    switch (action.type) {
        case ADD_DIRECTORY: {
            const {id, parent, name, filename} = action;
            return modify(state, next_state => {
              next_state[id] = {id, parent, name, filename, children: []};
              if (parent) {
                const old_parent = next_state[parent] || {
                    id: parent,
                    children: []
                };
                next_state[parent] = modify(old_parent, next_parent => {
                  next_parent.children = clone(old_parent.children).add(id).freeze();
                });
              }
            });
        }
        case REMOVE_DIRECTORY: {
          const {id} = action;
          return modify(state, next_state => {
            const dir = next_state[id];
            if(!dir) {
              return;
            }

            const old_parent = next_state[dir.parent];
            if(old_parent) {
              next_state[dir.parent] = modify(old_parent, next_parent => {
                next_parent.children = clone(next_parent.children).removeItem(id).freeze();
              });
            }

            const scan = dir.children || [];
            const to_remove = [id];

            while(scan.length > 0) {
                const child = next_state[scan.pop()];

                if(child) {
                  to_remove.push(child.id);
                  if(child.children) {
                    scan.push(...child.children);
                  }
                }
            }
            for(const id of to_remove) {
              delete next_state[id];
            }
          });
        }
        default:
            return state;
    }
}
