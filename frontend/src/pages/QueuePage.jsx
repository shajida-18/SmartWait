import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function QueuePage() {
  const { id } = useParams();

  const [queue, setQueue] = useState(null);

  // ✅ ADD HERE
  const loadQueue = async () => {
    const res = await axios.get(
      `https://smartwait-d81m.onrender.com/api/queue/${id}`,
    );

    setQueue(res.data);
  };

  useEffect(() => {
    loadQueue();
  }, []);

  // JOIN QUEUE
  const joinQueue = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      await axios.post(
        `https://smartwait-d81m.onrender.com/api/queue/join/${id}`,
        {
          userId: user._id,
        },
      );

      alert("Joined Queue");

      // ✅ REFRESH DATA
      loadQueue();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1>{queue?.name}</h1>

        <h2>Waiting Users: {queue?.users?.length || 0}</h2>

        <button style={styles.button} onClick={joinQueue}>
          Join Queue
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0f172a",
  },

  card: {
    background: "#1e293b",
    padding: "40px",
    borderRadius: "10px",
    color: "white",
    width: "400px",
    textAlign: "center",
  },

  button: {
    padding: "12px 20px",
    background: "#38bdf8",
    border: "none",
    borderRadius: "5px",
    color: "white",
    cursor: "pointer",
    marginTop: "20px",
  },
};

export default QueuePage;
