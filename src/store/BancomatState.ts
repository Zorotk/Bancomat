import {makeAutoObservable} from "mobx";
import CardState from './CardState'
import PurseState from "./PurseState";
 
class BancomatState {
     moneyKit:Record<string, number> []= [
  {
    5000: 100,
    2000: 400,
    1000: 1000,
    500: 3000,
    200: 5000,
    100: 8000,
    50: 10000
  },
  {
    5000: 476,
    2000: 345,
    1000: 6741,
    500: 4362,
    200: 234,
    100: 1643,
    50: 3450
  },
  {
    5000: 234,
    2000: 678,
    1000: 845,
    500: 2451,
    200: 9654,
    100: 2345,
    50: 234
  },
  {
    5000: 546,
    2000: 562,
    1000: 2543,
    500: 4365,
    200: 2154,
    100: 124,
    50: 342
  },
  {
    5000: 2732,
    2000: 347,
    1000: 479,
    500: 7556,
    200: 3296,
    100: 1257,
    50: 3854
  },
  {
    5000: 73,
    2000: 147,
    1000: 279,
    500: 356,
    200: 696,
    100: 857,
    50: 854
  }
]
    money = 0
    pinCode = 123
    displayMessage = 'вставьте карточку'
    inputValue = ''
    auth = false
    isValidpinCode = false
    errorAuth = 0
    limits: Record<string, number> = {5000: 4, 2000: 6, 1000: 9, 500: 8, 200: 2, 100: 5, 50: 11};
    inputMoney = 0

    constructor() {
        makeAutoObservable(this)
        this.availableMoney()
    }

    availableMoney = () => Object.entries(this.limits).forEach(([k, v]) => (this.money += Number(k) * Number(v)));

    bancomat = (ammount: number, limits: Record<string, number>): Record<string, number> | undefined => {
        const notes: string[] = Object.keys(limits);
        let result: Record<string, number> = {}
        let right = notes.length - 1
        while (0 <= right) {
            if (ammount === 0) {
                return result
            }
            if (ammount < Number(notes[0])) {
                return
            }
            let note = Number(notes[right])
            if (note > ammount || limits[note] === 0) {
                right--
            } else {
                let max = Math.min(Math.floor((ammount / (limits[note] * note)) * limits[note]), limits[note]) 
                ammount -= max * note
                limits[note] -= max
                result[note] = result[note] + max || max
            }
        }
    }

    setKit = (index: number) => {
        this.limits = this.moneyKit[index]
        this.money=0
        this.availableMoney()    
    }

    setMoney(value: number) {
        this.inputMoney = value
    }

    setMode(value: string) {
        if (value === 'issue') {
            if (this.inputMoney > this.money) {
                this.displayMessage = 'Операция не может быть выполнена'
            } else {
                let fn = this.bancomat(this.inputMoney, Object.assign({}, this.limits))
                if (!fn) {
                    this.displayMessage = 'нет сдачи'
                } else {
                    Object.entries(fn).forEach(([k, v]) => this.limits[k] -= v)
                    CardState.setBalance(this.inputMoney)
                    this.money -= this.inputMoney
                    PurseState.setMoney(this.inputMoney)
                    PurseState.addLimits(fn)
                    this.displayMessage = `выдано ${this.inputMoney} 
                    ${Object.entries(fn).reduce((acc,[k,v]) => { return acc+=`${k} * ${v} шт `
                     },'')}, для продолжения Введите пин код`
                    this.isValidpinCode = false
                    this.inputMoney = 0
                }
            }
        }
        if (value === 'introduction') {
            if (this.inputMoney > PurseState.money) {
                this.displayMessage = 'Операция не может быть выполнена'
            } else {
                let limitsPurse = PurseState.limits.reduce((acc, {value, count}) => ({...acc, [value]: count}), {})
                let fn = this.bancomat(this.inputMoney, limitsPurse)
                if (fn) {
                    PurseState.money -= this.inputMoney
                    this.money += this.inputMoney
                    CardState.setBalance(-this.inputMoney)
                    for (let key in fn) {
                        this.limits[key] += fn[key]
                    }
                    PurseState.subtractLimits(fn)
                    this.displayMessage = `внесено ${this.inputMoney}, для продолжения Введите пин код`
                    this.isValidpinCode = false
                    this.inputMoney = 0
                } else {
                    this.displayMessage = 'нет сдачи'
                }
            }
        }
    }

    setNotPinCode = () => {
        this.auth = true
        this.isValidpinCode = true
    }

    setInputValue(value: string) {
        this.inputValue = value
    }

    setAuth(value: boolean) {
        this.auth = value
        this.displayMessage = this.auth ? "Введите пинкод" : "вставьте карточку"
    }

    accessValue = () => {
        if (!this.auth) {
            return
        }
        if (this.errorAuth === 3) {
            this.displayMessage = 'не верный пинкод три раза, карта заблокирована'
            this.auth = false
            return
        }
        if (Number(this.inputValue) === this.pinCode) {
            this.auth = true
            this.isValidpinCode = true
            this.displayMessage = 'верно'
            this.errorAuth = 0
        } else {
            this.displayMessage = 'не верно, повторите пинкод'
            this.errorAuth = this.errorAuth + 1
        }
        this.inputValue = '0'
    }
}

export default new BancomatState()
