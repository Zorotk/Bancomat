import React from "react";
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
                        onChange={(e: any) =>
                            bancomatStore.setInputValue(Number(e.currentTarget.value))
                        }
                    />
                    <Button type={"success"} onClick={bancomatStore.accessValue}>
                        Подвердить
                    </Button>
                    <Button type={"success"} onClick={() => bancomatStore.setAuth(false)}>
                        вернуть карту
                    </Button>
                </div>
            ) : (
                <Input
                    type="number"
                    value={bancomatStore.inputMoney}
                    onChange={(e: any) =>
                        bancomatStore.setMoney(Number(e.currentTarget.value))
                    }
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
                    <Button
                        type={"primary"}
                        onClick={() => bancomatStore.setMode("introduction")}
                    >
                        внесение наличных
                    </Button>
                    <Button type={"primary"} onClick={() => bancomatStore.setAuth(false)}>
                        вернуть карту
                    </Button>
                </div>
            ) : null}
            <div className={styled.monitor}>{bancomatStore.displayMessage}</div>
        </>
    );
});

export default Monitor;
