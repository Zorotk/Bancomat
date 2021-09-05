import { makeAutoObservable } from "mobx";
import CardState from './CardState'
class BancomatState {
    money = ''
    pinCode = 123
    displayMessage = 'вставьте карточку'
    inputValue = 0
    displayValue = ''
    auth = false
    errorAuth=1
    constructor() {
        makeAutoObservable(this)
    }
   
    setInputValue(value:number) {
             this.inputValue = value
        }
    setAuth() {
        this.auth = true
        this.displayMessage="Введите пинкод"
          }       
    accessValue = () => {
        if(!this.auth){return}
        if ( this.errorAuth === 3) {
            this.displayMessage = 'не верный пинкод три раза, карта заблокирована'
            this.auth=false
            return
        }
        if (this.inputValue === this.pinCode) {
            this.auth = true
            this.displayMessage = 'верно'
        }
     else {
         this.displayMessage = 'не верно, повторите пинкод'
         this.errorAuth=this.errorAuth+1
        }
        if (this.inputValue) CardState.setBalance(this.inputValue)
        this.inputValue = 0
           }  
}

export default new BancomatState()