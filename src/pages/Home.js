// Home.jsx
import { useState, useEffect, useRef } from "react";
import Timer from "../components/Timer";

function getTodayString() {
  const now = new Date();
  // YYYY-MM-DD (local date)
  return now.toISOString().slice(0, 10);
}

function msUntilNextMidnight() {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return tomorrow - now;
}

function Home() {
  // initialize from localStorage but only if it's for today
  const [sessionsCompleted, setSessionsCompleted] = useState(() => {
    try {
      const storedCount =
        Number(localStorage.getItem("pomodoro_sessions")) || 0;
      const storedDate = localStorage.getItem("pomodoro_sessions_date");
      const today = getTodayString();
      // if storedDate is today, return storedCount, otherwise reset to 0
      if (storedDate === today) return storedCount;
      // stale: clear count for a new day
      localStorage.setItem("pomodoro_sessions", "0");
      localStorage.setItem("pomodoro_sessions_date", today);
      return 0;
    } catch (e) {
      return 0;
    }
  });

  const midnightTimerRef = useRef(null);
  const dailyIntervalRef = useRef(null);

  // keep localStorage in sync whenever sessionsCompleted changes
  useEffect(() => {
    try {
      const today = getTodayString();
      localStorage.setItem("pomodoro_sessions", String(sessionsCompleted));
      localStorage.setItem("pomodoro_sessions_date", today);
    } catch (e) {
      // ignore localStorage errors
    }
  }, [sessionsCompleted]);

  // Set up automatic reset at next midnight and then every 24h
  useEffect(() => {
    // clear any previous timers (defensive)
    if (midnightTimerRef.current) {
      clearTimeout(midnightTimerRef.current);
      midnightTimerRef.current = null;
    }
    if (dailyIntervalRef.current) {
      clearInterval(dailyIntervalRef.current);
      dailyIntervalRef.current = null;
    }

    const scheduleReset = () => {
      // at midnight reset the counter
      try {
        localStorage.setItem("pomodoro_sessions", "0");
        const today = getTodayString();
        localStorage.setItem("pomodoro_sessions_date", today);
      } catch (e) {
        // ignore
      }
      // update state so UI reflects reset
      setSessionsCompleted(0);
    };

    // 1) set a timeout to fire at next midnight
    const ms = msUntilNextMidnight();
    midnightTimerRef.current = setTimeout(() => {
      scheduleReset();

      // 2) after the first reset, set up an interval every 24h
      dailyIntervalRef.current = setInterval(
        scheduleReset,
        24 * 60 * 60 * 1000
      );
    }, ms);

    // cleanup on unmount
    return () => {
      if (midnightTimerRef.current) clearTimeout(midnightTimerRef.current);
      if (dailyIntervalRef.current) clearInterval(dailyIntervalRef.current);
    };
  }, []);

  // Optionally: keep multiple tabs in sync by listening to storage events.
  // If another tab resets or updates sessions, update this tab's state.
  useEffect(() => {
    function onStorage(e) {
      if (e.key === "pomodoro_sessions" || e.key === "pomodoro_sessions_date") {
        const storedDate = localStorage.getItem("pomodoro_sessions_date");
        const today = getTodayString();
        if (storedDate !== today) {
          // another tab reset for a new date
          setSessionsCompleted(0);
        } else {
          // same day: sync count
          const storedCount =
            Number(localStorage.getItem("pomodoro_sessions")) || 0;
          setSessionsCompleted(storedCount);
        }
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

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
