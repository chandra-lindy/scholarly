import NavBar from "../components/NavBar";
import LeftPanel from "../components/LeftPanel";
import MainPanel from "../components/MainPanel";
import ChatIcon from "../components/ChatIcon";
import ChatInterface from "../components/ChatInterface";

const Dashboard = () => {
  return (
    <>
      <div className="container flex flex-col m-auto">
        <NavBar />
        <div className="relative flex h-[calc(100vh-3.75rem)] mt-[3.75rem]">
          <LeftPanel />
          <MainPanel />
          {/* <ChatInterface /> */}
          <ChatIcon />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
