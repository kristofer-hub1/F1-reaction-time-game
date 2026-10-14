# 🏎️ F1 Reaction Time Game

An interactive, Formula 1-themed reaction speed testing web application built with modern HTML5, CSS3, and JavaScript (Vanilla JS). Test your reflexes against the iconic 5-light F1 starting gantry and see if you have what it takes to react like a real Grand Prix driver!

---

## 🌟 Key Features

* **Authentic F1 5-Gantry Lights:** 5 red posts light up sequentially every second, followed by a randomized delay (1.5s – 4.5s) before turning green (**"LIGHTS OUT & AWAY WE GO!"**).
* **3-Round Tournament System:** Players complete 3 attempts per session. The game calculates your average reaction time and highlights your overall best round.
* **Personal Best (PB) Storage:** Automatically saves your fastest time to browser local storage (`localStorage`).
* **Keyboard & Touch Support:** React using either screen clicks or the **Spacebar**.
* **False Start Detection:** Penalty system with visual shake animations and warning sounds if you attempt to react before the lights turn green.
* **Dynamic Web Audio API Sound Effects:** Realistic synthesized start beeps, go signals, jump-start alerts, and victory sounds.
* **Driver Ranking System:** Evaluates your performance at the end of 3 rounds and assigns an official rank (e.g., *Max Verstappen Level*, *F1 Driver*, *F2 Pro*, etc.).
* **Responsive Dark Neon Aesthetic:** Deep night-circuit grid with vibrant neon gradients and modern glassmorphism UI elements.

---

## 🎮 How to Play

1. Click **"ALUSTA STARDIPROTSESSI"** (or press `Spacebar`) to start the light sequence.
2. Watch the 5 red posts light up one by one.
3. As soon as the red lights go out and turn **GREEN**, hit **`Spacebar`** or **click the button** as fast as you can!
4. **Warning:** Reacting too early triggers a **False Start**!
5. Complete all 3 attempts to receive your overall driver evaluation.

---

## 🛠️ Built With

* **HTML5** – Structured semantic layout and modal elements.
* **CSS3** – Custom flexbox/grid layouts, keyframe animations, glassmorphism design, and custom glow effects.
* **Vanilla JavaScript (ES6+)** – Asynchronous light sequence timers, reaction speed math, conditional false-start logic, and local storage state management.
* **Web Audio API** – Pure browser-synthesized audio tones without relying on external sound assets.
* **Google Fonts** – *Orbitron* & *Rajdhani* for authentic racing telemetry typography.
* **Font Awesome** – UI icons.

---

## 🚀 Local Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/kristofer-hub1/F1-reaction-time-game.git](https://github.com/kristofer-hub1/F1-reaction-time-game.git)