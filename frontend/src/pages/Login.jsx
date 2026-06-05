import { useState } from "react";
import axios from "axios";
import { Mail, Lock, LogIn, Eye, EyeOff, KeyRound } from "lucide-react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const login = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("user", JSON.stringify(res.data.user));

      window.location.href = "/dashboard";
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Welcome</h1>

        <p style={styles.subtitle}>Login to continue to your dashboard</p>

        {/* Email */}
        <div style={styles.inputContainer}>
          <Mail size={18} color="#94a3b8" />

          <input
            type="email"
            placeholder="Email address"
            style={styles.input}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div style={styles.inputContainer}>
          <Lock size={18} color="#94a3b8" />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            style={styles.input}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div
            style={styles.eyeButton}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff size={18} color="#64748b" />
            ) : (
              <Eye size={18} color="#64748b" />
            )}
          </div>
        </div>

        {/* Forgot Password */}
        <div style={styles.forgotContainer}>
          <span
            style={styles.forgotPassword}
            onClick={() => (window.location.href = "/forgot-password")}
          >
            Forgot Password?
          </span>
        </div>

        {/* Login Button */}
        <button style={styles.button} onClick={login}>
          <LogIn size={18} />
          Login
        </button>

        {/* Footer */}
        <p style={styles.footerText}>
          Don’t have an account?{" "}
          <span
            style={styles.link}
            onClick={() => (window.location.href = "/register")}
          >
            Register
          </span>
        </p>
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
    margin: 0,
    textAlign: "center",
    fontSize: "30px",
    color: "#0f172a",
    fontWeight: "700",
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
    transition: "0.2s",
  },

  input: {
    width: "100%",
    padding: "14px 10px",
    border: "none",
    outline: "none",
    fontSize: "15px",
    color: "#0f172a",
    background: "transparent",
  },

  eyeButton: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },

  forgotContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "12px",
  },

  forgotPassword: {
    fontSize: "13px",
    color: "#2563eb",
    cursor: "pointer",
    fontWeight: "600",
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
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    transition: "0.2s",
  },

  footerText: {
    marginTop: "22px",
    textAlign: "center",
    color: "#64748b",
    fontSize: "14px",
  },

  link: {
    color: "#2563eb",
    cursor: "pointer",
    fontWeight: "600",
  },
};

export default Login;
