import styles from "./styles.module.scss";

const ViewUploadFile = (props) => {
  const { file } = props;
  return (
    <div className={styles.imageWrapper}>
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
      ) : null}
    </div>
  );
};

export default ViewUploadFile;
