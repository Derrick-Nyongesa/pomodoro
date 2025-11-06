import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Timer from "../components/Timer";
import SessionCounter from "../components/SessionCounter";

function Home() {
  const [sessionsCompleted, setSessionsCompleted] = useState(
    () => Number(localStorage.getItem("pomodoro_sessions")) || 0
  );

  useEffect(() => {
    localStorage.setItem("pomodoro_sessions", String(sessionsCompleted));
  }, [sessionsCompleted]);
  return (
    <div className="app-root">
      <Navbar />
      <main className="container">
        <h1 className="sr-only">Pomodoro</h1>
        <div className="grid">
          {/* pass setter so Timer can increment */}
          <Timer
            sessionsCompleted={sessionsCompleted}
            setSessionsCompleted={setSessionsCompleted}
          />
          <aside className="sidebar">
            <SessionCounter sessions={sessionsCompleted} />
          </aside>
        </div>
      </main>
    </div>
  );
}

export default Home;
