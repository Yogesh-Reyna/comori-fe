import Button from "../button";
import styles from "./styles.module.scss";

import logo from "../../assets/images/logo.png";

// import { CalendarDays, Database, Utensils, BookOpen } from "lucide-react";

function Header({ onMenuClick }) {
  const menuItems = [
    {
      label: "Today",
      // icon: CalendarDays,
    },
    {
      label: "My Data",
      // icon: Database,
    },
    {
      label: "My Meals",
      // icon: Utensils,
    },
    {
      label: "Knowledge Hub",
      // icon: BookOpen,
    },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.mobileMenu}>
        <Button label="Menu" onClick={onMenuClick} />
      </div>

      <figure className={styles.logoWrapper}>
        <img src={logo} alt="Comori logo" className={styles.logo} />
      </figure>

      <nav className={styles.navigation}>
        {menuItems?.map(({ label, icon: Icon }) => (
          <button
            key={label}
            className={`${styles.navItem} ${
              label === "Today" ? styles.active : ""
            }`}
          >
            {/* <Icon size={24} /> */}

            <span>{label}</span>
          </button>
        ))}
      </nav>

      <div className={styles.actions}>
        <button>Profile</button>

        <button>Settings</button>
      </div>
    </header>
  );
}

export default Header;
