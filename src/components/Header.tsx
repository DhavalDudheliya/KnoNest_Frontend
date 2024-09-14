import { MobilesSidebar } from "./MobileSidebar";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "@/contexts/UserContext";
import { useContext } from "react";

const Header = () => {
  const navigate = useNavigate();

  const { user } = useContext(UserContext) || { user: null };

  // Handle logout
  const handleLogout = async () => {
    try {
      const response = await axios.post("/auth/logout");

      if (response.status === 200 || response.data.success) {
        // Redirect to login page or home page after successful logout
        navigate("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <header className="top-0 fixed w-full h-[60px] flex items-center md:px-10 p-4 border-b z-50 shadow-md bg-white">
      <div className="w-full flex items-center justify-between">
        <div className="company-logo font-extrabold text-3xl">KnoNest</div>
        <div className="">
          <input
            type="text"
            className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm"
            placeholder="Search"
          />
        </div>
        <div className="md:flex hidden items-center justify-center gap-4">
          <div>
            {user ? (
              <Button onClick={handleLogout}>Logout</Button>
            ) : (
              <Button onClick={() => navigate("/login")}>Login</Button>
            )}
          </div>
          <div>
            <Avatar>
              <AvatarImage src="/user.png" className="opacity-50" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <div className="md:hidden block">
          <MobilesSidebar />
        </div>
      </div>
    </header>
  );
};

export default Header;
