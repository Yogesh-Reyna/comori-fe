import { Outlet } from "react-router-dom";
import Header from "../header";
import Sidebar from "../sidebar";

function MainLayout() {
  return (
    <>
      <Sidebar />
      <div>
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default MainLayout;
