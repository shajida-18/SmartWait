import { Link } from "react-router-dom";
import {
  ArrowRight,
  LayoutDashboard,
  ShieldCheck,
  Clock3,
  Users,
  Bell,
} from "lucide-react";

function Home() {
  return (
    <div style={styles.page}>
      {/* NAVBAR */}

      {/* HERO SECTION */}
      <section style={styles.hero}>
        <div style={styles.left}>
          <p style={styles.badge}>SMART QUEUE MANAGEMENT</p>

          <h1 style={styles.heading}>
            Skip Long Waiting Lines With Smart Digital Queues
          </h1>

          <p style={styles.description}>
            Manage queues efficiently, reduce waiting time, and provide a
            seamless experience for users with real-time queue tracking.
          </p>

          <div style={styles.buttons}>
            <Link to="/dashboard" style={{ textDecoration: "none" }}>
              <button style={styles.primaryBtn}>
                Open Dashboard
                <ArrowRight size={18} />
              </button>
            </Link>

            <Link to="/admin" style={{ textDecoration: "none" }}>
              <button style={styles.secondaryBtn}>Admin Panel</button>
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE CARD */}
        <div style={styles.right}>
          <div style={styles.mockCard}>
            <div style={styles.queueHeader}>
              <h3>Hospital Queue</h3>

              <span style={styles.live}>LIVE</span>
            </div>

            <div style={styles.queueItem}>
              <Users size={18} />
              <span>24 users waiting</span>
            </div>

            <div style={styles.queueItem}>
              <Clock3 size={18} />
              <span>Estimated wait: 20 mins</span>
            </div>

            <div style={styles.queueItem}>
              <Bell size={18} />
              <span>Real-time notifications enabled</span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={styles.features}>
        <div style={styles.featureCard}>
          <div style={styles.iconBox}>
            <Clock3 />
          </div>

          <h3>Real-Time Updates</h3>

          <p>
            Users can track live waiting times and queue positions instantly.
          </p>
        </div>

        <div style={styles.featureCard}>
          <div style={styles.iconBox}>
            <LayoutDashboard />
          </div>

          <h3>Easy Dashboard</h3>

          <p>Manage multiple queues with a clean and intuitive dashboard.</p>
        </div>

        <div style={styles.featureCard}>
          <div style={styles.iconBox}>
            <ShieldCheck />
          </div>

          <h3>Admin Controls</h3>

          <p>Powerful admin tools for managing users and queues efficiently.</p>
        </div>
      </section>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #0f172a 0%, #111827 50%, #1e293b 100%)",
    color: "white",
    fontFamily: "Arial, sans-serif",
    padding: "0 6%",
  },

  navbar: {
    height: "80px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logo: {
    fontSize: "28px",
    fontWeight: "700",
  },

  navLinks: {
    display: "flex",
    gap: "30px",
  },

  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "16px",
    transition: "0.3s",
  },

  hero: {
    minHeight: "85vh",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "50px",
    flexWrap: "wrap",
  },

  left: {
    flex: 1,
    minWidth: "300px",
  },

  badge: {
    color: "#38bdf8",
    letterSpacing: "2px",
    marginBottom: "20px",
    fontSize: "14px",
  },

  heading: {
    fontSize: "58px",
    lineHeight: "1.1",
    marginBottom: "25px",
    maxWidth: "700px",
  },

  description: {
    color: "#94a3b8",
    fontSize: "18px",
    lineHeight: "1.7",
    maxWidth: "600px",
  },

  buttons: {
    display: "flex",
    gap: "20px",
    marginTop: "35px",
    flexWrap: "wrap",
  },

  primaryBtn: {
    padding: "15px 28px",
    borderRadius: "14px",
    border: "none",
    background: "linear-gradient(135deg, #38bdf8, #2563eb)",
    color: "white",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  secondaryBtn: {
    padding: "15px 28px",
    borderRadius: "14px",
    border: "1px solid rgba(255,255,255,0.2)",
    background: "transparent",
    color: "white",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
  },

  right: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    minWidth: "300px",
  },

  mockCard: {
    width: "380px",
    background: "rgba(30, 41, 59, 0.75)",
    backdropFilter: "blur(12px)",
    borderRadius: "24px",
    padding: "30px",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 15px 40px rgba(0,0,0,0.3)",
  },

  queueHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  },

  live: {
    background: "rgba(34,197,94,0.15)",
    color: "#22c55e",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
  },

  queueItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "16px",
    background: "rgba(255,255,255,0.04)",
    borderRadius: "14px",
    marginBottom: "15px",
    color: "#cbd5e1",
  },

  features: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "25px",
    paddingBottom: "60px",
  },

  featureCard: {
    background: "rgba(30, 41, 59, 0.75)",
    padding: "30px",
    borderRadius: "22px",
    border: "1px solid rgba(255,255,255,0.08)",
    backdropFilter: "blur(10px)",
  },

  iconBox: {
    width: "55px",
    height: "55px",
    borderRadius: "16px",
    background: "rgba(56, 189, 248, 0.15)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "20px",
    color: "#38bdf8",
  },
};

export default Home;
