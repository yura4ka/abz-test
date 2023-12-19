import classNames from "classnames";
import cl from "./Input.module.scss";
import fileCl from "./FileInput.module.scss";
import { InputHTMLAttributes, forwardRef } from "react";

type Props = {
  label: string;
  details?: string;
  errorMessage?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, Props>(
  ({ details, label, errorMessage, className, type, value, ...rest }, ref) => {
    const isError = !!errorMessage;

    const input =
      type === "file" ? (
        <label
          className={classNames(
            fileCl.inputContainer,
            isError && fileCl.error,
            className
          )}
        >
          <input
            className={fileCl.input}
            ref={ref}
            type="file"
            {...rest}
            placeholder=" "
          />
          <div className={fileCl.uploadBtn}>Upload</div>
          <p className={classNames(fileCl.label, !!value && fileCl.hasValue)}>
            {value ?? label}
          </p>
        </label>
      ) : (
        <label className={cl.inputContainer}>
          <input
            className={classNames(className, cl.input, isError && cl.error)}
            {...rest}
            ref={ref}
            placeholder=" "
          />
          <div className={cl.label}>{label}</div>
        </label>
      );

    return (
      <div className={cl.wrapper}>
        {input}
        <p className={classNames(cl.details, isError && cl.error)}>
          {isError ? errorMessage : details}
        </p>
      </div>
    );
  }
);

export default Input;
