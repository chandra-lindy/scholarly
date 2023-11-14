import NavBarDash from "../components/NavBarDash";
import LeftPanel from "../components/LeftPanel";
import MainPanel from "../components/MainPanel";
import ChatDisplay from "../components/ChatDisplay";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";

const Dashboard = () => {
  const [selectedFile, setSelectedFile] = useState({ title: "", file: null });

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await Auth.currentAuthenticatedUser();
      } catch {
        navigate("/login");
      }
    };

    checkAuth();
  }, [navigate]);

  return (
    <div className="container flex flex-col m-auto">
      <NavBarDash />
      <div className="relative flex h-[calc(100vh-3.65rem)] mt-[3.65rem]">
        <LeftPanel setSelectedFile={setSelectedFile} />
        <MainPanel selectedFile={selectedFile} />
        <ChatDisplay selectedFile={selectedFile} />
      </div>
    </div>
  );
};

export default Dashboard;
