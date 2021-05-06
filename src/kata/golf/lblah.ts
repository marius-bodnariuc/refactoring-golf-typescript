
export class Money<A = number, B = string> {
    public value: A;
    public currency: B;

    constructor(first: A, second: B) {
        this.value = first;
        this.currency = second;
    }
}