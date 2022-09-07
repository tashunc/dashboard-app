export class GeneralModels {
    fixedLengthKeyArrayQueue = [];
    fixedLengthValueArrayQueue = [];
    fixedLength = 9;


    setFixedLength(length) {
        this.fixedLength = length;
    }

    addItemAndVaryArraySize(item: NameValuePair) {
        console.log(this.fixedLengthKeyArrayQueue.includes(item.key))
        console.log((item.key))
        if (!this.fixedLengthKeyArrayQueue.includes(item.key)) {

            this.fixedLengthKeyArrayQueue.push(item.key);
            this.fixedLengthValueArrayQueue.push(item.value);
            console.log(this.fixedLengthKeyArrayQueue)
        }
    }

    addItemToFixedArraySize(item: NameValuePair) {
        console.log(this.fixedLengthKeyArrayQueue.includes(item.key))
        console.log((item.key))
        if (!this.fixedLengthKeyArrayQueue.includes(item.key)) {
            this.fixedLengthKeyArrayQueue.push(item.key);
            this.fixedLengthValueArrayQueue.push(item.value);
            console.log(this.fixedLengthKeyArrayQueue)
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