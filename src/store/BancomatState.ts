import {makeAutoObservable} from "mobx";
import CardState from './CardState'
import PurseState from "./PurseState";

class BancomatState {
    money = 0
    pinCode = 123
    displayMessage = 'вставьте карточку'
    inputValue = 0
    auth = false
    isValidpinCode = false
    errorAuth = 0
    limits: Record<string, number> = {5000: 4, 2000: 6, 1000: 9, 500: 8, 200: 2, 100: 5};
    inputMoney = 0

    constructor() {
        makeAutoObservable(this)
        this.availableMoney()
    }


    availableMoney = () => Object.entries(this.limits).forEach(([k, v]) => (this.money += Number(k) * Number(v)));


    bancomat = (ammount: number, limits: Record<string, number>): Record<string, number> | undefined => {
        const notes: string[] = Object.keys(limits).sort((a, b) => Number(b) - Number(a));

        for (let i = 0; i < notes.length; i++) {
            const note = Number(notes[i])

            if (ammount - note < 0 || limits[note] < 1) {
                continue;
            }
            if (ammount - note === 0 && limits[note] > 0) {
                limits[note] -= 1;
                return {[note]: 1};
            }

            limits[note] -= 1;
            const step = this.bancomat(ammount - note, limits);
            if (step) {
                step[note] = step[note] + 1 || 1;
                return step;
            }
            limits[note] += 1;
        }

    };

    setMoney(value: number) {
        this.inputMoney = value
    }

    setMode(value: string) {

        if (value === 'issue') {
            if (this.inputMoney > this.money) {
                this.displayMessage = 'Операция не может быть выполнена'
            } else {
                let fn = this.bancomat(this.inputMoney, this.limits)
                if (fn) {
                    this.money -= this.inputMoney
                    CardState.setBalance(this.inputMoney)
                    this.displayMessage = `выдано ${this.inputMoney}, для продолжения Введите пин код`
                    PurseState.setMoney(this.inputMoney)
                    PurseState.addLimits(fn)
                    this.isValidpinCode = false
                    this.inputMoney = 0

                } else {
                    this.displayMessage = 'нет купюр такого формата в наличии'
                }
            }
        }
        if (value === 'introduction') {
            // console.log(Object.assign({},...PurseState.limits.map(({value,count})=>{return {[value]:count}})))
            let limitsPurse = PurseState.limits.reduce((acc, {value, count}) => ({...acc, [value]: count}), {})

            let fn = this.bancomat(this.inputMoney, limitsPurse)
            if (fn) {
                PurseState.money -= this.inputMoney
                this.money += this.inputMoney
                CardState.setBalance(-this.inputMoney)
                PurseState.subtractLimits(fn)
                for (let key in fn) {
                    this.limits[+key] += fn[key]
                }
                this.displayMessage = `внесено ${this.inputMoney}, для продолжения Введите пин код`
                this.isValidpinCode = false
                this.inputMoney = 0
            } else {
                this.displayMessage = 'нет купюр такого формата в наличии'
            }
        }
    }

    setNotPinCode=()=> {
        this.auth = true
        this.isValidpinCode = true
    }

    setInputValue(value: number) {
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
        if (this.inputValue === this.pinCode) {
            this.auth = true
            this.isValidpinCode = true
            this.displayMessage = 'верно'
            this.errorAuth = 0
        } else {
            this.displayMessage = 'не верно, повторите пинкод'
            this.errorAuth = this.errorAuth + 1
        }

        this.inputValue = 0
    }
}

export default new BancomatState()
