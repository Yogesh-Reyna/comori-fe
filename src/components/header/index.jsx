import { NavLink, useMatches } from "react-router-dom";

import styles from "./styles.module.scss";
import logo from "../../assets/images/logo.png";

import { navigationItems } from "../../constants/navigation";

import { MenuIcon } from "../svg";
import ExpandableMenu from "../expandable-menu";

function Header({ onMenuClick }) {
  const matches = useMatches();

  const currentPage =
    matches
      .map((match) => match.handle?.title)
      .filter(Boolean)
      .at(-1) ?? "";

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
        {navigationItems
          .filter((item) => !item.children)
          .map(({ label, path, icon: Icon }) => (
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
        {navigationItems
          .filter((item) => item.children?.length)
          .map((menu) => (
            <ExpandableMenu
              key={menu.label}
              menu={menu}
              variant="dropdown"
              iconOnly
            />
          ))}
      </div>
    </header>
  );
}

export default Header;
