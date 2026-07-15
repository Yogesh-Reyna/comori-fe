import { InfoIcon } from "../svg";
import cn from "classnames";
import styles from "./styles.module.scss";

const ToolTip = (props) => {
  const {
    top = "50%",
    right,
    bottom,
    left = "100%",
    data,
    maxHeight,
    className,
    stroke,
  } = props;
  return (
    <div className={cn(styles.toolTipContainer, className)}>
      <InfoIcon stroke={stroke} />
      <div
        className={styles.toolTipWrapper}
        style={{
          top: `${top}`,
          right: `${right}`,
          bottom: `${bottom}`,
          left: `${left}`,
          maxHeight: `${maxHeight}`,
        }}
      >
        {data}
      </div>
    </div>
  );
};

export default ToolTip;
