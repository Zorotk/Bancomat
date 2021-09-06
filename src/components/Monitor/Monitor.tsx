import React from "react";
import bancomatStore from "../../store/BancomatState";
import styled from "./Monitor.module.css";
import { observer } from "mobx-react-lite";
import { Button } from "../Button/Button";
const Monitor = observer(() => {

  return (
    <div>
      {!bancomatStore.isValidpinCode ? (
        <div>
          <input
            type="number"
    
            value={bancomatStore.inputValue}
            onChange={(e) =>
              bancomatStore.setInputValue(Number(e.target.value))
            }
          />
          <Button type={"success"} onClick={bancomatStore.accessValue}>
            Подвердить
          </Button>
          <Button type={"success"} onClick={()=>bancomatStore.setAuth(false)}>
            вернуть карту
          </Button>
        </div>
      ) : (
        <input
          type="number"
          value={bancomatStore.inputMoney}
          onChange={(e) => bancomatStore.setMoney(Number(e.target.value))}
        />
      )}

      {bancomatStore.isValidpinCode ? (
        <div className={styled.monitorPanel}>
          <Button
            onClick={() => bancomatStore.setMode("issue")}
            type={"primary"}
          >
            выдача наличных
          </Button>
          <Button type={"primary"}>внесение наличных </Button>
          <Button type={"primary"} onClick={() => bancomatStore.setAuth(false)}>вернуть карту</Button>
        </div>
      ) : null}
      <div className={styled.monitor}>{bancomatStore.displayMessage}</div>
    </div>
  );
});

export default Monitor;
