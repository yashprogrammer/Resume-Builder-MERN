import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { BASE_URL } from "../api";

const TestAPIComponent = () => {
  // const userId = useSelector((state) => state.user.id); // assuming user ID is stored in Redux state
  const currentUser = useSelector((state) => state.user.currentUser);

  const testGetAllResumeDataAPI = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/data/get-all-resume-data?id=${currentUser._id}`,
        {
          headers: {
            authorization: currentUser.token,
          },
        }
      );
      console.log("API Response:", response.data); // Log the API response
    } catch (error) {
      console.error("Error fetching resume data:", error);
    }
  };

  useEffect(() => {
    testGetAllResumeDataAPI(); // Call the test function on component load
  }, []);

  return <div>Check console for API response</div>;
};

export default TestAPIComponent;
