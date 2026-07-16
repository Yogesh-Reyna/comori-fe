import styles from "./styles.module.scss";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.compliance}>Fully compliant:</div>

      <div className={styles.certificates}>Certificates</div>

      <div className={styles.links}>
        <a>Terms of Use</a>

        <a>Privacy Policy</a>

        <a>Support</a>
      </div>

      <div>All rights reserved © 2026</div>

      <div>Ver. 1.01</div>
    </footer>
  );
}

export default Footer;
