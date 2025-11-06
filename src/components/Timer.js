import { useEffect, useState, useRef } from "react";
import SettingsModal from "./SettingModal";

// Default (hard-coded) settings
const DEFAULT_SETTINGS = {
  workMinutes: 25,
  breakMinutes: 5,
  breakActivity: "Stretch / Walk / Drink water",
};

function formatTime(seconds) {
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}

function Timer({ sessionsCompleted, setSessionsCompleted }) {
  const [settings, setSettings] = useState(() => {
    try {
      return (
        JSON.parse(localStorage.getItem("pomodoro_settings")) ||
        DEFAULT_SETTINGS
      );
    } catch (e) {
      return DEFAULT_SETTINGS;
    }
  });

  const [isWorking, setIsWorking] = useState(true);
  const [running, setRunning] = useState(false);
  const [remaining, setRemaining] = useState(settings.workMinutes * 60);

  const [showSettings, setShowSettings] = useState(false);

  const intervalRef = useRef(null);

  useEffect(() => {
    // update remaining when settings change
    setRemaining((prev) => {
      // if currently running a work session and user lowered minutes while idle, adapt
      const desired =
        (isWorking ? settings.workMinutes : settings.breakMinutes) * 60;
      // if timer was paused keep progress ratio
      return Math.min(prev, desired) || desired;
    });
    localStorage.setItem("pomodoro_settings", JSON.stringify(settings));
  }, [settings, isWorking]);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setRemaining((r) => r - 1);
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  useEffect(() => {
    if (remaining <= 0) {
      if (isWorking) {
        // increment shared state
        setSessionsCompleted((s) => s + 1);
        setIsWorking(false);
        setRemaining(settings.breakMinutes * 60);
        setRunning(false);
      } else {
        setIsWorking(true);
        setRemaining(settings.workMinutes * 60);
        setRunning(false);
      }
    }
  }, [
    remaining,
    isWorking,
    settings.breakMinutes,
    settings.workMinutes,
    setSessionsCompleted,
  ]);

  function handleStartPause() {
    setRunning((r) => !r);
  }

  function handleReset() {
    setRunning(false);
    setIsWorking(true);
    setRemaining(settings.workMinutes * 60);
  }

  function openSettings() {
    setShowSettings(true);
  }

  function applySettings(newSettings) {
    // validation already done in SettingsModal
    setSettings(newSettings);
    setShowSettings(false);
    // reset timer to new chosen phase default
    setIsWorking(true);
    setRemaining(newSettings.workMinutes * 60);
    setRunning(false);
  }

  return (
    <section className="timer-card">
      <div className="timer-header">
        <h2>{isWorking ? "Work Session" : "Break"}</h2>
        <button
          className="btn ghost"
          onClick={openSettings}
          aria-label="Open settings"
        >
          Settings
        </button>
      </div>

      <div className="countdown">{formatTime(Math.max(0, remaining))}</div>

      <div className="meta">
        <div className="chip">Phase: {isWorking ? "Working" : "On Break"}</div>
        <div className="chip">Activity: {settings.breakActivity}</div>
      </div>

      <div className="controls">
        <button className="btn" onClick={handleStartPause}>
          {running ? "Pause" : "Start"}
        </button>
        <button className="btn outline" onClick={handleReset}>
          Reset
        </button>
      </div>

      <div className="session-info">
        <p>Work length: {settings.workMinutes} minute(s)</p>
        <p>Break length: {settings.breakMinutes} minute(s)</p>
      </div>

      {showSettings && (
        <SettingsModal
          initial={settings}
          onClose={() => setShowSettings(false)}
          onSave={applySettings}
        />
      )}
    </section>
  );
}

export default Timer;
