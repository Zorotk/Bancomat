import React from "react";
import BancomatState from "../../store/BancomatState";

import Monitor from "../Monitor/Monitor";
import styled from "./Bancomat.module.css";
import { observer } from "mobx-react-lite";
import {Button} from "../Button/Button";

const Bancomat = observer(() => {

  return (
    <div className={styled.bancomat}>
      <Monitor />
      <h2>Банкомат</h2>
      <h2>Доступно средств {BancomatState.money}</h2>
      {Object.entries(BancomatState.limits).map(([value, count], i) => (
        <div key={i}>
          {value} * {count} шт
        </div>
      ))}
        Купюр {Object.values(BancomatState.limits).reduce((acc, el) => acc + el)} шт
      {/*<Button onClick={BancomatState.setNotPinCode} types={'success'}>пинкод</Button>*/}
    </div>
  );
});

export default Bancomat;
