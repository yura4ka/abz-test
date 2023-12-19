import classNames from "classnames";
import cl from "./Radio.module.scss";
import { forwardRef } from "react";

type Props = { label: string } & Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
>;

const Radio = forwardRef<HTMLInputElement, Props>(
  ({ className, label, ...rest }, ref) => {
    return (
      <label className={classNames(cl.radio, className)}>
        <input ref={ref} type="radio" className={cl.input} {...rest} />
        <span className={cl.checkbox} />
        {label}
      </label>
    );
  }
);

export default Radio;
