import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import hippa from "../../assets/images/hippa.png";
import soc2 from "../../assets/images/soc2.png";
import iso from "../../assets/images/iso.png";

const CERTIFICATES = [
  {
    image: hippa,
    alt: "HIPAA",
  },
  {
    image: soc2,
    alt: "SOC 2",
  },
  {
    image: iso,
    alt: "ISO",
  },
];

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.complianceSection}>
        <p className={styles.compliance}>Fully compliant:</p>

        <div className={styles.certificates}>
          {CERTIFICATES.map(({ image, alt }) => (
            <figure key={alt} className={styles.logoWrapper}>
              <img src={image} alt={alt} className={styles.logo} />
            </figure>
          ))}
        </div>
      </div>

      <div className={styles.legalSection}>
        <nav className={styles.links} aria-label="Footer navigation">
          <Link to="/terms-of-use">Terms of Use</Link>
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/support">Support</Link>
        </nav>

        <p className={styles.copyright}>All rights reserved © 2026</p>
        <p className={styles.version}>Ver. 1.01</p>
      </div>
    </footer>
  );
}

export default Footer;
