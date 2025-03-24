# 🎟️ Ticketing System - Frontend (Angular)

This is the **frontend application** for the Ticketing System Simulation, built with **Angular**. It allows users to configure and visualize a ticket-selling simulation in real-time using **WebSocket** and **HTTP polling** for updates.

---

## 🚀 Features

- 📋 **Simulation Configuration Form**
- 📈 **Real-time Graphs** (using ng2-charts / Chart.js)
- 🧾 **Live Ticket Board** for vendors and customers
- 🔄 **Start / Stop / Reset** simulation controls
- ⚡ Real-time updates via **WebSockets**

---

## 🛠️ Technologies Used

- Angular 17+
- RxJS
- WebSocket API
- Chart.js (via ng2-charts)
- TypeScript
- SCSS/CSS Modules

---

## 📦 Folder Structure

```bash
src/
├── app/
│   ├── components/
│   │   ├── config-form/
│   │   ├── ticket-board/
│   │   ├── chart-display/
│   ├── models/
│   ├── services/
│   ├── app.component.ts
│   └── app.component.html
