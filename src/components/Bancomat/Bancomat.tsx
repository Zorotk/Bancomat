import React from "react";
import BancomatState from "../../store/BancomatState";

import Monitor from "../Monitor/Monitor";
import styled from "./Bancomat.module.css";
import { observer } from "mobx-react-lite";
import { Button } from "../Button/Button";

const Bancomat = observer(() => {
  const buttons = "9876543210".split("");

  let arr = [4, 5, 1, 3, 2].sort((a, b) => b - a);
  let r = 1;
  let l = 0;
  function equalProportion(amount: number) {
    while (true) {
      if (arr[l] < arr[r]) {
        if (arr[arr.length - 2] === 0 && arr[arr.length - 1] === 1) {
          arr[r] = 0;
        }
        l++;
        r++;
      } else {
        if (arr[l] >= arr[r]) {
          arr[l] -= 1;
        }
        if (arr[l] === arr[r]) {
          l = 0;
          r = 1;
        }
        amount--;
        if (amount === 0) return arr;
      }
    }
  }
  console.log(equalProportion(11));

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
