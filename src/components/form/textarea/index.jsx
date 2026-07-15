import { forwardRef } from "react";
import cn from "classnames";
import ToolTip from "../../tool-tip";
import styles from "../styles.module.scss";

const TextArea = forwardRef((props, ref) => {
  const {
    label,
    children,
    showError,
    errorMessage,
    showIcon,
    className,
    inputExtraClass,
    requiredField,
    disabled,
    parentClassName,
    search,
    onChange,
    showInfoIcon,
    data,
    dynamicIcon,
    uploadAudio,
    ...restInputProps
  } = props;
  return (
    <div className={cn(styles.fieldContainer, parentClassName)}>
      {!!label?.length && (
        <div className={styles.labelInlineItems}>
          <label className={styles.label}>
            {label}
            {requiredField && <sup className={styles.requiredField}>*</sup>}
            {showInfoIcon && <ToolTip data={data} className={styles.ml4} />}
          </label>
          {dynamicIcon && dynamicIcon}
        </div>
      )}
      <div
        className={cn(
          search ? styles.searchInput : styles.inputContainer,
          inputExtraClass,
          disabled && styles.disabled,
          showIcon && styles.inlineIcons
        )}
      >
        <textarea
          ref={ref}
          rows="4"
          cols="30"
          {...restInputProps}
          className={cn(styles.input, className)}
          disabled={disabled}
          onChange={(e) => {
            if (e.target.type !== "file") {
              e.target.value = e?.target?.value
                ?.replace(/\s+/g, " ")
                ?.trimStart();
            }
            onChange && onChange(e);
          }}
        />
        {children}
      </div>
      {showError && <p className="errorMessage">{errorMessage}</p>}
      {uploadAudio && uploadAudio}
    </div>
  );
});

export default TextArea;
