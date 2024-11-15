import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { CircularProgress } from "@mui/material";

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const currentUser = useSelector((state) => state.user.currentUser); // Assuming currentUser is already in Redux after login

  // Function to fetch resume data and save it to Redux
  const fetchResumeData = async () => {
    if (!currentUser) {
      toast.error("User not logged in");
      return;
    }

    try {
      setLoading(true);
      dispatch(signInStart());

      // Fetch user's resume data
      const response = await axios.get(
        `${BASE_URL}/data/get-all-resume-data?id=${currentUser._id}`,
        {
          headers: {
            authorization: currentUser.token,
          },
        }
      );

      // Update currentUser in Redux to include resume data
      const updatedUser = {
        ...currentUser,
        resumeData: response.data.resumeData,
      };
      dispatch(signInSuccess(updatedUser));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching resume data:", error);
      toast.error("Failed to fetch resume data");
      dispatch(signInFailure(error.message));
      setLoading(false);
    }
  };

  // Handle redirect to Resume Builder (Profile) after fetching resume data
  const handleBuilderRedirect = async () => {
    await fetchResumeData();
    navigate("/profile");
  };

  // Handle redirect to Resume Analyzer after fetching resume data
  const handleAnalyzeRedirect = async () => {
    await fetchResumeData();
    navigate("/resume-analyzer");
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
          <button
            style={styles.button}
            onClick={handleBuilderRedirect}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={28} />
            ) : (
              <p style={styles.text}>Build your Resume</p>
            )}
          </button>
          <button
            style={styles.button}
            onClick={handleAnalyzeRedirect}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={28} />
            ) : (
              <p style={styles.text}>Analyze your Resume</p>
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
};
