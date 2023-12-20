import { forwardRef } from "react";
import classNames from "classnames";
import { InputProps } from "./index";
import cl from "./Input.module.scss";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, className, isError, ...rest }, ref) => {
    return (
      <label className={classNames(className, cl.inputContainer)}>
        <input
          className={classNames(cl.input, isError && cl.error)}
          {...rest}
          ref={ref}
          placeholder=" "
        />
        <div className={cl.label}>{label}</div>
      </label>
    );
  }
);
