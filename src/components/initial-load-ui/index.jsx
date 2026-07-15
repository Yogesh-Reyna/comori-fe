import logo from "../../assets/hero.png";

export const InitialLoadUi = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: `translate(${-50}%, ${-50}%)`,
        width: "100px",
      }}
    >
      <img src={logo} alt="logo" />
    </div>
  );
};
