export const InfoIcon = ({ onClick, stroke = "#959595" }) => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <path
        d="M11 15V11M11 7H11.01M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const ModalCloseIcon = ({ onClick, className }) => {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      className={className}
      style={{ cursor: "pointer" }}
    >
      <circle cx="12.5" cy="12.5" r="12.5" fill="var(--primary-bg-color)" />
      <path
        d="M17.4348 7.56641L7.56641 17.4348"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.56517 7.56641L17.4336 17.4348"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
