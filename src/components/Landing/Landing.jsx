import "./Landing.css";

const Landing = ({ handleClickSignUp }) => {
  return (
    <div className="landing">
      <h2 className="landing__title">Tsks, just tasks.</h2>
      <h3 className="landing__subtitle">
        Keep track of the tasks in life and get that satisfaction upon
        completion.
      </h3>
      <div onClick={handleClickSignUp} className="landing__getStarted">
        Get started
      </div>
      <div className="landing__pinkBubble1"></div>
      <div className="landing__pinkBubble2"></div>
      <div className="landing__darkBubble1"></div>
    </div>
  );
};

export default Landing;
