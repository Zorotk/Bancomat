import React from "react";
import bancomatStore from "../store/BancomatState";
import styled from "./Monitor.module.css";
import { observer } from "mobx-react-lite";
const Monitor = observer(() => {
  return (
    <div>
      <input
        type="number"
        value={bancomatStore.inputValue}
        onChange={(e) => bancomatStore.setInputValue(Number(e.target.value))}
      />
      <button onClick={bancomatStore.accessValue}>Подвердить</button>

      <div className={styled.monitor}>
        { bancomatStore.displayMessage  }
      </div>
    </div>
  );
});

export default Monitor;
