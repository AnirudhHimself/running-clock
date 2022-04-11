import './Controls.scss';

interface Props {
  children: React.ReactNode;
}

export const Controls: React.FC<Props> = ({ children }) => {
  return (
    <footer className="control-container">
      <div className="controls-button-group">{children}</div>
    </footer>
  );
};
