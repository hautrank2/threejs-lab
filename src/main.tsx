import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "~/app";
import "./index.css";

// Nền tối là mặc định, giống blog. Không có công tắc sáng/tối.
document.documentElement.classList.add("dark");

// StrictMode mount -> unmount -> mount lại ở chế độ dev. Giữ nguyên: nếu
// lab.dispose() sai thì sẽ thấy ngay hai canvas hoặc scene chạy nhanh gấp đôi.
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
