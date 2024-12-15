import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";

const RootLayout = () => {
  return (
    <div className="root-layout">
      <Navbar />
      <div className="main-container">
        <SideBar />
        <main className="content-area">
          <Outlet />
        </main>
      </div>
      <style>{`
        .root-layout {
          min-height: 100vh;
          background-color: #141414;
          color: #ffffff;
        }
        .main-container {
          display: flex;
          min-height: calc(100vh - 60px);
        }
        .content-area {
          flex: 1;
          padding: 20px;
          overflow-y: auto;
        }
      `}</style>
    </div>
  );
};

export default RootLayout;
