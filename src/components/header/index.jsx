import { NavLink, useLocation } from "react-router-dom";
import styles from "./styles.module.scss";
import logo from "../../assets/images/logo.png";
import { navigationItems } from "../../constants/navigation";
import { MenuIcon, MyAccountIcon, SettingsIcon } from "../svg";

function Header({ onMenuClick }) {
  const location = useLocation();

  const currentPage =
    navigationItems.find((item) => item.path === location.pathname)?.label ??
    "";

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <button
          className={styles.menuButton}
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <MenuIcon />
        </button>

        <figure className={styles.logoWrapper}>
          <img src={logo} alt="Comori logo" className={styles.logo} />
        </figure>
      </div>

      <h1 className={styles.pageTitle}>{currentPage}</h1>

      <nav className={styles.navigation}>
        {navigationItems.map(({ label, path, icon: Icon }) => (
          <NavLink
            key={label}
            to={path}
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ""}`
            }
          >
            <Icon size={24} />

            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className={styles.actions}>
        <button className={styles.iconButton}>
          <MyAccountIcon />
        </button>

        <button className={styles.iconButton}>
          <SettingsIcon />
        </button>
      </div>
    </header>
  );
}

export default Header;
