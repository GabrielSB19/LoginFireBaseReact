import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";

const Home = (props) => {
  const navigate = useNavigate();
  const salir = () => {
    return auth.signOut();
    navigate("/");
  };

  return (
    <div>
      <div>
        <h1>
          <Link to={"/login"}>Login</Link>
        </h1>
        <br></br>
        <h1>
          <Link to={"/signup"}>Sign Up</Link>
        </h1>
      </div>
      <h2>{props.name ? `Bienvenido - ${props.name}` : "Inicia Sesión"}</h2>
      <button onClick={salir}>Salir</button>
    </div>
  );
};

export default Home;
