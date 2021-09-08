import React from "react";
import CardState from "../../store/CardState";
import styled from "./BankCard.module.css";
import {observer} from "mobx-react-lite";
import BancomatState from "../../store/BancomatState";

const BankCard = observer(() => {
    return (
        !BancomatState.auth ? <div className={styled.bankCard} onClick={() => {
            BancomatState.setAuth(true)
        }}>
            <h2>Карта</h2>
            <div>
                Пин код:<b>123</b>
            </div>
            <div>Баланс {CardState.balance}</div>
        </div> : null
    );
});

export default BankCard;
