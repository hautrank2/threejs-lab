import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AppShell } from "~/components/layouts/app-shell";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "threejs-lab",
    template: "%s — threejs-lab",
  },
  description:
    "Bài tập chạy được của giáo trình Three.js 45 bài: chọn bài, vặn thanh trượt, rồi thử phá.",
};

/**
 * Nền tối là mặc định, giống blog. Không có công tắc sáng/tối, nên class `dark`
 * nằm thẳng trên `<html>` — không cần script chống nhấp nháy như next-themes.
 */
const RootLayout = ({ children }: { children: ReactNode }) => (
  <html lang="vi" className="dark">
    <body>
      <AppShell>{children}</AppShell>
    </body>
  </html>
);

export default RootLayout;
