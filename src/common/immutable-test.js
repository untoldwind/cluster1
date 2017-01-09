import {clone} from './immutable';

describe('immutable', () => {
    it('should safely add items to an object', () => {
        const initial = {
            thing: 'some',
            no: 'thing'
        };
        const actual = clone(initial).put('thing', 'no').put('some', 'thing').freeze();
        expect(initial.thing).toBe('some');
        expect(initial.no).toBe('thing');
        expect(initial.some).toBeUndefined();
        expect(actual.thing).toBe('no');
        expect(actual.no).toBe('thing');
        expect(actual.some).toBe('thing');
        expect(Object.isFrozen(actual)).toBeTruthy();
    });

    it('should safely remove items from an object', () => {
        const initial = {
            thing: 'some',
            no: 'thing'
        };
        const actual = clone(initial).remove('no').freeze();
        expect(initial.thing).toBe('some');
        expect(initial.no).toBe('thing');
        expect(actual.thing).toBe('some');
        expect(actual.no).toBeUndefined();
        expect(Object.isFrozen(actual)).toBeTruthy();
    });

    it('should safely add items to an array', () => {
        const initial = ['no', 'thing'];
        const actual = clone(initial).add('some').freeze();
        expect(initial).toEqual(['no', 'thing']);
        expect(actual).toEqual(['no', 'thing', 'some']);
        expect(Object.isFrozen(actual)).toBeTruthy();
    });

    it('should safely remove items from an array', () => {
      const initial = ['no', 'thing', 'some'];
      const actual = clone(initial).removeItem('thing').freeze();
      expect(initial).toEqual(['no', 'thing', 'some']);
      expect(actual).toEqual(['no', 'some']);
      expect(Object.isFrozen(actual)).toBeTruthy();

    });
});
