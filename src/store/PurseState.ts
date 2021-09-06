import { makeAutoObservable } from "mobx";

interface P{
    value: number,
    count:number
}
class PurseState {
    money = 0
    limits=[
    { value: 2000, count: 1 },
    { value: 1000, count: 4 },
    { value: 100, count: 2 },
  ];
    constructor() {
        makeAutoObservable(this)
        this.availableMoney()
        
    }
    setLimits(value:P[]) {
        this.limits=value
    }
    availableMoney = () =>this.limits.forEach(({ value, count }) => (this.money += value * count))
    setMoney(value:number) {
     this.money+=value
 }
}

export default new PurseState()