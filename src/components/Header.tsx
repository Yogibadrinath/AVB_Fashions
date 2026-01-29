const Header = () => {
  return (
    <header
      className="navbar navbar-dark bg-dark shadow-sm w-100 border-start border-secondary sticky-top d-flex justify-content-center"
      style={{ height: "64px", zIndex: 1020 }}
    >
      <span className="navbar-brand mb-0 h1 fw-semibold text-light text-uppercase tracking-wider">
        AVB FASHIONS
      </span>
    </header>
  );
};

export default Header;