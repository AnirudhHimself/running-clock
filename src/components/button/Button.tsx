import './Button.scss';

interface Props {
  children: React.ReactNode;
  handleClick: () => void;
  variant: 'primary' | 'secondary';
}

export const Button: React.FC<Props> = ({ children, handleClick, variant }) => {
  const getButtonClassNames = (variant: string) => {
    const stylesList: Array<string> = ['btn'];
    stylesList.push(`btn-${variant}`);
    return stylesList.join(' ');
  };
  return (
    <button className={getButtonClassNames(variant)} onClick={handleClick}>
      {children}
    </button>
  );
};
