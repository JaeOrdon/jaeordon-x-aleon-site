import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Prevent stray JS errors from crashing the page (especially on iOS Safari during zoom)
window.addEventListener("error", (e) => { e.preventDefault(); });
window.addEventListener("unhandledrejection", (e) => { e.preventDefault(); });

createRoot(document.getElementById("root")!).render(<App />);
