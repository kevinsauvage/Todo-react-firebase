import { useState } from "react";
import { auth } from "../../../firebase";

const PasswordResetLogic = () => {
  const [email, setEmail] = useState("");
  const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);
  const [error, setError] = useState(null);

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    }
  };

  const sendResetEmail = (event) => {
    event.preventDefault();
    auth
      .sendPasswordResetEmail(email)
      .then(function () {
        setEmailHasBeenSent(true);
      })
      .catch(function (error) {
        setError(error);
      });
  };

  return { emailHasBeenSent, error, email, onChangeHandler, sendResetEmail };
};

export default PasswordResetLogic;
