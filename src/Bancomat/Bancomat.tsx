import React from "react";
import Monitor from "../Monitor/Monitor";
import styled from "./Bancomat.module.css";
const Bancomat = () => {
  
  return (
    <div className={styled.bancomat}>
      <Monitor />
    </div>
  );
};

export default Bancomat;
