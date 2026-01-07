const UserInformation = ({
  firstName,
  email,
  picture,
  emailVerified,
  fullName,
  topTags,
  handleLogout
}) => {
  return (
    <div className="d-flex row g-4">
      <div className="col-md-5 col-lg-4">
        <div className="d-flex flex-column align-items-center justify-content-center border border-light-subtle bg-light-subtle rounded-4 py-4 px-3 px-md-4 h-100">
          <h4 className="urbanist fs-4 fw-bold text-body-emphasis mb-0">
            {firstName}
          </h4>
          <p className={`inter fs-7 fw-semibold ${emailVerified ? "text-success" : "text-danger"} mb-4`}>
            {emailVerified ? "Verified User" : "Not Verified User"}
          </p>
          <img
            key={picture}
            src={picture || "/fallback-avatar.png"}
            className="rounded-circle border border-3 border-secondary-subtle"
            referrerPolicy="no-referrer"
            onError={(err) => {
              console.error("Failed to load profile picture:", picture);
              err.target.onerror = null;
              err.target.src = "/fallback-avatar.png";
            }}
            alt="User avatar"
            style={{ width: 120, height: 120 }}
          />
        </div>
      </div>
      <div className="col-md-7 col-lg-8">
        <div className="d-flex flex-column container border border-light-subtle bg-light-subtle rounded-4 py-4 px-3 px-md-4 h-100">
          <div className="row g-4">
            <div className="col-12 col-sm-6">
              <div className="d-flex flex-column">
                <p className="inter fs-8 fw-medium text-body-secondary mb-1">
                  Full Name
                </p>
                <p className="urbanist fs-5 fw-bold text-body-emphasis mb-0 text-break">
                  {fullName}
                </p>
              </div>
            </div>
            <div className="col-12 col-sm-6">
              <div className="d-flex flex-column">
                <p className="inter fs-8 fw-medium text-body-secondary mb-1">
                  Email
                </p>
                <p className="urbanist fs-5 fw-bold text-body-emphasis mb-0 text-break">
                  {email}
                </p>
              </div>
            </div>
            <div className="col-12">
              <div className="d-flex flex-column">
                <p className="inter fs-8 fw-medium text-body-secondary mb-2">
                  Top Tags
                </p>
                <div className="d-flex flex-wrap">
                  {topTags.map(({ tag }) => (
                    <span
                      key={tag}
                      className="badge rounded-pill bg-white text-body-emphasis text-capitalize inter fw-normal mb-2 me-2 border border-light-subtle"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-12">
              <button
                className="btn btn-sm bg-info-subtle text-info-emphasis border-0 rounded-pill inter fw-medium px-4 py-2"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInformation;