import React from "react";
import BancomatState from "../../store/BancomatState";

import Monitor from "../Monitor/Monitor";
import styled from "./Bancomat.module.css";
import { observer } from "mobx-react-lite";
import { Button } from "../Button/Button";

const Bancomat = observer(() => {
  const buttons = "9876543210".split("");

  let arr = [5, 5, 5, 5, 5].sort((a, b) => b - a);

  let i = 0;
  function equalProportion(amount: number) {
    if (amount === 0) return arr;
    while (amount !== 0) {
      if (arr[i] < arr[i + 1] || arr[i] === 0) i++;
      else {
        if (arr[i] >= arr[i + 1]) arr[i] -= 1;
        if (arr[i] === arr[i + 1]) i = 0;
        if (i === arr.length - 1) {
          arr[i] -= 1;
          i = 0;
        }
        amount--;
      }
    }
    return arr;
  }

  console.log(equalProportion(20));

  // const equalProportion = (amount: number) => {
  //   while (arr.sort((a, b) => b - a) && amount > 0 && arr[0] > 0) {
  //     amount--;
  //     arr[0]--;
  //   }
  //   return arr;
  // };
  // console.log(equalProportion(20));

  // let i = 0;

  // function equalProportion(amount:number) {
  //   while (i < arr.length) {
  //     if (i > 0) {
  //       if (arr[i] > arr[i + 1]) {
  //         arr[i - 1] -= 1;
  //         amount -= 1;
  //         i = 0;
  //         if (amount === 0) return arr;
  //       }
  //       if (arr[i] < arr[i + 1]) {
  //         arr[i + 1] -= 1;
  //         amount -= 1;
  //         if (amount === 0) return arr;
  //       }
  //     }
  //     i++;
  //     if (amount === 0) {
  //       return arr;
  //     }
  //   }
  // }
  // console.log(equalProportion(10));

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
          {value} * {count} шт
        </div>
      ))}
      Купюр {Object.values(BancomatState.limits).reduce((acc, el) => acc + el)}
      шт
      <div>
        {BancomatState.moneyKit.map((_: any, i: number) => {
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
