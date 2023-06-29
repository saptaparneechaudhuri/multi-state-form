import "./button.css";

const Button = ({
  text,
  colorType,
  submit = () => {},
  onClickNext = () => {},
}) => {
  const url = window.location.pathname;

  return (
    <button
      type="submit"
      className={`btn ${colorType}`}
      onClick={() => {
        submit();
        onClickNext();
      }}
    >
      {text}
    </button>
  );
};

export default Button;
