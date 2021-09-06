import "./reset.css";
import styled from "./Main.module.css";

import Bancomat from "./components/Bancomat/Bancomat";
import Purse from "./components/Purse/Purse";
import BankCard from "./components/BancCard/BankCard";

export const Main = () => {
  return (
    <div className={styled.root}>
      <Purse />
      <Bancomat />
      <BankCard />
    </div>
  );
};
