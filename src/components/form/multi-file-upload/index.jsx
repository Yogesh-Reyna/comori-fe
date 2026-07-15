import React, { useEffect, useRef, useState } from "react";
import Modal from "../../modal";
import { viewUploadFile } from "../../../constants/modalKeys";
import ViewUploadFile from "../view-uploadFile";
import { openModal } from "../../../zustand-store/modal-store/actions";
import fileUploadStyles from "./styles.module.scss";
import styles from "../styles.module.scss";
import {
  setMessage,
  setStatus,
} from "../../../zustand-store/toastMessages-store/actions";
import ToolTip from "../../tool-tip";
import { DeleteIcon, EyeIcon, UploadIcon } from "../../svg";
import UploadAudio from "../../upload-audio";
import { Controller, useForm } from "react-hook-form";
import {
  base64ToFile,
  setLongFileName,
  // getFileSIzeFromBase64,
} from "../../../utils/base64ToFile";
import { useTranslation } from "react-i18next";

const MultipleFileUpload = (props) => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState("");
  const [uploadFileKey, setUploadFileKey] = useState("");
  const { t } = useTranslation();
  const {
    label,
    requiredField,
    fileSize = 50,
    onFileChange,
    accept = "image/*,video/*",
    fileType,
    showInfoIcon,
    data,
    subTitle = t("titles.supportedFormats"),
    extraText,
    fileUpload = [],
    isBase64 = false,
    isAudio = false,
    isRequiredField = false,
    register,
    fileKey,
    errorMessage,
  } = props;
  const maxFileSize = fileSize * 1024 * 1024;
  const inputRef = useRef();
  const { control } = useForm();

  const getFileSize = (fileSize) => {
    if (fileSize < 1024) {
      return `${fileSize} Bytes`;
    } else if (fileSize < 1024 * 1024) {
      return `${(fileSize / 1024)?.toFixed(2)} KB`;
    } else {
      return `${(fileSize / (1024 * 1024))?.toFixed(2)} MB`;
    }
  };

  const getBase64FromFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result); // full base64 data URL
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file); // converts to full base64 URL
    });
  };

  const handleUpload = async (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      if (uploadedFile.size > maxFileSize) {
        setMessage(`File size exceeds ${maxFileSize / (1024 * 1024)}MB.`);
      } else if (fileType && !fileType.includes(uploadedFile?.type)) {
        setMessage("Please select valid file");
        setStatus(false);
      } else {
        const uploadedItems = [...files, uploadedFile];
        setFiles(uploadedItems);
        if (onFileChange) {
          if (isBase64) {
            const value = await getBase64FromFile(uploadedFile);
            const uploadedItemsList = [...files, value];
            onFileChange(uploadedItemsList);
          } else {
            onFileChange(uploadedItems);
          }
        }
      }
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFiles = e.dataTransfer.files[0];
    const uploadedItems = [...files, droppedFiles];
    if (onFileChange) {
      onFileChange(uploadedItems);
    }
    e.dataTransfer.clearData();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    const isEqual =
      files?.length === fileUpload?.length &&
      files?.every((f, i) => f === fileUpload[i]);

    if (!isEqual) {
      setFiles(fileUpload);
    }
  }, [fileUpload]);

  const removeFile = (indexValue) => {
    const removeFilterList = files?.filter((_, index) => {
      return indexValue !== index;
    });
    setFiles(removeFilterList);
    onFileChange(removeFilterList);
  };

  const handleAudio = () => {
    inputRef?.current?.click();
  };

  return (
    <>
      <div className={styles.fieldContainer}>
        {label?.length && (
          <>
            <label className={styles.label}>
              {label}
              {requiredField && <sup className={styles.requiredField}>*</sup>}
              {showInfoIcon && <ToolTip data={data} className={styles.ml4} />}
            </label>
          </>
        )}
        {extraText?.length && <p className={styles.extraTexts}>{extraText}</p>}

        <div
          className={
            isAudio
              ? fileUploadStyles.audioUploadContainer
              : fileUploadStyles.fileUploadContainer
          }
        >
          {isAudio ? (
            <>
              <div>
                <UploadAudio handleAudioFile={handleAudio} />
                {register ? (
                  <Controller
                    name="fileInput"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="file"
                        ref={(e) => {
                          field.ref(e);
                          inputRef.current = e;
                        }}
                        onChange={(e) => {
                          field.onChange(e);
                          handleUpload(e);
                          e.target.value = null;
                        }}
                        style={{ display: "none" }}
                        accept={accept}
                      />
                    )}
                    {...register(fileKey, {
                      required: isRequiredField ? true : false,
                    })}
                  />
                ) : (
                  <input
                    type="file"
                    style={{ display: "none" }}
                    accept={accept}
                    ref={inputRef}
                    onChange={(e) => {
                      handleUpload(e);
                      e.target.value = null;
                    }}
                  />
                )}
              </div>
              {errorMessage?.length > 0 && (
                <p className="errorMessage">{errorMessage}</p>
              )}
            </>
          ) : (
            <div
              className={fileUploadStyles.fileUploadFiled}
              onDrop={(e) => handleDrop(e)}
              onDragOver={(e) => handleDragOver(e)}
              onDragLeave={(e) => handleDragLeave(e)}
            >
              <div
                className={fileUploadStyles.uploadWrapper}
                onClick={() => {
                  inputRef.current.click();
                }}
                role="presentation"
              >
                <UploadIcon />
                <div className={styles.uploadDetailsContainer}>
                  <p className={fileUploadStyles.chooseFile}>
                    <strong>
                      {t("titles.dragDropFiles")}{" "}
                      <span className={fileUploadStyles.choose}>
                        {t("titles.browse")}
                      </span>
                    </strong>{" "}
                  </p>
                  <p className={fileUploadStyles.subTitle}>{subTitle}</p>
                  {register ? (
                    <Controller
                      name="fileInput"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="file"
                          ref={(e) => {
                            field.ref(e);
                            inputRef.current = e;
                          }}
                          onChange={(e) => {
                            field.onChange(e);
                            handleUpload(e);
                            e.target.value = null;
                          }}
                          style={{ display: "none" }}
                          accept={accept}
                        />
                      )}
                      {...register(fileKey, {
                        required: isRequiredField ? true : false,
                      })}
                    />
                  ) : (
                    <input
                      type="file"
                      ref={inputRef}
                      onChange={(e) => {
                        handleUpload(e);
                        e.target.value = null;
                      }}
                      style={{ display: "none" }}
                      accept={accept}
                    />
                  )}
                </div>
              </div>
            </div>
          )}

          {files?.length > 0 &&
            files?.map((file, index) => {
              const fileSize = file?.size ? getFileSize(file?.size) : "";
              const base64ToFileData =
                isBase64 && !file?.size ? base64ToFile(file) : "";
              const base64FileSize = getFileSize(base64ToFileData?.size);
              return (
                <div className={fileUploadStyles.fileItemContainer} key={index}>
                  <p className={fileUploadStyles.fileNameTxt}>
                    {`${
                      file?.name
                        ? setLongFileName(file?.name)
                        : base64ToFileData?.name
                        ? setLongFileName(base64ToFileData?.name)
                        : "File"
                    }`}{" "}
                    <span className={fileUploadStyles.sizeText}>
                      {fileSize
                        ? ` (${fileSize})`
                        : `(${base64FileSize})` ?? ""}
                    </span>
                  </p>
                  <div className={fileUploadStyles.iconContainer}>
                    <EyeIcon
                      onClick={() => {
                        if (isBase64) {
                          const base64ToFileData = base64ToFile(file);
                          setSelectedFile(base64ToFileData);
                        } else {
                          setSelectedFile(file);
                        }
                        openModal(viewUploadFile);
                        setUploadFileKey(fileKey);
                      }}
                    />
                    <DeleteIcon
                      className={fileUploadStyles.closeIcon}
                      onClick={() => {
                        removeFile(index);
                      }}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {fileKey === uploadFileKey && (
        <Modal
          modalKey={viewUploadFile}
          title={"View File"}
          width={"50%"}
          maxHeight="90%"
          onClose={() => setUploadFileKey("")}
        >
          <ViewUploadFile file={selectedFile} />
        </Modal>
      )}
    </>
  );
};

export default MultipleFileUpload;
