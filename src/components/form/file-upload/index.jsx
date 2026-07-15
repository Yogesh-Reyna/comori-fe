// /* eslint-disable jsx-a11y/media-has-caption */
import { useEffect, useRef, useState } from "react";
import { ModalCloseIcon, UploadIcon } from "../../svg";
import fileUploadStyles from "./styles.module.scss";
import {
  setMessage,
  setStatus,
} from "../../../zustand-store/toastMessages-store/actions";
import { Controller, useForm } from "react-hook-form";
import ToolTip from "../../tool-tip";
import styles from "../styles.module.scss";

const FileUpload = (props) => {
  const {
    label,
    requiredField,
    fileSize = 50,
    onFileChange,
    accept = "image/*,video/*",
    fileUpload = null,
    fileType,
    errorMessage,
    register,
    fileKey = "file",
    fileValidations,
    showInfoIcon,
    data,
    subTitle = "Supported formats: PNG, JPEG, Max 50 MB",
    isBase64 = false,
    extraText,
    // fileInfo,
    disabled = false,
  } = props;
  const maxFileSize = fileSize * 1024 * 1024;
  const inputRef = useRef();
  const [file, setFile] = useState(null);

  console.log('file', file)

  const { control } = useForm();
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
        setFile(null);
      } else if (fileType && !fileType.includes(uploadedFile?.type)) {
        setMessage("Please select valid file");
        setStatus(false);
      } else {
        setFile(uploadedFile);
        if (onFileChange) {
          if (isBase64) {
            const value = await getBase64FromFile(uploadedFile);
            onFileChange(value);
          } else {
            onFileChange(uploadedFile);
          }
        }
      }
    }
  };
  useEffect(() => {
    setFile(fileUpload);
  }, [fileUpload]);

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFiles = e.dataTransfer.files[0];
    if (onFileChange) {
      onFileChange(droppedFiles);
    }
    e.dataTransfer.clearData();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
  };
  return (
    <div className={styles.fieldContainer}>
      {label?.length && (
        <>
          <label className={styles.label}>
            {label}
            {requiredField && <sup className={styles.requiredField}>*</sup>}
            {showInfoIcon && <ToolTip data={data} className={styles.ml4} />}
          </label>
          {/* <label className={fileUploadStyles.fileInfoStyle}>{fileInfo}</label> */}
        </>
      )}
      {extraText?.length && <p className={styles.extraTexts}>{extraText}</p>}
      <div
        className={fileUploadStyles.fileUploadContainer}
        onDrop={(e) => handleDrop(e)}
        onDragOver={(e) => handleDragOver(e)}
        onDragLeave={(e) => handleDragLeave(e)}
      >
        {file ? (
          <div className={fileUploadStyles.imageWrapper}>
            {file?.type?.startsWith("image/") ? (
              <img src={URL.createObjectURL(file)} alt="" />
            ) : file?.type?.startsWith("video/") ? (
              <video controls width="100%">
                <source src={URL.createObjectURL(file)} type={file.type} />
                <track default kind="subtitles" srcLang="en" src="" />
                Your browser does not support the video tag.
              </video>
            ) : file?.type?.startsWith("audio/") ? (
              <audio controls>
                <source src={URL.createObjectURL(file)} type={file.type} />
                <track default kind="metadata" srcLang="en" src="" />
                Your browser does not support the audio tag.
              </audio>
            ) : file?.type?.startsWith("application/") ? (
              <iframe
                src={URL.createObjectURL(file)}
                width="100%"
                title={file.type}
              />
            ) : fileType === "audio" ? (
              <audio controls>
                <source src={file} type={file.type} />
                <track default kind="metadata" srcLang="en" src="" />
                Your browser does not support the audio tag.
              </audio>
            ) : fileType === "image" ? (
              <img src={file} alt="" />
            ) : fileType === "video" ? (
              <video controls width="100%">
                <source src={file} type={file.type} />
                <track default kind="subtitles" srcLang="en" src="" />
                Your browser does not support the video tag.
              </video>
            ) : fileType === "pdf" ? (
              <iframe src={file} width="100%" title={file.type} />
            ) : null}
            <ModalCloseIcon
              className={fileUploadStyles.closeIcon}
              onClick={() => {
                setFile(null);
                if (onFileChange) {
                  onFileChange(null);
                }
              }}
            />
          </div>
        ) : (
          <div
            className={fileUploadStyles.uploadWrapper}
            onClick={() => {
              if (!disabled) {
                inputRef.current.click();
              }
            }}
            role="presentation"
          >
            <UploadIcon />
            <div className={styles.uploadDetailsContainer}>
              <p className={fileUploadStyles.chooseFile}>
                <strong>
                  Drag & drop files or{" "}
                  <span className={fileUploadStyles.choose}> Browse</span>
                </strong>{" "}
              </p>
              <p className={fileUploadStyles.fileSize}>{subTitle}</p>
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
                  required: requiredField ? true : false,
                  validate: fileValidations,
                })}
              />
            </div>
          </div>
        )}
      </div>
      {errorMessage?.length > 0 && (
        <p className="errorMessage">{errorMessage}</p>
      )}
    </div>
  );
};

export default FileUpload;
