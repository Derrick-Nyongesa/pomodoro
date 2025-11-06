import React from "react";

export default function SessionCounter({ sessions = 0 }) {
  return (
    <div className="session-card">
      <h3>Sessions Completed</h3>
      <div className="big-number">{sessions}</div>
      <p className="muted">
        Good job! Keep up regular breaks to avoid burnout.
      </p>
    </div>
  );
}
