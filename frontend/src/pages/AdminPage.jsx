import { useEffect, useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import {
  Users,
  Trash2,
  BellRing,
  Layers3,
  Plus,
  TimerReset,
  ShieldCheck,
  Lock,
} from "lucide-react";

function AdminPage() {
  const [queues, setQueues] = useState([]);
  const [queueName, setQueueName] = useState("");
  const [peopleCount, setPeopleCount] = useState("");

  // ADMIN LOGIN
  const [adminPassword, setAdminPassword] = useState("");
  const [isAdminVerified, setIsAdminVerified] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAdminVerified) {
      loadQueues();
    }
  }, [isAdminVerified]);

  // VERIFY ADMIN
  const verifyAdmin = () => {
    if (adminPassword === "admin123") {
      setIsAdminVerified(true);
    } else {
      alert("Wrong Admin Password");
    }
  };

  // LOAD QUEUES
  const loadQueues = async () => {
    const res = await axios.get("http://localhost:5000/api/queue");

    setQueues(res.data);
  };

  // CREATE QUEUE
  const createQueue = async () => {
    if (!queueName || !peopleCount) {
      return alert("Enter Queue Name and Number of People");
    }

    await axios.post("http://localhost:5000/api/queue/create", {
      name: queueName,
      users: Array(Number(peopleCount)).fill("user"),
    });

    setQueueName("");
    setPeopleCount("");

    loadQueues();
  };

  // NEXT USER
  const nextUser = async (id) => {
    await axios.post(`http://localhost:5000/api/queue/next/${id}`);

    alert("Next User Called");

    loadQueues();
  };

  // DELETE QUEUE
  const deleteQueue = async (id) => {
    await axios.delete(`http://localhost:5000/api/queue/${id}`);

    alert("Queue Deleted");

    loadQueues();
  };

  // CLEAR QUEUE
  const clearQueue = async (id) => {
    await axios.put(`http://localhost:5000/api/queue/clear/${id}`);

    alert("Queue Cleared");

    loadQueues();
  };

  // ADMIN LOGIN SCREEN
  if (!isAdminVerified) {
    return (
      <div style={styles.loginPage}>
        <div style={styles.loginCard}>
          <div style={styles.iconBox}>
            <ShieldCheck size={42} color="#38bdf8" />
          </div>

          <h1 style={styles.loginTitle}>Admin Access</h1>

          <p style={styles.loginSubtitle}>Enter admin password to continue</p>

          <div style={styles.passwordBox}>
            <Lock size={18} color="#94a3b8" />

            <input
              type="password"
              placeholder="Enter Admin Password"
              style={styles.passwordInput}
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
            />
          </div>

          <button style={styles.loginBtn} onClick={verifyAdmin}>
            Login as Admin
          </button>

          <button style={styles.backBtn} onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <p style={styles.badge}>ADMIN CONTROL PANEL</p>

          <h1 style={styles.title}>SmartWait Management</h1>

          <p style={styles.subtitle}>
            Create and manage smart queues in real-time.
          </p>
        </div>
      </div>

      {/* CREATE QUEUE CARD */}
      <div style={styles.createCard}>
        <h2 style={{ marginBottom: "20px" }}>Create New Queue</h2>

        <div style={styles.inputGroup}>
          <input
            type="text"
            placeholder="Enter Queue Name"
            style={styles.input}
            value={queueName}
            onChange={(e) => setQueueName(e.target.value)}
          />

          <input
            type="number"
            placeholder="No. of People"
            style={styles.input}
            value={peopleCount}
            onChange={(e) => setPeopleCount(e.target.value)}
          />
        </div>

        <button style={styles.createBtn} onClick={createQueue}>
          <Plus size={18} />
          Create Queue
        </button>
      </div>

      {/* STATS */}
      <div style={styles.stats}>
        <div style={styles.statCard}>
          <Layers3 size={24} color="#38bdf8" />

          <div>
            <h3>Total Queues</h3>
            <p>{queues.length}</p>
          </div>
        </div>

        <div style={styles.statCard}>
          <Users size={24} color="#38bdf8" />

          <div>
            <h3>Total Users</h3>

            <p>
              {queues.reduce((total, q) => total + (q.users?.length || 0), 0)}
            </p>
          </div>
        </div>
      </div>

      {/* QUEUE LIST */}
      <div style={styles.queueGrid}>
        {queues.map((queue) => (
          <div key={queue._id} style={styles.queueCard}>
            <div style={styles.cardTop}>
              <h2>{queue.name}</h2>

              <span style={styles.live}>ACTIVE</span>
            </div>

            <div style={styles.infoBox}>
              <div style={styles.infoRow}>
                <Users size={18} color="#38bdf8" />
                <span>Waiting Users: {queue?.users?.length || 0}</span>
              </div>

              <div style={styles.infoRow}>
                <TimerReset size={18} color="#38bdf8" />
                <span>
                  Estimated Wait: {queue?.users?.length * 5 || 0} mins
                </span>
              </div>
            </div>

            <div style={styles.buttonRow}>
              <button
                style={styles.nextBtn}
                onClick={() => nextUser(queue._id)}
              >
                <BellRing size={16} />
                Call Next
              </button>

              <button
                style={styles.clearBtn}
                onClick={() => clearQueue(queue._id)}
              >
                Clear Queue
              </button>

              <button
                style={styles.deleteBtn}
                onClick={() => deleteQueue(queue._id)}
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  loginPage: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(135deg, #0f172a 0%, #111827 50%, #1e293b 100%)",
    fontFamily: "Arial, sans-serif",
  },

  loginCard: {
    width: "380px",
    background: "rgba(30, 41, 59, 0.9)",
    padding: "35px",
    borderRadius: "24px",
    border: "1px solid rgba(255,255,255,0.08)",
    backdropFilter: "blur(12px)",
    textAlign: "center",
    color: "white",
  },

  iconBox: {
    marginBottom: "15px",
  },

  loginTitle: {
    margin: 0,
    fontSize: "32px",
  },

  loginSubtitle: {
    color: "#94a3b8",
    marginTop: "10px",
    marginBottom: "30px",
  },

  passwordBox: {
    display: "flex",
    alignItems: "center",
    background: "#0f172a",
    border: "1px solid #334155",
    borderRadius: "14px",
    padding: "0 14px",
  },

  passwordInput: {
    width: "100%",
    padding: "14px 10px",
    background: "transparent",
    border: "none",
    outline: "none",
    color: "white",
    fontSize: "15px",
  },

  loginBtn: {
    width: "100%",
    marginTop: "22px",
    padding: "14px",
    border: "none",
    borderRadius: "14px",
    background: "linear-gradient(135deg, #38bdf8, #2563eb)",
    color: "white",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
  },

  backBtn: {
    width: "100%",
    marginTop: "12px",
    padding: "14px",
    border: "1px solid #334155",
    borderRadius: "14px",
    background: "transparent",
    color: "#cbd5e1",
    fontSize: "15px",
    cursor: "pointer",
  },

  container: {
    minHeight: "100vh",
    padding: "40px",
    background:
      "linear-gradient(135deg, #0f172a 0%, #111827 50%, #1e293b 100%)",
    color: "white",
    fontFamily: "Arial, sans-serif",
  },

  header: {
    marginBottom: "35px",
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
  },

  subtitle: {
    color: "#94a3b8",
    marginTop: "10px",
  },

  createCard: {
    background: "rgba(30, 41, 59, 0.75)",
    padding: "30px",
    borderRadius: "22px",
    border: "1px solid rgba(255,255,255,0.08)",
    backdropFilter: "blur(10px)",
    marginBottom: "30px",
  },

  inputGroup: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  },

  input: {
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid #334155",
    background: "#0f172a",
    color: "white",
    outline: "none",
    fontSize: "15px",
  },

  createBtn: {
    marginTop: "20px",
    width: "100%",
    padding: "15px",
    border: "none",
    borderRadius: "14px",
    background: "linear-gradient(135deg, #38bdf8, #2563eb)",
    color: "white",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
  },

  stats: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    marginBottom: "30px",
  },

  statCard: {
    background: "rgba(30, 41, 59, 0.75)",
    padding: "25px",
    borderRadius: "20px",
    border: "1px solid rgba(255,255,255,0.08)",
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },

  queueGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "25px",
  },

  queueCard: {
    background: "rgba(30, 41, 59, 0.75)",
    padding: "25px",
    borderRadius: "22px",
    border: "1px solid rgba(255,255,255,0.08)",
  },

  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },

  live: {
    background: "rgba(34,197,94,0.15)",
    color: "#22c55e",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
  },

  infoBox: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  infoRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    color: "#cbd5e1",
  },

  buttonRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginTop: "25px",
  },

  nextBtn: {
    flex: 1,
    minWidth: "120px",
    padding: "12px",
    border: "none",
    borderRadius: "12px",
    background: "#22c55e",
    color: "white",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    fontWeight: "600",
  },

  clearBtn: {
    flex: 1,
    minWidth: "120px",
    padding: "12px",
    border: "none",
    borderRadius: "12px",
    background: "#f59e0b",
    color: "white",
    cursor: "pointer",
    fontWeight: "600",
  },

  deleteBtn: {
    flex: 1,
    minWidth: "120px",
    padding: "12px",
    border: "none",
    borderRadius: "12px",
    background: "#ef4444",
    color: "white",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    fontWeight: "600",
  },
};

export default AdminPage;
