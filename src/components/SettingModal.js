import { useState } from "react";

export default function SettingsModal({ initial, onClose, onSave }) {
  const [workMinutes, setWorkMinutes] = useState(initial.workMinutes);
  const [breakMinutes, setBreakMinutes] = useState(initial.breakMinutes);
  const [breakActivity, setBreakActivity] = useState(initial.breakActivity);
  const [error, setError] = useState("");

  function validateAndSave(e) {
    e.preventDefault();
    // validations as per spec
    if (workMinutes <= 0 || workMinutes > 60) {
      setError("Work time must be between 1 and 60 minutes.");
      return;
    }
    if (breakMinutes < 5 || breakMinutes > 10) {
      setError("Break time must be between 5 and 10 minutes.");
      return;
    }
    if (!breakActivity || breakActivity.trim().length < 3) {
      setError("Please specify a break activity.");
      return;
    }

    setError("");
    onSave({
      workMinutes: Math.round(workMinutes),
      breakMinutes: Math.round(breakMinutes),
      breakActivity,
    });
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <header className="modal-header">
          <h3>Settings</h3>
          <button className="btn ghost" onClick={onClose}>
            Close
          </button>
        </header>
        <form className="modal-body" onSubmit={validateAndSave}>
          <label>
            Work time (minutes)
            <input
              type="number"
              min="1"
              max="60"
              value={workMinutes}
              onChange={(e) => setWorkMinutes(Number(e.target.value))}
            />
          </label>

          <label>
            Break time (minutes)
            <input
              type="number"
              min="5"
              max="10"
              value={breakMinutes}
              onChange={(e) => setBreakMinutes(Number(e.target.value))}
            />
          </label>

          <label>
            Break activity
            <input
              type="text"
              value={breakActivity}
              onChange={(e) => setBreakActivity(e.target.value)}
            />
          </label>

          {error && <div className="form-error">{error}</div>}

          <div className="modal-actions">
            <button className="btn" type="submit">
              Save
            </button>
            <button type="button" className="btn outline" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
