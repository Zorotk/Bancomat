import styles from "./Button.module.css";

import cn from "classnames";

export const Button = ({
  type,
  children,
  className,
  ...props
}: any): JSX.Element => {
  return (
    <div
      className={cn(styles.button, className, {
        [styles.primary]: type === "primary",
        [styles.success]: type === "success",
      })}
      {...props}
    >
      {children}
    </div>
  );
};
