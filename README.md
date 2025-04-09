# 🧠 Electron + React Counter App with Child Process (IPC Demo)

This is a sample Electron app using React (Vite) as the frontend, demonstrating:

- ✅ Multiple Processes: Electron main process, renderer process (React), and a Node.js child process.
- ✅ Inter-Process Communication (IPC): Communication from renderer ↔ main ↔ child.
- ✅ Real Use Case: Counter button sends value to child process, which checks if the number is **prime**.
- ✅ Native Dialog Popup: When count reaches a multiple of 5, a native dialog appears with **OK** and **Reset** options.

---

---

## 🛠️ Installation

```bash
# Clone the repo
[git clone https://github.com/your-username/electron-ipc-counter-app.git](https://github.com/Avdhutk/electron-ipc-react-app.git)
git checkout master
cd electron-ipc-counter-app

# Install root dependencies
npm install
npm start

# Install client (React) dependencies
cd client
npm install
npm run dev

 **IPC Flow Overview**

React UI (Renderer)
    |
    v
Electron Main Process (main.js)
    |
    v
Child Process (child.js) → Processes count
    |
    v
Electron Main → React → Displays result

**Example Logic**

Click the counter
Sends the count to main → child
Child determines:
Is it prime?
Result is returned and displayed in the UI
On multiples of 5, a native dialog appears with “OK” and “Reset”

