import { Outlet, useMatches } from "react-router-dom";
import { useState } from "react";

import Header from "../header";
import Sidebar from "../sidebar";
import Footer from "../footer";

import styles from "./styles.module.scss";

function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const matches = useMatches();

  const currentRoute = matches[matches.length - 1];

  const showFooter = currentRoute?.handle?.showFooter ?? true;

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

      {showFooter && <Footer />}
    </div>
  );
}

export default MainLayout;
