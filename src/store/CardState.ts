import { makeAutoObservable } from "mobx";
class CardState {
    balance = 18700
    
    constructor() {
        makeAutoObservable(this)
    }
 
    setBalance(value:number) {
       this.balance-=value
   }
}

export default new CardState()