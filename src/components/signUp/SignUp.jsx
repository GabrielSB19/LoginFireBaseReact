import styles from "./SignUp.module.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import InputControl from "../inputControl/InputContro";

const SignUp = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState([]);
  const [submitButtonDisable, setSubmitButtonDisable] = useState(false);

  const register = () => {
    if (!values.name || !values.email || !values.password) {
      setError(["Todos los campos son obligatorios"]);
      return;
    }
    setError("");
    setSubmitButtonDisable(true);
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then(async (userCredential) => {
        setSubmitButtonDisable(false);
        const user = userCredential.user;
        await updateProfile(user, {
          displayName: values.name,
        });
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
        <h1 className={styles.header}>Registro</h1>
        <InputControl
          label="Name"
          placeholder="Ingresa tu nombre"
          onChange={(e) =>
            setValues((prev) => ({ ...prev, name: e.target.value }))
          }
        />
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
          <button onClick={register} disabled={submitButtonDisable}>
            Sign Up
          </button>
          <p>
            Si ya tienes una cuenta{" "}
            <span>
              <Link to={"/login"}>Inicia sesión</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
