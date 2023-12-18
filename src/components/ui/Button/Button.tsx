import classNames from "classnames";
import cl from "./Button.module.scss";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ className, ...rest }: Props) => {
  return <button className={classNames(cl.btn, className)} {...rest}></button>;
};

export default Button;
