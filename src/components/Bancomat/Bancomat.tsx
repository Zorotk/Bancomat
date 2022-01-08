import React from "react";
import BancomatState from "../../store/BancomatState";

import Monitor from "../Monitor/Monitor";
import styled from "./Bancomat.module.css";
import { observer } from "mobx-react-lite";
import { Button } from "../Button/Button";

const Bancomat = observer(() => {
  const buttons = "9876543210".split("");
  return (
    <div className={styled.bancomat}>
      <Monitor />
      {!BancomatState.isValidpinCode && (
        <div className={styled.buttons}>
          {buttons.map((button: string, i: number) => {
            return (
              <Button
                key={i}
                onClick={() =>
                  BancomatState.setInputValue(BancomatState.inputValue + button)
                }
                types={"primary"}
              >
                {button}
              </Button>
            );
          })}
        </div>
      )}
      <h2>Банкомат</h2>
      <h2>Доступно средств {BancomatState.money}</h2>
      {Object.entries(BancomatState.limits).map(([value, count], i) => (
        <div key={i}>
          {value} * {count} шт {Number(value) * count} сумма
        </div>
      ))}
      Купюр {Object.values(BancomatState.limits).reduce((acc, el) => acc + el)}{" "}
      шт
      <div>
        {BancomatState.moneyKit.map((_: Record<string, number>, i: number) => {
          return (
            <Button
              key={i}
              onClick={() => BancomatState.setKit(i)}
              types={"success"}
            >
              Набор {i + 1}
            </Button>
          );
        })}
      </div>
    </div>
  );
});

export default Bancomat;
