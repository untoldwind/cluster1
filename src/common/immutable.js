class ObjectBuilder {
    constructor(obj) {
        this.obj = Object.assign({}, obj);
    }

    get(key, defaultValue) {
        return this.obj[key] || defaultValue;
    }

    put(key, value) {
        this.obj[key] = value;
        return this;
    }

    remove(...keys) {
        for (const key of keys) {
            delete this.obj[key];
        }
        return this;
    }

    update(key, updater, defaultValue) {
        const old = this.obj[key] || defaultValue
        if (old) {
            const builder = clone(old);
            updater(builder);
            this.obj[key] = builder.freeze();
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

    freeze() {
        return Object.freeze(this.arr);
    }
}

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
