class ObjectBuilder {
    constructor(obj) {
        this.obj = Object.assign({}, obj);
    }

    put(key, value) {
        this.obj[key] = value;
        return this;
    }

    remove(key) {
        delete this.obj[key];
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

export function modify(obj, mutator) {
    const mutable = Array.isArray(obj)
        ? [].concat(obj)
        : Object.assign({}, obj);

    mutator(mutable);
    return Object.freeze(mutable);
}
