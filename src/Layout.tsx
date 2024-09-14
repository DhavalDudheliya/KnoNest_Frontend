import { Outlet } from "react-router-dom";
import Header from "./components/Header";

const Layout = () => {
  return (
    <>
      <div>
        <Header />
      </div>
      <main className="h-full pt-[50px]">
        <div className="max-w-[956px] mx-auto pt-6 h-full flex items-center justify-center">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default Layout;
