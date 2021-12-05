import "./Controls.scss";

export const Controls = (props: any) => {
  return (
    <footer className="control-container">
      <div className="controls-button-group">{props.children}</div>
    </footer>
  );
};
