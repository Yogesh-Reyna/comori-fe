import { useRef } from "react";
import { NavLink } from "react-router-dom";
import styles from "./styles.module.scss";
import { CloseIcon } from "../svg";
import { navigationItems } from "../../constants/navigation";
import ExpandableMenu from "../expandable-menu";
import Footer from "../footer";

const Sidebar = ({ isOpen, onClose }) => {
  const navigationRef = useRef(null);

  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={onClose} />}

      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <CloseIcon className={styles.close} onClick={onClose} />
        <h3>Good Morning Daniel!</h3>

        <nav ref={navigationRef} className={styles.navigation}>
          {navigationItems.map((item) => {
            if (item.children?.length) {
              return (
                <ExpandableMenu
                  key={item.label}
                  menu={item}
                  variant="accordion"
                  onClose={onClose}
                  scrollContainer={navigationRef}
                />
              );
            }
            const Icon = item.icon;
            return (
              <NavLink
                key={item.label}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `${styles.item} ${isActive ? styles.active : ""}`
                }
              >
                {Icon && <Icon size={24} />}
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className={styles.footerWrapper}>
          <Footer />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
