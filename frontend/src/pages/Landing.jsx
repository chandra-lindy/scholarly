import NavBar from "../components/NavBar";
import Hero from "../components/Hero";

import axios from "axios";
import { useEffect } from "react";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Landing = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(`${BACKEND_URL}/`);
        console.log("process.env: ", process.env);
        const response = await axios.get(`${BACKEND_URL}/`);
        console.log("response: ", response.data);
      } catch (error) {
        console.log("error: ", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col">
      <NavBar />
      <Hero />
    </div>
  );
};

export default Landing;
