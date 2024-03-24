import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import app from "../../firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthContext } from "../context/authContext";

const GoogleAuth = () => {

  const { setauthUser } = useAuthContext();

  const [loading, setloading] = useState(false);
  const [errorGot, seterrorGot] = useState(null);
  const navigate = useNavigate();

  const handleGoogleSubmit = async () => {
    try {
      setloading(true);
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      console.log(result);

      const formData = {
        fullname: result.user.displayName,
        email: result.user.email,
        profilePic: result.user.photoURL,
      };
      console.log(formData);

      const res = await fetch("api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        seterrorGot(data.message);
        setloading(false);
        toast.error(data.message);
        return;
      }
      setloading(false);
      seterrorGot(null);

      localStorage.setItem("chat-user", JSON.stringify(data.user));
      setauthUser(data.user);

      toast.success(data.message);
      navigate("/");
    } catch (error) {
      seterrorGot(error.message);
      setloading(false);
      toast.error(error.message);
    }
  };

  return (
    <button
      onClick={handleGoogleSubmit}
      className="bg-green-600 text-white uppercase p-2 rounded-lg hover:opacity-90"
    >
      Continue with google
    </button>
  );
};

export default GoogleAuth;
