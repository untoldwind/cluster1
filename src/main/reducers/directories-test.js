import directories from './directories';
import {addDirectory, removeDirectory} from '../../common/actions/directories';
import {createStore} from 'redux';
import {Map, List} from 'immutable';

describe('directories reducers', () => {
    it('should add directories to state', () => {
        const store = createStore(directories, Map());

        store.dispatch(addDirectory('a', '_root_', 'root', '/'));
        store.dispatch(addDirectory('b', 'a', 'bla', '/bla'));

        const actual = store.getState();
        expect(actual.get('_root_')).toEqual({id: '_root_', children: List(['a'])});
        expect(actual.get('a')).toEqual({id: 'a', parent: '_root_', name: 'root', filename: '/', children: List(['b'])});
        expect(actual.get('b')).toEqual({id: 'b', parent: 'a', name: 'bla', filename: '/bla', children: List()});
    });

    it('should remove directories from state', () => {
        const store = createStore(directories, Map({
            '_root_': {
                id: '_root_',
                children: List(['a'])
            },
            'a': {
                id: 'a',
                parent: '_root_',
                name: 'root',
                filename: '/',
                children: List(['b'])
            },
            'b': {
                id: 'b',
                parent: 'a',
                name: 'bla',
                filename: '/bla',
                children: List(['c'])
            },
            'c': {
                id: 'c',
                parent: 'b',
                name: 'blub',
                filename: '/blub',
                children: List([])
            }
        }));

        store.dispatch(removeDirectory('a'));

        const actual = store.getState();
        expect(actual).toEqual(Map({
            '_root_': {
                id: '_root_',
                children: List()
            }
        }));
    });
});
