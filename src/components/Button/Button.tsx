import styles from "./Button.module.css";

import cn from "classnames";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
types:string
}
export const Button = ({
  types,
  children,
  className,
  ...props
}: ButtonProps): JSX.Element => {
  return (
    <button
      className={cn(styles.button, className, {
        [styles.primary]: types === "primary",
        [styles.success]: types === "success",
      })}
      {...props}
    >
      {children}
    </button>
  );
};
