import "./reset.css";
import styled from "./Main.module.css";

import Bancomat from "./Bancomat/Bancomat";
import Purse from "./Purse/Purse";
import BankCard from "./BancCard/BankCard";

export const Main = () => {
  return (
    <div className={styled.root}>
      <Purse />
      <Bancomat />
      <BankCard />
    </div>
  );
};
