import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lab không tải ảnh từ ngoài và không có API route — cấu hình mặc định là đủ.
  // Ba bài nặng nhất (19, 21, text-3d) vẫn nằm ngoài bundle đầu tiên nhờ
  // `load: () => import(...)` trong registry, không cần khai báo gì thêm.

  // Không cho `next dev` tự sinh AGENTS.md / CLAUDE.md — hướng dẫn cho agent của
  // project này nằm ở `.agent/workflows/blog-sync.md`.
  agentRules: false,
};

export default nextConfig;
