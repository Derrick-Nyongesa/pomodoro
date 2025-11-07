# ⏰ POMODORO — Take a Break, Don’t Burn Out

> A simple, elegant productivity app that reminds your team to take breaks and avoid burnout — one Pomodoro at a time.

---

## 🧠 The Backstory

Your office is full of workaholics.  
No one takes breaks. No one goes for lunch.  
The only "fun" thing people talk about is new Slack updates.

Your team lead worries that at this pace, people will start burning out soon.  
So — you’ve been contracted to build an app that reminds coworkers to **take breaks**.

That’s where **Pomodoro** comes in.

---

## 🧩 How the App Works (Step-by-Step)

### 1. 🧭 Navbar

A simple top bar displaying the app name — for design consistency.

```jsx
<Navbar />
```

---

### 2. ⏱ Timer (The Heart of the App)

This is where the magic happens.

When you first open it, you’ll see:

```
Work Session
25:00
[Start] [Reset]
```

#### ▶️ Start

Begins the countdown.

#### ⏸ Pause

Stops the countdown temporarily.

#### 🔁 Reset

Resets it back to your chosen work time.

When the timer runs out, it **automatically switches** to a “Break” phase.

---

### ⚙️ Settings

Click **Settings** to adjust:

- **Work time:** `1–60` minutes
- **Break time:** `5–10` minutes
- **Break activity:** (e.g. “Grab a snack”, “Stretch”, “Drink water”)

All preferences are saved in **localStorage**, so they persist even after a refresh.

---

### 3. 🧮 Session Counter

This section shows how many **work sessions** you’ve completed.

After each completed work session, this number increments by 1.

It’s stored in **localStorage** — and **automatically resets at midnight** (00:00–23:59).

---

### 4. 🔄 The Flow

| Phase           | What You See                  | What Happens                                         |
| --------------- | ----------------------------- | ---------------------------------------------------- |
| **Work**        | Countdown (25:00 → 0:00)      | You focus and work                                   |
| **Time hits 0** | Switches to “Break”           | The app pauses — waiting for you to start your break |
| **Break**       | Countdown (e.g., 5:00 → 0:00) | You rest                                             |
| **Time hits 0** | Switches back to “Work”       | Cycle repeats                                        |

---

### 5. ⚙️ Behind the Scenes

The timer runs using React’s `setInterval()`:

- Every second (`1000ms`), it subtracts 1 from the remaining time.
- When time hits `0`, it automatically switches phases.

Your settings and session progress are stored locally for persistence.

---

### 6. 🎨 Styling

- All visuals (dark theme, glowing buttons, modal, etc.) are built using **plain CSS** inside `index.css`.
- No external UI frameworks (no Material UI, no Bootstrap).
- Responsive and lightweight.

---

## ⚙️ How to Run the App

If you haven’t run it yet, follow these steps:

```bash
# 1. Create a new React app
npx create-react-app pomodoro

# 2. Navigate into it
cd pomodoro

# 3. Install router (optional if using navigation)
npm install react-router-dom
```

---

### 🧩 Project Setup

Replace the following files and folders:

```
src/App.js
src/pages/Home.js
src/components/
src/index.css
```

Then start the app:

```bash
npm start
```

Open your browser at 👉 [http://localhost:3000](http://localhost:3000)

Your **Pomodoro Timer** will appear!

---

## 💾 Data Persistence

- **Settings** and **sessions** are stored in `localStorage`.
- The session counter **resets automatically every day at midnight**.
- Works seamlessly even across refreshes or tab changes.

---

## 🛠 Tech Stack

- **Frontend:** React (CRA)
- **State Management:** React Hooks (`useState`, `useEffect`)
- **Storage:** Browser `localStorage`
- **Styling:** Plain CSS
- **Build Tool:** Create React App

---

## 💡 Possible Future Improvements

- ⏰ Notifications when work/break time ends
- 📊 Daily/weekly productivity stats
- 🌗 Light & Dark themes
- ☁️ Sync settings via cloud storage
- 🔔 Sound effects for transitions

---

## 👨‍💻 Author

Built with ❤️ by [Derrick Daniel] — a developer who believes breaks make better code.
Stay hydrated, stretch often, and keep shipping 🚀

---

## 🪪 License

This project is open source and available under the **MIT License**.
