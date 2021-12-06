import "./Button.scss";

interface Props {
  variant: "primary" | "inactive" | "secondary";
  handleClick: any;
}

export const Button: React.FC<Props> = ({ variant, children, handleClick }) => {
  const getButtonClassNames = (variant: string) => {
    const stylesList: Array<string> = ["btn"];
    if (variant === "inactive") {
      stylesList.push("btn-inactive");
    }
    if (variant === "secondary") {
      stylesList.push("btn-secondary");
    }
    return stylesList.join(" ");
  };
  return (
    <button
      className={getButtonClassNames(variant)}
      disabled={variant === "inactive"}
      tabIndex={variant === "inactive" ? -1 : 0}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};
