import {makeAutoObservable} from "mobx";
import BancomatState from "./BancomatState";

class CardState {
    balance = 18700
    onDrag = false
    constructor() {
        makeAutoObservable(this)
    }

    setBalance(value: number) {
        this.balance -= value
    }

    startDragHandler(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault()
        this.onDrag = true
    }

    dragOverHandler(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault()
        this.onDrag = false
    }

    dropHandler(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault()    
         this.onDrag = false
         BancomatState.setAuth(true);
    }
}

export default new CardState()
