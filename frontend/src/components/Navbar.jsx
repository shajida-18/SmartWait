import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("user");

    window.location.href = "/";
  };

  return (
    <nav style={styles.navbar}>
      {/* LOGO */}
      <div style={styles.logo}>
        <Link to="/home" style={styles.logoLink}>
          SmartWait
        </Link>
      </div>

      {/* NAV LINKS */}
      <div style={styles.navLinks}>
        {user ? (
          <>
            <Link to="/dashboard" style={styles.link}>
              Dashboard
            </Link>

            <Link to="/admin" style={styles.link}>
              Admin
            </Link>

            <button style={styles.logoutBtn} onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <span style={styles.disabledLink}>Dashboard</span>

            <span style={styles.disabledLink}>Admin</span>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    background: "#1e293b",
    padding: "15px 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #334155",
  },

  logo: {
    fontSize: "22px",
    fontWeight: "700",
  },

  logoLink: {
    textDecoration: "none",
    color: "#38bdf8",
  },

  navLinks: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
  },

  link: {
    textDecoration: "none",
    color: "white",
    fontWeight: "600",
    fontSize: "16px",
  },

  disabledLink: {
    color: "#64748b",
    cursor: "not-allowed",
    fontWeight: "600",
    fontSize: "16px",
  },

  logoutBtn: {
    background: "#ef4444",
    border: "none",
    color: "white",
    padding: "8px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
  },
};

export default Navbar;
