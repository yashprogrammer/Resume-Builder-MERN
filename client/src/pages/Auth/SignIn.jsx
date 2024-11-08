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

  const handleAnalyzeRedirect = () => {
    navigate("/resume-analyzer"); // Redirect to the "Analyse your resume" page
  };

  const handleBuilderRedirect = () => {
    navigate("/profile"); // Redirect to the "Analyse your resume" page
  };

  return (
    <div style={styles.container} className="text-center">
      <div
        style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            paddingLeft: "40px",
            paddingRight: "40px",
            marginBottom: "30px",
            lineHeight: "1.5",
          }}
        >
          <span style={{ marginBottom: "20px" }}>Welcome to SmartResume</span>{" "}
          <br />
          Where your skills meet AI-driven insights to create and analyze a
          resume that stands out. <br /> Let’s build your path to success!
        </h2>

        <div>
          <button style={styles.button} onClick={handleBuilderRedirect}>
            {loading ? (
              <CircularProgress size={28} />
            ) : (
              <p style={styles.text}>Build your Resume</p>
            )}
          </button>
          <button style={styles.button} onClick={handleAnalyzeRedirect}>
            {loading ? (
              <CircularProgress size={28} />
            ) : (
              <p style={styles.text}>Analyse your resume</p>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "85vh",
    justifyContent: "space-evenly",
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "12px 21px",
    borderRadius: "50px",
    backgroundColor: "#EBCA37",
    color: "#fff",
    cursor: "pointer",
    width: "320px",
    zIndex: 1,
    marginBottom: "25px",
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
