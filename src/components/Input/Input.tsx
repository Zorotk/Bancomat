import styles from "./Input.module.css";
import cn from "classnames";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";
interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>,HTMLInputElement>{

}
export const Input = ({ className, ...props }: InputProps): JSX.Element => {
  return (
    <div className={cn(className, styles.inputWrapper)}>
      <input
        className={cn(styles.input)}
        {...props}
      />
   
    </div>
  );
};
