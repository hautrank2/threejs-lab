import type { LessonModuleType } from "~/lab";

type SolutionLoaderType = () => Promise<{ lesson: LessonModuleType }>;

/**
 * Đáp án theo `chặng/slug` — CHỈ route `/embed` dùng, để demo nhúng trong
 * blog luôn là kết quả hoàn chỉnh. Trang lab vẫn chạy stub trong
 * `src/lessons/` (registry không import gì từ đây), nên bài tập không bị lộ.
 * Import động: mỗi đáp án là một chunk riêng, chỉ tải khi blog mở iframe.
 */
export const solutionLoaders: Record<string, SolutionLoaderType> = {
  "chuan-bi/cai-threejs": () => import("~/solutions/04-cai-threejs"),
  "chuan-bi/stats-panel": () => import("~/solutions/06-stats-panel"),
  "chuan-bi/dat-gui": () => import("~/solutions/07-dat-gui"),
  "chuan-bi/course-boilerplate": () => import("~/solutions/08-course-boilerplate"),
  "ba-thanh-phan/scene": () => import("~/solutions/09-scene"),
  "ba-thanh-phan/camera": () => import("~/solutions/10-camera"),
  "ba-thanh-phan/renderer": () => import("~/solutions/11-renderer"),
  "ba-thanh-phan/animation-loop": () => import("~/solutions/12-animation-loop"),
  "object3d/object3d": () => import("~/solutions/13-object3d"),
  "object3d/hierarchy": () => import("~/solutions/14-hierarchy"),
  "geometry-material/geometries": () => import("~/solutions/15-geometries"),
  "geometry-material/materials": () => import("~/solutions/16-materials"),
  "geometry-material/common-materials": () => import("~/solutions/17-common-materials"),
  "geometry-material/lil-gui": () => import("~/solutions/18-lil-gui"),
  "anh-sang/lights": () => import("~/solutions/19-lights"),
  "anh-sang/shadows": () => import("~/solutions/20-shadows"),
  "anh-sang/environment-maps": () => import("~/solutions/21-environment-maps"),
  "phu-luc/dispose-va-memory-leak": () => import("~/solutions/phu-luc-dispose"),
  "lab-rieng/text-3d": () => import("~/solutions/lab-text-3d"),
};
