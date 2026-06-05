import { useState } from "react";
import axios from "axios";
import { Mail, ArrowLeft, Send, KeyRound } from "lucide-react";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleForgotPassword = async () => {
    try {
      const res = await axios.post(
        "https://smartwait-d81m.onrender.com/api/auth/forgot-password",
        { email },
      );

      alert(res.data.message);

      // Pass email to reset page
      window.location.href = `/reset-password?email=${email}`;
    } catch (err) {
      console.log(err);

      alert(err.response?.data?.message || "Server Error");
    }
  };
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* Logo */}
        <div style={styles.logoContainer}>
          <KeyRound size={34} color="#2563eb" />
        </div>

        {/* Heading */}
        <h1 style={styles.title}>Forgot Password</h1>

        <p style={styles.subtitle}>
          Enter your registered email address and we’ll send you a password
          reset link.
        </p>

        {/* Email Input */}
        <div style={styles.inputContainer}>
          <Mail size={18} color="#94a3b8" />

          <input
            type="email"
            placeholder="Enter your email"
            style={styles.input}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Send Button */}
        <button style={styles.button} onClick={handleForgotPassword}>
          <Send size={18} />
          Send Reset Link
        </button>

        {/* Back to Login */}
        <div style={styles.backContainer}>
          <span
            style={styles.backLink}
            onClick={() => (window.location.href = "/login")}
          >
            <ArrowLeft size={16} />
            Back to Login
          </span>
        </div>
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
    lineHeight: "22px",
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
    color: "#0f172a",
    background: "transparent",
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
  },

  backContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "22px",
  },

  backLink: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    color: "#2563eb",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
  },
};

export default ForgotPassword;
