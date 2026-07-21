import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import cn from "classnames";

import styles from "./styles.module.scss";

function ExpandableMenu({
  menu,
  variant = "accordion",
  onClose,
  iconOnly = false,
  scrollContainer = null,
  defaultOpen = false,
}) {
  const navigate = useNavigate();

  const menuRef = useRef(null);

  const [isOpen, setIsOpen] = useState(defaultOpen);

  const ParentIcon = menu?.icon;

  const toggleMenu = () => {
    setIsOpen((previous) => !previous);
  };

  /*
    Handles auto scrolling inside
    custom scroll containers like Sidebar
  */

  useEffect(() => {
    if (!isOpen || !scrollContainer?.current || !menuRef.current) {
      return;
    }

    const timer = setTimeout(() => {
      const container = scrollContainer.current;

      const element = menuRef.current;

      const offset = element.offsetTop - container.offsetTop - 80;

      container.scrollTo({
        top: offset,

        behavior: "smooth",
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [isOpen, scrollContainer]);

  const handleChildClick = (item) => {
    if (item.action === "logout") {
      onClose?.();

      setIsOpen(false);

      return;
    }

    if (item.path) {
      navigate(item.path);
    }

    setIsOpen(false);

    onClose?.();
  };

  return (
    <div ref={menuRef} className={cn(styles.wrapper, styles[variant])}>
      <button
        type="button"
        className={cn(styles.parentButton, iconOnly && styles.iconOnly)}
        onClick={toggleMenu}
      >
        {ParentIcon && <ParentIcon size={24} />}

        {!iconOnly && <span>{menu.label}</span>}
      </button>

      <div className={cn(styles.children, isOpen && styles.childrenOpen)}>
        {menu.children?.map((child) => {
          const ChildIcon = child.icon;

          /*
              Action based item
              Example: Sign Out
            */

          if (child.action) {
            return (
              <button
                key={child.label}
                type="button"
                className={styles.childButton}
                onClick={() => handleChildClick(child)}
              >
                {ChildIcon && <ChildIcon size={20} />}

                <span>{child.label}</span>
              </button>
            );
          }

          return (
            <NavLink
              key={child.label}
              to={child.path}
              onClick={() => handleChildClick(child)}
              className={({ isActive }) =>
                cn(styles.childButton, isActive && styles.activeChild)
              }
            >
              {ChildIcon && <ChildIcon size={20} />}

              <span>{child.label}</span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

export default ExpandableMenu;
