import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Users, Clock3, ArrowRight, Activity } from "lucide-react";

function Dashboard() {
  const [queues, setQueues] = useState([]);

  // LOAD QUEUES
  const loadQueues = async () => {
    try {
      const res = await axios.get(
        "https://smartwait-d81m.onrender.com/api/queue",
      );

      setQueues(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadQueues();
  }, []);

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <p style={styles.badge}>QUEUE MANAGEMENT</p>

          <h1 style={styles.title}>Available Queues</h1>

          <p style={styles.subtitle}>
            Join queues and track estimated waiting times in real-time.
          </p>
        </div>

        <div style={styles.statsCard}>
          <Activity size={22} />
          <div>
            <h3 style={{ margin: 0 }}>{queues.length}</h3>
            <p style={styles.statsText}>Active Queues</p>
          </div>
        </div>
      </div>

      {/* QUEUE GRID */}
      <div style={styles.grid}>
        {queues.map((queue) => (
          <div key={queue._id} style={styles.card}>
            <div style={styles.cardTop}>
              <div style={styles.iconBox}>📋</div>

              <span style={styles.live}>LIVE</span>
            </div>

            <h2 style={styles.queueName}>{queue.name}</h2>

            <div style={styles.infoBox}>
              <div style={styles.infoRow}>
                <Users size={18} color="#38bdf8" />
                <span>{queue.users?.length || 0} waiting users</span>
              </div>

              <div style={styles.infoRow}>
                <Clock3 size={18} color="#38bdf8" />
                <span>Approx {queue.users?.length * 5 || 0} mins wait</span>
              </div>
            </div>

            <Link to={`/queue/${queue._id}`} style={{ textDecoration: "none" }}>
              <button style={styles.button}>
                Join Queue
                <ArrowRight size={18} />
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    padding: "40px",
    background:
      "linear-gradient(135deg, #0f172a 0%, #111827 50%, #1e293b 100%)",
    color: "white",
    fontFamily: "Arial, sans-serif",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "20px",
    marginBottom: "40px",
  },

  badge: {
    color: "#38bdf8",
    letterSpacing: "2px",
    fontSize: "13px",
    marginBottom: "10px",
  },

  title: {
    fontSize: "42px",
    margin: 0,
    fontWeight: "700",
  },

  subtitle: {
    color: "#94a3b8",
    marginTop: "10px",
    fontSize: "16px",
  },

  statsCard: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    background: "rgba(30, 41, 59, 0.8)",
    padding: "18px 24px",
    borderRadius: "18px",
    border: "1px solid rgba(255,255,255,0.08)",
    backdropFilter: "blur(10px)",
  },

  statsText: {
    margin: 0,
    color: "#94a3b8",
    fontSize: "13px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "25px",
  },

  card: {
    background: "rgba(30, 41, 59, 0.75)",
    borderRadius: "22px",
    padding: "25px",
    border: "1px solid rgba(255,255,255,0.08)",
    backdropFilter: "blur(12px)",
    transition: "0.3s ease",
    boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
  },

  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  iconBox: {
    width: "55px",
    height: "55px",
    borderRadius: "16px",
    background: "rgba(56, 189, 248, 0.15)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "24px",
  },

  live: {
    background: "rgba(34,197,94,0.15)",
    color: "#22c55e",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
  },

  queueName: {
    marginTop: "22px",
    fontSize: "24px",
    marginBottom: "20px",
  },

  infoBox: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    color: "#cbd5e1",
  },

  infoRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "15px",
  },

  button: {
    width: "100%",
    marginTop: "25px",
    padding: "14px",
    border: "none",
    borderRadius: "14px",
    background: "linear-gradient(135deg, #38bdf8, #2563eb)",
    color: "white",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    transition: "0.3s",
  },
};

export default Dashboard;
