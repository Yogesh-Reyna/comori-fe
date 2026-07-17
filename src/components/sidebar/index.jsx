import { NavLink } from "react-router-dom";
import styles from "./styles.module.scss";
import { CloseIcon, MyAccountIcon, SettingsIcon } from "../svg";
import { navigationItems } from "../../constants/navigation";

function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={onClose} />}

      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <CloseIcon className={styles.close} onClick={onClose} />
        <h3>Good Morning Daniel!</h3>

        <nav className={styles.navigation}>
          {navigationItems.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={label}
              to={path}
              onClick={onClose}
              className={({ isActive }) =>
                `${styles.item} ${isActive ? styles.active : ""}`
              }
            >
              <Icon size={24} />

              <span>{label}</span>
            </NavLink>
          ))}

          <button className={styles.item}>
            <MyAccountIcon />
            <span>My Account</span>
          </button>

          <button className={styles.item}>
            <SettingsIcon />
            <span>Settings</span>
          </button>
        </nav>

        <div className={styles.bottom}>
          <div>Fully compliant:</div>
          <div className={styles.certificates}>Certificates</div>
          <div className={styles.links}>
            Terms of Use | Privacy Policy | Support
          </div>
          <div>All rights reserved © 2026</div>
          <div>Ver. 1.01</div>
          <button>Sign Out</button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
