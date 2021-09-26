import React, { ChangeEvent } from "react";
import bancomatStore from "../../store/BancomatState";
import styled from "./Monitor.module.css";
import {observer} from "mobx-react-lite";
import {Button} from "../Button/Button";
import {Input} from "../Input/Input";

const Monitor = observer(() => {
    return (
      <>
        {!bancomatStore.isValidpinCode ? (
          <div>
            <Input
              type="number"
              value={bancomatStore.inputValue}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                bancomatStore.setInputValue(Number(e.currentTarget.value))
              }
            />
            <Button types={"success"} onClick={bancomatStore.accessValue} >
              Подвердить
            </Button>
            <Button
              types={"success"}
              onClick={() => bancomatStore.setAuth(false)}
            >
              вернуть карту
            </Button>
          </div>
        ) : (
          <Input
            type="number"
            value={bancomatStore.inputMoney}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              bancomatStore.setMoney(Number(e.currentTarget.value))
            }
          />
        )}

        {bancomatStore.isValidpinCode ? (
          <div className={styled.monitorPanel}>
            <Button
              onClick={() => bancomatStore.setMode("issue")}
              types={"primary"}
            >
              выдача наличных
            </Button>
            <Button
              types={"primary"}
              onClick={() => bancomatStore.setMode("introduction")}
            >
              внесение наличных
            </Button>
            <Button
              types={"primary"}
              onClick={() => bancomatStore.setAuth(false)}
            >
              вернуть карту
            </Button>
          </div>
        ) : null}
        <div className={styled.monitor}>{bancomatStore.displayMessage}</div>
      </>
    );
});

export default Monitor;
