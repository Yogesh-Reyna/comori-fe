import React, { useEffect, useRef, useState } from "react";
import UploadAudio from "../../upload-audio";
import { ModalCloseIcon } from "../../svg";
import {
  setMessage,
  setStatus,
} from "../../../zustand-store/toastMessages-store/actions";
import audioUploadStyles from "./styles.module.scss";
import { Controller, useForm } from "react-hook-form";

const AudioUpload = (props) => {
  const {
    fileType,
    fileSize,
    accept,
    register,
    fileKey,
    isRequiredField = false,
    errorMessage,
    onFileChange,
    fileUpload = null,
    isMulti = false,
  } = props;
  const inputRef = useRef();
  const maxFileSize = fileSize * 1024 * 1024;
  const { control } = useForm();
  const [file, setFile] = useState(null);
  const handleAudio = () => {
    inputRef?.current?.click();
  };
  const handleUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      if (uploadedFile?.size > maxFileSize) {
        setMessage(`File size exceeds ${maxFileSize / (1024 * 1024)}MB.`);
      } else if (!/\.(mp3|wav|ogg|m4a|flac|max3)$/i?.test(uploadedFile?.name)) {
        setMessage("Please select valid file");
        setStatus(false);
      } else {
        if (isMulti) {
          const uploadedItems = [...file, uploadedFile];
          setFile(uploadedItems);
        } else {
          setFile(uploadedFile);
        }

        if (onFileChange) {
          if (isMulti) {
            const uploadedItems = [...file, uploadedFile];
            onFileChange(uploadedItems);
          } else {
            onFileChange(uploadedFile);
          }
        }
      }
    }
  };

  useEffect(() => {
    // if (fileUpload) {
    setFile(fileUpload);
    // }
  }, [fileUpload]);

  const removeFile = (id) => {
    const fileList = file?.filter((_, index) => {
      return id !== index;
    });
    setFile(fileList);
    if (onFileChange) {
      onFileChange(fileList);
    }
  };

  return (
    <>
      {isMulti ? (
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
                // {...register(fileKey, {
                //   required: isRequiredField ? true : false,
                // })}
              />
            )}
          </div>
          {errorMessage.length > 0 && (
            <p className="errorMessage">{errorMessage}</p>
          )}
          <div className={audioUploadStyles.multiFileContainer}>
            {!!file?.length &&
              file?.map((item, index) => {
                return (
                  <div key={index} className={audioUploadStyles.audiofileStyle}>
                    {item?.type?.startsWith("audio/") ? (
                      <audio controls>
                        <source
                          src={URL.createObjectURL(item)}
                          type={item.type}
                        />
                        <track default kind="metadata" srcLang="en" src="" />
                        Your browser does not support the audio tag.
                      </audio>
                    ) : fileType === "audio" ? (
                      <audio controls>
                        <source src={item} type={item.type} />
                        <track default kind="metadata" srcLang="en" src="" />
                        Your browser does not support the audio tag.
                      </audio>
                    ) : null}
                    <ModalCloseIcon
                      className={audioUploadStyles.closeIcon}
                      onClick={() => removeFile(index)}
                    />
                  </div>
                );
              })}
          </div>
        </>
      ) : file ? (
        <div className={audioUploadStyles.fileContainer}>
          {file?.type?.startsWith("audio/") ? (
            <audio controls>
              <source src={URL.createObjectURL(file)} type={file.type} />
              <track default kind="metadata" srcLang="en" src="" />
              Your browser does not support the audio tag.
            </audio>
          ) : fileType === "audio" ? (
            <audio controls>
              <source src={file} type={file.type} />
              <track default kind="metadata" srcLang="en" src="" />
              Your browser does not support the audio tag.
            </audio>
          ) : null}
          <ModalCloseIcon
            className={audioUploadStyles.closeIcon}
            onClick={() => {
              setFile(null);
              if (onFileChange) {
                onFileChange(null);
              }
            }}
          />
        </div>
      ) : (
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
                // {...register(fileKey, {
                //   required: isRequiredField ? true : false,
                // })}
              />
            )}
          </div>
          {errorMessage.length > 0 && (
            <p className="errorMessage">{errorMessage}</p>
          )}
        </>
      )}
    </>
  );
};

export default AudioUpload;
