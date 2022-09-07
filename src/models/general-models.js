export class GeneralModels {
    fixedLengthQueue = [];
    fixedLength = 9;


    setFixedLength(length) {
        this.fixedLength = length;
    }

    addItemAndVaryArraySize(item) {
        this.fixedLengthQueue.push(item);
    }

    addItemToFixedArraySize(item) {
        this.fixedLengthQueue.push(item);
        this, this.fixedLengthQueue.shift();
    }

}

export class NameValuePair {
    name: string;
    value: string;

    constructor(name: string, value: string) {
        this.name = name;
        this.value = value;
    }
}