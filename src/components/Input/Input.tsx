import { InputHTMLAttributes, forwardRef } from "react";
import classNames from "classnames";
import cl from "./Input.module.scss";
import { FileInput, Input } from "../ui/Input";

type Props = {
  label: string;
  details?: string;
  errorMessage?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const InputWrapper = forwardRef<HTMLInputElement, Props>(
  ({ details, errorMessage, className, ...rest }, ref) => {
    const isError = !!errorMessage;

    return (
      <div className={classNames(className, cl.wrapper)}>
        {rest.type === "file" ? (
          <FileInput ref={ref} isError={isError} {...rest} />
        ) : (
          <Input ref={ref} isError={isError} {...rest} />
        )}
        <p className={classNames(cl.details, isError && cl.error)}>
          {isError ? errorMessage : details}
        </p>
      </div>
    );
  }
);

export default InputWrapper;
