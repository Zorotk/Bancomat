import { makeAutoObservable } from "mobx";
class PurseState {
    money = ''
    
    constructor() {
        makeAutoObservable(this)

    }
   
}

export default new PurseState()