import { useState } from "react";
import axios from "axios";
import { Lock, KeyRound } from "lucide-react";

function ResetPassword() {
  const params = new URLSearchParams(window.location.search);

  const email = params.get("email");

  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");

  const resetPassword = async () => {
    try {
      const res = await axios.post(
        "https://smartwait-d81m.onrender.com/api/auth/reset-password",
        {
          email,
          token,
          password,
        },
      );

      alert(res.data.message);

      window.location.href = "/";
    } catch (err) {
      console.log(err);

      alert(err.response?.data?.message || "Server Error");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.logoContainer}>
          <KeyRound size={34} color="#2563eb" />
        </div>

        <h1 style={styles.title}>Reset Password</h1>

        <p style={styles.subtitle}>Enter your token and new password</p>

        {/* Token */}
        <div style={styles.inputContainer}>
          <input
            type="text"
            placeholder="Enter token"
            style={styles.input}
            onChange={(e) => setToken(e.target.value)}
          />
        </div>

        {/* Password */}
        <div style={styles.inputContainer}>
          <Lock size={18} color="#94a3b8" />

          <input
            type="password"
            placeholder="New password"
            style={styles.input}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button style={styles.button} onClick={resetPassword}>
          Reset Password
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(to right, #eff6ff, #f8fafc)",
    fontFamily: "Arial, sans-serif",
  },

  card: {
    width: "370px",
    background: "white",
    padding: "35px",
    borderRadius: "16px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
  },

  logoContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "10px",
  },

  title: {
    textAlign: "center",
    fontSize: "30px",
    color: "#0f172a",
    fontWeight: "700",
    margin: 0,
  },

  subtitle: {
    textAlign: "center",
    color: "#64748b",
    marginTop: "8px",
    marginBottom: "28px",
    fontSize: "14px",
  },

  inputContainer: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #cbd5e1",
    borderRadius: "10px",
    padding: "0 14px",
    marginTop: "16px",
    background: "white",
  },

  input: {
    width: "100%",
    padding: "14px 10px",
    border: "none",
    outline: "none",
    fontSize: "15px",
  },

  button: {
    width: "100%",
    padding: "14px",
    marginTop: "24px",
    background: "#2563eb",
    border: "none",
    borderRadius: "10px",
    color: "white",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
  },
};

export default ResetPassword;
