import React, { ChangeEvent } from "react";
import bancomatStore from "../../store/BancomatState";
import styled from "./Monitor.module.css";
import { observer } from "mobx-react-lite";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import CardState from "../../store/CardState";

const Monitor = observer(() => {
  return (
    <>
      {!bancomatStore.isValidpinCode ? (
        <div>
          <div
            onDragOver={(e) => CardState.dragOverHandler(e)}
            onDrop={(e) => CardState.dropHandler(e)}
            className={styled.monitorCard}
            style={{
              border: CardState.onDrag
                ? "1px solid var(--primary)"
                : "1px solid var(--gray)",
            }}
          >
            вставить карточку
          </div>

          <Input
            type="number"
            value={bancomatStore.inputValue}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              bancomatStore.setInputValue(e.currentTarget.value)
            }
          />
          <Button types={"success"} onClick={bancomatStore.accessValue}>
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
