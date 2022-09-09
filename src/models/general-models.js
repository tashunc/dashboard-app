import {fixedGraphSize} from "./constants";

export class GeneralModels {
    fixedLengthKeyArrayQueue = [];
    fixedLengthValueArrayQueue = [];
    fixedLength = fixedGraphSize;


    addDataToArray(item: NameValuePair) {
        if (this.fixedLengthKeyArrayQueue.length >= this.fixedLength) {
            this.addItemToFixedArraySize(item)
        } else {
            this.addItemAndVaryArraySize(item)
        }
    }

    addItemAndVaryArraySize(item: NameValuePair) {
        if (!this.fixedLengthKeyArrayQueue.includes(item.key)) {
            this.fixedLengthKeyArrayQueue.push(item.key);
            this.fixedLengthValueArrayQueue.push(item.value);
        }
    }

    addItemToFixedArraySize(item: NameValuePair) {

        if (!this.fixedLengthKeyArrayQueue.includes(item.key)) {
            this.fixedLengthKeyArrayQueue.push(item.key);
            this.fixedLengthValueArrayQueue.push(item.value);
            if (this.fixedLengthKeyArrayQueue.length > this.fixedLength) {
                this.fixedLengthKeyArrayQueue.shift();
                this.fixedLengthValueArrayQueue.shift();
            }
        }
    }

}

export class NameValuePair {
    key: string;
    value: string;

    constructor(name: string, value: string) {
        this.key = name;
        this.value = value;
    }
}