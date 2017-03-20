import directories from './directories';
import {addDirectory, removeDirectory} from '../../common/actions/directories';
import {createStore} from 'redux';
import {Map, Set} from 'immutable';

describe('directories reducers', () => {
    it('should add directories to state', () => {
        const store = createStore(directories, Map());

        store.dispatch(addDirectory('a', '_root_', 'root', '/'));
        store.dispatch(addDirectory('b', 'a', 'bla', '/bla'));

        const actual = store.getState();
        expect(actual.get('_root_')).toEqual({id: '_root_', children: Set(['a'])});
        expect(actual.get('a')).toEqual({id: 'a', parent: '_root_', name: 'root', filename: '/', children: Set(['b'])});
        expect(actual.get('b')).toEqual({id: 'b', parent: 'a', name: 'bla', filename: '/bla', children: Set()});
    });

    it('should remove directories from state', () => {
        const store = createStore(directories, Map({
            '_root_': {
                id: '_root_',
                children: Set(['a'])
            },
            'a': {
                id: 'a',
                parent: '_root_',
                name: 'root',
                filename: '/',
                children: Set(['b'])
            },
            'b': {
                id: 'b',
                parent: 'a',
                name: 'bla',
                filename: '/bla',
                children: Set(['c'])
            },
            'c': {
                id: 'c',
                parent: 'b',
                name: 'blub',
                filename: '/blub',
                children: Set()
            }
        }));

        store.dispatch(removeDirectory('a'));

        const actual = store.getState();
        expect(actual).toEqual(Map({
            '_root_': {
                id: '_root_',
                children: Set()
            }
        }));
    });
});
