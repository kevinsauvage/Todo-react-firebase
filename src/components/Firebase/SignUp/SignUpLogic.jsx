import { useState } from "react";
import { auth, firestore } from "../../../firebase";

const SignUpLogic = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(null);

  const createUserWithEmailAndPasswordHandler = (event, email, password) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var user = userCredential.user;
        user.updateProfile({
          displayName: displayName,
        });
        const db = firestore;
        db.collection("users").doc(user.uid).set({
          email: email,
          emailVertified: false,
          name: displayName,
          password: password,
        });
      })

      .catch((error) => {
        setError(error.message);
      });

    setEmail("");
    setPassword("");
    setDisplayName("");
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    } else if (name === "displayName") {
      setDisplayName(value);
    }
  };
  return {
    error,
    displayName,
    onChangeHandler,
    email,
    password,
    createUserWithEmailAndPasswordHandler,
  };
};

export default SignUpLogic;
