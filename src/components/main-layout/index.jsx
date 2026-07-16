import { useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "../header";
import Sidebar from "../sidebar";
import Footer from "../footer";

import styles from "./styles.module.scss";

function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className={styles.layout}>
      <Header onMenuClick={() => setIsSidebarOpen(true)} />

      <div className={styles.body}>
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <main className={styles.content}>
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default MainLayout;
