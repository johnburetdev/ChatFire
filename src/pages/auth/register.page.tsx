import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuth } from "reactfire";

const RegisterPage = () => {
  const auth = useAuth();

  const handleClickGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      console.log("Usuario inicio");
    } catch (error) {
      console.error("Error al iniciar sesion", error);
    }
  };
  return (
    <div>
      <h1>Registrarte</h1>
      <button onClick={handleClickGoogle}>Inicia Sesion con GOOGLE</button>
    </div>
  );
};

export default RegisterPage;
