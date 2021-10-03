import {makeAutoObservable} from "mobx";

interface MoneyCount {
    value: number,
    count: number
}

class PurseState {
    money = 0
    limits = [
        {value: 5000, count: 4},
        {value: 2000, count: 8},
        {value: 1000, count: 15},
        {value: 500, count: 16},
        {value: 200, count: 23},
        {value: 100, count: 42},
    ];

    constructor() {
        makeAutoObservable(this)
        this.availableMoney()
    }

    setLimits(value: MoneyCount[]) {
        this.limits = value
    }

    addLimits(value: object) {
        Object.entries(value).forEach(([k, v]) => {
            this.limits.find(el => el.value === Number(k))!.count += v
        })
    }

    subtractLimits(value: object) {
        Object.entries(value).forEach(([k, v]) => {
            this.limits.find(el => el.value === Number(k))!.count -= v
        })
    }

    availableMoney = () => this.limits.forEach(({value, count}) => (this.money += value * count))

    setMoney(value: number) {
        this.money += value
    }
}

export default new PurseState()
