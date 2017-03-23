import directories from './directories';
import {addDirectory, removeDirectory} from '../../common/actions/directories';
import {createStore} from 'redux';

describe('directories reducers', () => {
    it('should add directories to state', () => {
        const store = createStore(directories, {});

        store.dispatch(addDirectory('a', '_root_', 'root', '/'));
        store.dispatch(addDirectory('b', 'a', 'bla', '/bla'));

        const actual = store.getState();
        expect(actual['_root_']).toEqual({id: '_root_', children: ['a']});
        expect(actual['a']).toEqual({id: 'a', parent: '_root_', name: 'root', filename: '/', children: ['b']});
        expect(actual['b']).toEqual({id: 'b', parent: 'a', name: 'bla', filename: '/bla', children: []});
    });

    it('should remove directories from state', () => {
        const store = createStore(directories, {
            '_root_': {
                id: '_root_',
                children: ['a']
            },
            'a': {
                id: 'a',
                parent: '_root_',
                name: 'root',
                filename: '/',
                children: ['b']
            },
            'b': {
                id: 'b',
                parent: 'a',
                name: 'bla',
                filename: '/bla',
                children: ['c']
            },
            'c': {
                id: 'c',
                parent: 'b',
                name: 'blub',
                filename: '/blub',
                children: []
            }
        });

        store.dispatch(removeDirectory('a'));

        const actual = store.getState();
        expect(actual).toEqual({
            '_root_': {
                id: '_root_',
                children: []
            }
        });
    });
});
