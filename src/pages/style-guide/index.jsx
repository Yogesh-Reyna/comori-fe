import styles from "./styles.module.scss";

const colorItems = [
  {
    name: "Primary",
    className: styles.primary,
  },
  {
    name: "Background",
    className: styles.background,
  },
  {
    name: "Text Primary",
    className: styles.textPrimary,
  },
  {
    name: "Text Secondary",
    className: styles.textSecondary,
  },
  {
    name: "Success",
    className: styles.success,
  },
  {
    name: "Error",
    className: styles.error,
  },
];

const spacingItems = [
  "spacing-1",
  "spacing-2",
  "spacing-3",
  "spacing-4",
  "spacing-6",
  "spacing-8",
];

const radiusItems = [
  "radius-sm",
  "radius-md",
  "radius-lg",
  "radius-xl",
  "radius-full",
];

const shadowItems = ["shadow-sm", "shadow-base", "shadow-md", "shadow-lg"];

const StyleGuide = () => {
  return (
    <div className={styles.page}>
      <section className={styles.section}>
        <h1 className={styles.heading}>CoMori Design System</h1>

        <p className={styles.description}>
          Reference page for typography, colors, spacing, components and
          reusable styles.
        </p>
      </section>

      {/* Typography */}

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Typography</h2>

        <h1 className={styles.hero}>Heading Large</h1>
        <h1 className={styles.headingdifferentsize}>
          Heading Different Size Large
        </h1>

        <h2 className={styles.headingSmall}>Heading Small</h2>

        <p className={styles.bodyText}>
          This is regular body text used across the application.
        </p>

        <span className={styles.smallText}>Small supporting text</span>
      </section>

      {/* Colors */}

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Colors</h2>

        <div className={styles.colorGrid}>
          {colorItems.map((item) => (
            <div key={item.name} className={styles.colorCard}>
              <div className={`${styles.colorBox} ${item.className}`} />

              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Buttons */}

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Buttons</h2>

        <div className={styles.row}>
          <button className={styles.primaryButton}>Primary Button</button>

          <button className={styles.secondaryButton}>Secondary Button</button>

          <button className={styles.dangerButton}>Delete</button>
        </div>
      </section>

      {/* Inputs */}

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Inputs</h2>

        <div className={styles.form}>
          <input className={styles.input} placeholder="Enter name" />

          <input className={styles.inputError} placeholder="Error state" />
        </div>
      </section>

      {/* Cards */}

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Cards</h2>

        <div className={styles.cardGrid}>
          <div className={styles.card}>
            <h3>Dashboard Card</h3>

            <p>Reusable container example.</p>
          </div>

          <div className={styles.card}>
            <h3>Statistics</h3>

            <p>Another reusable surface.</p>
          </div>
        </div>
      </section>

      {/* Radius */}

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Border Radius</h2>

        <div className={styles.radiusGrid}>
          {radiusItems.map((item) => (
            <div key={item} className={`${styles.radiusBox} ${styles[item]}`}>
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* Shadows */}

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Shadows</h2>

        <div className={styles.shadowGrid}>
          {shadowItems.map((item) => (
            <div key={item} className={`${styles.shadowBox} ${styles[item]}`}>
              {item}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default StyleGuide;
