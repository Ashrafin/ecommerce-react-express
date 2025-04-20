import { useAuth0 } from "@auth0/auth0-react";

const ProfilePage = () => {
  const { user } = useAuth0();

  return (
    <div>
      <p>This is the profile page</p>
      {user && (
        <div>
          <p>👤 Name: {user.name}</p>
          <p>📧 Email: {user.email}</p>
          <img
            src={user?.picture || "/fallback-avatar.png"}
            onError={(err) => {
              err.target.onerror = null;
              err.target.src = "/fallback-avatar.png";
            }}
            alt="User avatar"
            style={{ borderRadius: "50%", width: 100 }}
          />
        </div>
      )}
    </div>
  );
};

export default ProfilePage;