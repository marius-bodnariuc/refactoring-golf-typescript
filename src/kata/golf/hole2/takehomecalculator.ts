import {Incalculable} from "./incalculable";

export class Pair<A, B> {
    public value: A;
    public currency: B;

    constructor(first: A, second: B) {
        this.value = first;
        this.currency = second;
    }
}

export class Takehomecalculator {
    private percent: number

    constructor(percent: number) {
        this.percent = percent;
    }

    netAmount(first: Pair<number, string>, ...rest : Pair<number, string>[] ): Pair<number, string> {

        const pairs: Array<Pair<number, string>> = Array.from(rest);
        let total: Pair<number, string> = first

        for (let next of pairs) {
            if (next.currency !== total.currency) {
                throw new Incalculable()
            }
        }

        for (const next of pairs) {
            total = new Pair<number, string>(total.value + next.value, next.currency)
        }

        const amount:number = total.value * (this.percent / 100.0 );
        const tax: Pair<number, string> = new Pair(Math.trunc(amount), first.currency);

        if (total.currency !== tax.currency) {
            throw new Incalculable()
        }
        return new Pair(total.value - tax.value, first.currency)
    }

}