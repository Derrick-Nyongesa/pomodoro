import { useState, useEffect } from "react";
import Timer from "../components/Timer";

function Home() {
  const [sessionsCompleted, setSessionsCompleted] = useState(
    () => Number(localStorage.getItem("pomodoro_sessions")) || 0
  );

  useEffect(() => {
    localStorage.setItem("pomodoro_sessions", String(sessionsCompleted));
  }, [sessionsCompleted]);
  return (
    <div className="app-root">
      <main className="container">
        <h1 className="brand">Pomodoro</h1>
        <div className="grid">
          {/* pass setter so Timer can increment */}
          <Timer
            sessionsCompleted={sessionsCompleted}
            setSessionsCompleted={setSessionsCompleted}
          />
        </div>
      </main>
    </div>
  );
}

export default Home;
