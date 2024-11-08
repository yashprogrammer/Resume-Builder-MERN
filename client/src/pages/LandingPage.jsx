import React, { useEffect } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import "../styles/LandingPage.css";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import { useDispatch, useSelector } from "react-redux";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { signInFailure, signInStart, signInSuccess } from "../redux/userSlice";
import { BASE_URL } from "../api";
import axios from "axios";

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#ff6f61" },
    background: { default: "#ffecd6" },
    text: { primary: "#333333", secondary: "#555555" },
  },
});

export default function LandingPage() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // If user is logged in, redirect to the sign-in route
    if (currentUser) {
      navigate("/sign-in");
    }
  }, [currentUser, navigate]);

  const handleGoogleSignIn = async () => {
    try {
      dispatch(signInStart());
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      const result = await signInWithPopup(auth, provider);
      const formData = {
        username: result.user.displayName,
        email: result.user.email,
        avatar: result.user.photoURL,
      };
      const response = await axios.post(
        `${BASE_URL}/auth/google-sign-in`,
        formData
      );
      dispatch(signInSuccess(response.data.user));
      navigate("/sign-in");
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      dispatch(signInFailure(error.message));
    }
  };

  const handleGetStarted = () => {
    // If user is not logged in, initiate Google Sign-In
    handleGoogleSignIn();
  };

  return (
    <ThemeProvider theme={theme}>
      <Box className="box-container">
        <div style={{ color: "black" }}>
          <div className="img-container">
            <div className="image-container-1">
              <img src={img1} alt="image1" className="image-style-1" />
            </div>
            <div className="image-container-2">
              <img src={img2} alt="image1" className="image-style-2" />
            </div>
            <div className="image-container-3">
              <img src={img3} alt="image1" className="image-style-3" />
            </div>
          </div>
          <div>
            <div className="overlay-text">
              <Container maxWidth="md">
                <motion.div
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                >
                  <Typography
                    variant="h2"
                    component="h1"
                    gutterBottom
                    sx={{ fontWeight: "800" }}
                  >
                    Build & Analyse Your Professional Resume
                  </Typography>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  <Typography variant="h5" component="h1" gutterBottom>
                    Create a resume that stands out with our easy-to-use Builder
                    and Analyser
                  </Typography>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1 }}
                >
                  <Button
                    onClick={handleGetStarted}
                    variant="outlined"
                    sx={{
                      borderRadius: "30px",
                      color: "black",
                      backgroundColor: "var(--btnColor)",
                      "&:hover": {
                        backgroundColor: "var(--landBtnHover)",
                        border: "none",
                      },
                      border: "none",
                      fontWeight: 600,
                    }}
                    size="large"
                  >
                    Get Started
                  </Button>
                </motion.div>
              </Container>
            </div>
          </div>
        </div>
      </Box>
    </ThemeProvider>
  );
}
