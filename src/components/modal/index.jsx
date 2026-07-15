import ReactDOM from "react-dom";
import { useEffect } from "react";
import { useModalStore } from "../../zustand-store/modal-store";
import { ModalCloseIcon } from "../svg";
import { closeModal } from "../../zustand-store/modal-store/actions";
import styles from "./styles.module.scss";
import cn from "classnames";

const Modal = ({
  modalKey,
  title,
  width,
  height,
  maxHeight = "80%",
  maxWidth,
  children,
  onClose = () => {},
  disableClose = false,
  closeIconClassName,
}) => {
  const { storeModalKey } = useModalStore();

  useEffect(() => {
    if (storeModalKey?.length) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [storeModalKey]);

  return ReactDOM.createPortal(
    <>
      {storeModalKey?.some((s) => s === modalKey) && (
        <>
          <section
            className={styles.modalOverLay}
            onClick={() => {
              if (disableClose) return;
              closeModal(modalKey);
              onClose();
            }}
            role="presentation"
          />
          <section
            className={styles.modalWrapper}
            style={{
              width: `${width}`,
              height: `${height}`,
              maxHeight: `${maxHeight}`,
              maxWidth: `${maxWidth}`,
            }}
          >
            {!!title?.length && (
              <div className={styles.titleContainer}>
                <h3 className={styles.title}>{title}</h3>
                <span className={styles.textUnderline} />
              </div>
            )}

            {!disableClose && (
              <ModalCloseIcon
                className={cn(styles.closeIcon, closeIconClassName)}
                onClick={() => {
                  closeModal(modalKey);
                  onClose();
                }}
              />
            )}
            {children}
          </section>
        </>
      )}
    </>,
    document.querySelector("#modal"),
  );
};

export default Modal;
