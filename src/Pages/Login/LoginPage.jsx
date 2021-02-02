import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import fire from "../../firebase";
import styles from "./loginStyle.module.css";

const LoginPage = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasAccount, setHasAccount] = useState(false);
  let history = useHistory();
  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
        }
      });
  };

  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        clearInputs();
        setUser(user);
      } else {
        setUser("");
      }
    });
  };

  const handleLogout = () => {
    fire.auth().signOut();
    history.push("/login");
  };

  useEffect(() => {
    authListener();
  }, []);

  return (
    <div>
      {user ? (
        <div className={styles.main}>
          <h1>REDIRECT TO MAIN PAGE HERE</h1>
          <br></br>
          <Link to="/proctor"> GO TO PROCTOR </Link>
          <br></br>
          <br></br>
          <button onClick={handleLogout}>Log out</button>
        </div>
      ) : (
        <div className={styles.section}>
          <h1>Yocco.</h1>
          <div className={styles.center}>
            <form className={styles.form} onSubmit={(e) => handleLogin(e)}>
              <h1>Sign In</h1>
              <div className={styles.textfield}>
                <input
                  className="form-control"
                  type="text"
                  id="login"
                  autoFocus
                  required
                  autocomplete="off"
                  autocapitalize="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span></span>
                <label>Email Address</label>
              </div>
              <div className={styles.textfield}>
                <input
                  className="form-control"
                  type="password"
                  id="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span></span>
                <label>Password</label>
              </div>
              <input type="submit" value="Login"></input>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
