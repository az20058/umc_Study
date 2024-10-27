import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <div style={{ display: "flex", height: "100vh" }}>
        <SideBar />
        <Outlet />
      </div>
    </>
  );
};

export default RootLayout;
