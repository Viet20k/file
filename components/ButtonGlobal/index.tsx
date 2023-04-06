import "./index.scss";
import {ReactNode} from "react";

interface ButtonGlobalProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "default" | "primary";
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

function ButtonGlobal(props: ButtonGlobalProps): JSX.Element {
  const {
    onClick,
    className,
    type = "default",
    children,
    startIcon,
    endIcon,
  } = props;
  return (
    <button
      className={`button-global ${type} ${className || ""}`}
      type="button"
      onClick={onClick}
    >
      {startIcon}
      {children}
      {endIcon}
    </button>
  );
}

export default ButtonGlobal;
