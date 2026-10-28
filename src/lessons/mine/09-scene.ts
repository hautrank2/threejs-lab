import type { DemoSetupFn } from "~/lab";
import * as THREE from "three";
/**
 * Bài 9 — Scene — "Một hàng khối chạy về phía xa".
 * Code tự viết ở đây, file stub chỉ import và gọi lại.
 */
export const sceneFog: DemoSetupFn = (_lab) => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0e1116);
};
