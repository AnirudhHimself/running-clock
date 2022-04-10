import "./Button.scss";

interface Props {
  children: React.ReactNode;
  handleClick: () => void;
  variant: "primary" | "inactive" | "secondary";
}

export const Button: React.FC<Props> = ({ children, handleClick, variant }) => {
  const getButtonClassNames = (variant: string) => {
    const stylesList: Array<string> = ["btn"];
    stylesList.push(`btn-${variant}`);
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
