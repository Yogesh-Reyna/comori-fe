import Select from "react-select";
import { forwardRef } from "react";
import cn from "classnames";
import styles from "../styles.module.scss";
import ToolTip from "../../tool-tip";

export const reactSelectStyles = {
  control: (provided) => ({
    ...provided,
    padding: "3px",
    color: "#74788D",
    border: "1px solid #E3E7EC",
    boxShadow: "none",
    "&:hover": {
      border: "1px solid #E3E7EC",
    },
    background: "#F9FAFB",
    fontSize: "14px",
    borderRadius: "6px",
  }),

  indicatorSeparator: () => ({
    display: "none",
    color: "#797979",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    cursor: "pointer",
  }),
  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
  menu: (base) => ({ ...base, zIndex: 9999 }),
  multiValueRemove: (base) => ({
    ...base,
    cursor: "pointer",
  }),
};

export const CustomSelect = forwardRef((props, ref) => {
  const {
    label,
    showError,
    errorMessage,
    maxMenuHeight = 130,
    components,
    requiredField,
    parentClassName,
    isMulti = true,
    showInfoIcon,
    data,
    dynamicIcon,
    labelIcon,
    labelClassName,
    ...restSelectProps
  } = props;
  return (
    <div className={cn(styles.fieldContainer, parentClassName)}>
      {label?.length && (
        <div className={styles.labelInlineItems}>
          <label className={cn(styles.label, labelClassName)}>
            {label}
            {requiredField && <sup className={styles.requiredField}>*</sup>}
            {/* {labelIcon && labelIcon} */}
            {labelIcon && <span className={styles.ml4}>{labelIcon}</span>}
            {showInfoIcon && <ToolTip data={data} className={styles.ml4} />}
          </label>
          {dynamicIcon && dynamicIcon}
        </div>
      )}
      <Select
        components={components}
        ref={ref}
        styles={reactSelectStyles}
        maxMenuHeight={maxMenuHeight}
        isMulti={isMulti}
        menuPortalTarget={document.body}
        {...restSelectProps}
      />
      {showError && <p className="errorMessage">{errorMessage}</p>}
    </div>
  );
});
