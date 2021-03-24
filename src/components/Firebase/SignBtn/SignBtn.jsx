import "./SignBtn.css";
const SignBtn = ({ onClick, className, text }) => {
  return (
    <button className={className} onClick={onClick}>
      {text}
    </button>
  );
};

export default SignBtn;
