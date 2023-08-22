import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import InputControl from "../inputControl/InputContro";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: "", password: "" });
  const [error, setError] = useState([]);
  const [submitButtonDisable, setSubmitButtonDisable] = useState(false);
  const doLogin = () => {
    if (!values.email || !values.password) {
      setError(["Todos los campos son obligatorios"]);
      return;
    }
    setError("");
    setSubmitButtonDisable(true);
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then(async (userCredential) => {
        setSubmitButtonDisable(false);
        navigate("/");
      })
      .catch((error) => {
        setSubmitButtonDisable(false);
        setError([error.message]);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className={styles.heading}>Login</h1>
        <InputControl
          label="Email"
          placeholder="Ingresa tu correo"
          onChange={(e) =>
            setValues((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        <InputControl
          label="Password"
          placeholder="Ingresa tu contraseña"
          onChange={(e) =>
            setValues((prev) => ({ ...prev, password: e.target.value }))
          }
        />
        <div className={styles.footer}>
          <b className={styles.error}>{error}</b>
          <button
            className={styles.button}
            onClick={doLogin}
            disabled={submitButtonDisable}
          >
            Login
          </button>
          <p>
            Crear Cuenta{" "}
            <span>
              <Link to={"/signup"}>Ir</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
