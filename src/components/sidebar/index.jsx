import styles from "./styles.module.scss";

function Sidebar({ isOpen, onClose }) {
  const menuItems = [
    "Today",
    "My Data",
    "My Meals",
    "Knowledge Hub",
    "My Account",
    "Settings",
  ];

  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={onClose} />}

      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <button className={styles.close} onClick={onClose}>
          ×
        </button>

        <h3>Good Morning Daniel!</h3>

        <nav>
          {menuItems.map((item) => (
            <div key={item} className={styles.item}>
              {item}
            </div>
          ))}
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
