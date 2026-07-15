import { forwardRef } from "react";
import cn from "classnames";
import styles from "./styles.module.scss";

const Radio = forwardRef((props, ref) => {
  const { customLabel, label, ...restInputProps } = props;
  return (
    <>
      <label className={cn(styles.radioLabel, customLabel)}>
        <input
          type="radio"
          className={styles.radioInput}
          ref={ref}
          {...restInputProps}
        />
        <span className={styles.customRadio} />
        {label}
      </label>
    </>
  );
});

export default Radio;
