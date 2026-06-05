import { Link } from "react-router-dom";

function QueueCard({ queue }) {
  return (
    <div style={{ border: "1px solid", padding: 10 }}>
      <h3>{queue.name}</h3>
      <p>Users: {queue.users.length}</p>
      <Link to={`/queue/${queue._id}`}>Join</Link>
    </div>
  );
}

export default QueueCard;
