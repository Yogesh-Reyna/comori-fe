import React, { forwardRef } from "react";
import cn from "classnames";
import styles from "../styles.module.scss";

const CheckInput = forwardRef((props, ref) => {
  const { customLabel, label, customCheckboxClass, ...restInputProps } = props;
  return (
    <label className={cn(styles.checkboxLabel, customLabel)}>
      {label}
      <input
        type="checkbox"
        className={styles.checkboxInput}
        ref={ref}
        {...restInputProps}
      />
      <span className={cn(styles.customCheckbox, customCheckboxClass)} />
    </label>
  );
});

export default CheckInput;
