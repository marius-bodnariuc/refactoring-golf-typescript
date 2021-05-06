import {Incalculable} from "./incalculable";

export class Money<A = number, B = string> {
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

    netAmount(first: Money, ...rest : Money[] ): Money {

        const pairs: Array<Money> = Array.from(rest);
        let total: Money = first

        for (let next of pairs) {
            if (next.currency !== total.currency) {
                throw new Incalculable()
            }
        }

        for (const next of pairs) {
            total = new Money<number, string>(total.value + next.value, next.currency)
        }

        const amount:number = total.value * (this.percent / 100.0 );
        const tax: Money = new Money(Math.trunc(amount), first.currency);

        if (total.currency !== tax.currency) {
            throw new Incalculable()
        }
        return new Money(total.value - tax.value, first.currency)
    }

}