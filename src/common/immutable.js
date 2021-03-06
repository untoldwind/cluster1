class ObjectBuilder {
    constructor(obj) {
        this.obj = Object.assign({}, obj);
    }

    get(key, defaultValue) {
        return this.obj[key] || defaultValue;
    }

    set(key, value) {
        this.obj[key] = value;
        return this;
    }

    remove(...keys) {
        for (const key of keys) {
            delete this.obj[key];
        }
        return this;
    }

    update(key, defaultValue, updater) {
        if (typeof defaultValue === 'function') {
            updater = defaultValue;
            defaultValue = undefined;
        }
        const old = this.obj[key] || defaultValue;
        if (old) {
            const builder = clone(old);
            this.obj[key] = updater(builder).freeze();
        }
        return this;
    }

    freeze() {
        return Object.freeze(this.obj);
    }
}

class ArrayBuilder {
    constructor(arr) {
        this.arr = [].concat(arr);
    }

    add(value) {
        this.arr.push(value);
        return this;
    }

    remove(i) {
        this.arr.splice(i, 1);
        return this;
    }

    removeItem(item) {
        const idx = this.arr.indexOf(item);
        if (idx >= 0) {
            this.arr.splice(idx, 1);
        }
        return this;
    }

    sort(compare) {
        this.arr.sort(compare);
        return this;
    }

    freeze() {
        return Object.freeze(this.arr);
    }
}

export const emptyObj = Object.freeze({});

export const emptyArr = Object.freeze([]);

export function clone(obj) {
    if (Array.isArray(obj)) {
        return new ArrayBuilder(obj);
    }
    return new ObjectBuilder(obj || {});
}

export function wrapHandler(actionHandler) {
    return (state, action) => {
        const builder = clone(state);
        actionHandler(builder, action);
        return builder.freeze();
    }
}
