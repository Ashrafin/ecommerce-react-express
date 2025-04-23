const Container = ({
  children,
  fluid,
  utilityClasses,
  customStyles
}) => {
  return (
    <div
      className={`${fluid ? "container-fluid" : "container"} ${utilityClasses || ""}`}
      style={{ ...customStyles }}
    >
      {children}
    </div>
  );
};

export default Container;