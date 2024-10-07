import {Outlet} from "react-router-dom";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";

const RootLayout = () => {
    return (
        <>  
            <Navbar/>
            <div style={{display:"flex", height: "1300px"}}>
                <SideBar/>
                <Outlet/>
            </div>
        </>
    );
};

export default RootLayout;