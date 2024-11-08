import React, { useState } from "react";
import { app } from "../../firebase";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../../redux/userSlice";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../../api";
import { motion } from "framer-motion";
import { CircularProgress } from "@mui/material";

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleGoogle = async () => {
    try {
      dispatch(signInStart());
      setLoading(true);
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      // console.log(result?.user);
      const formData = {
        username: result?.user?.displayName,
        email: result?.user?.email,
        avatar: result?.user?.photoURL,
      };
      const response = await axios.post(
        `${BASE_URL}/auth/google-sign-in`,
        formData
      );
      console.log(response?.data?.user);
      dispatch(signInSuccess(response?.data?.user));
      toast.success(response?.data?.message, {
        position: "top-left",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      console.log(error);
      dispatch(signInFailure(error.message));
      toast.error("Login failed. Please try again.", {
        position: "top-left",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const Bubble = ({ size, color }) => {
    const generateRandomPosition = () => ({
      x: Math.random() * (window.innerWidth - size),
      y: Math.random() * (window.innerHeight - size),
    });

    const transition = {
      duration: 17, // Increased duration for slower movement
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
    };

    return (
      <motion.div
        initial={generateRandomPosition()}
        animate={generateRandomPosition()}
        transition={transition}
        style={{
          position: "absolute",
          width: size,
          height: size,
          backgroundColor: color,
          borderRadius: "50%",
          border: "2px solid rgba(0, 0, 0, 0.1)",
        }}
      />
    );
  };

  const bubbles = Array.from({ length: 15 }).map((_, index) => (
    <Bubble
      key={index}
      size={Math.random() * 100 + 30}
      color={`hsla(${Math.random() * 360}, 100%, 80%, 0.7)`}
    />
  ));

  return (
    <div style={styles.container} className="text-center">
      <div>
        <button style={styles.button} onClick={handleGoogle}>
          {loading ? (
            <CircularProgress size={28} />
          ) : (
            <>
              <p style={styles.text}>Build your Resume</p>
            </>
          )}
        </button>
        <button style={styles.button} onClick={handleGoogle}>
          {loading ? (
            <CircularProgress size={28} />
          ) : (
            <>
              <p style={styles.text}>Analyse your resume</p>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    height: "85vh",
    justifyContent: "space-evenly",
    // overflow: 'hidden',
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "12px 21px",
    borderRadius: "5px",
    marginLeft: "60px",
    border: "black 2px solid",
    backgroundColor: "#fff",
    color: "#fff",
    cursor: "pointer",
    width: "320px",
    zIndex: 1,
  },
  text: {
    fontSize: "18px",
    fontWeight: "700",
    margin: "0",
    color: "#000",
  },
  icon: {
    marginRight: "10px",
    width: "24px",
    height: "24px",
  },
};
