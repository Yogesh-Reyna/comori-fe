import { forwardRef } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

const Button = forwardRef((props, ref) => {
  const {
    label,
    className,
    children,
    isPrimary = true,
    link,
    linkClassname,
    isLoading,
    disabled,
    isBorder,
    isFullWid = true,
    isPaddingMore = false,
    ...restButtonProps
  } = props;

  const ButtonRef = () => {
    return (
      <button
        ref={ref}
        className={cn(
          styles.btnContainer,
          isPrimary ? styles.primaryBtn : styles.secondaryBtn,
          isBorder && styles.isBorder,
          isFullWid ? styles.fullWid : styles.maxContent,
          isPaddingMore && styles.pdBlock,
          className,
        )}
        disabled={isLoading ? true : disabled}
        {...restButtonProps}
      >
        {isLoading ? (
          <p className={styles.loader} />
        ) : (
          <>
            {label} {children}
          </>
        )}
      </button>
    );
  };
  return (
    <>
      {link?.length ? (
        <Link to={link} className={cn(styles.link, linkClassname)}>
          <ButtonRef />
        </Link>
      ) : (
        <ButtonRef />
      )}
    </>
  );
});

export default Button;
