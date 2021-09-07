import React from "react";
import BancomatState from "../../store/BancomatState";

import Monitor from "../Monitor/Monitor";
import styled from "./Bancomat.module.css";
import { observer } from "mobx-react-lite";
const Bancomat = observer(() => {


  return (
    <div className={styled.bancomat}>
      <Monitor />
      <div>
        <h2>Доступно средств {BancomatState.money}</h2>
        {Object.entries(BancomatState.limits).map(([value, count], i) => (
          <div key={i}>
            {value} * {count} шт
          </div>
        ))}
      </div>
    </div>
  );
});

export default Bancomat;
