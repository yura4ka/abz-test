import classNames from "classnames";
import cl from "./FileInput.module.scss";
import { InputProps } from "./index";
import { forwardRef } from "react";

export const FileInput = forwardRef<HTMLInputElement, InputProps>(
  ({ label, className, isError, value, ...rest }, ref) => {
    return (
      <label
        className={classNames(
          cl.inputContainer,
          isError && cl.error,
          className
        )}
      >
        <input
          className={cl.input}
          ref={ref}
          type="file"
          {...rest}
          placeholder=" "
        />
        <div className={cl.uploadBtn}>Upload</div>
        <p className={classNames(cl.label, !!value && cl.hasValue)}>
          {value ?? label}
        </p>
      </label>
    );
  }
);
