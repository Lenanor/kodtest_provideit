import "./Button.css";

export default function Button({
  type,
  onClickButton,
  text,
  isActive,
  ...props
}) {
  return (
    <button
      className={`Button ${isActive ? "Button--active" : ""}`}
      type={type}
      onClick={onClickButton}
      {...props}
    >
      {text}
    </button>
  );
}
