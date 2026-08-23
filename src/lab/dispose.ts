import * as THREE from "three";

/**
 * Trả tài nguyên GPU của cả cây `root` về cho trình duyệt.
 *
 * `scene.remove()` chỉ gỡ khỏi cây scene — buffer đỉnh, texture và shader vẫn
 * nằm trên GPU cho tới khi được `dispose()`. Xem note phụ lục
 * `dispose-va-memory-leak` bên blog.
 *
 * Giả định geometry/material KHÔNG dùng chung với cây khác. Trong lab thì đúng,
 * vì mỗi bài dựng scene riêng và bị huỷ trọn gói khi chuyển bài.
 */
export function disposeObject(root: THREE.Object3D) {
  root.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (!mesh.isMesh) return;

    mesh.geometry.dispose();

    const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    for (const material of materials) {
      // mọi texture của material đều là một thuộc tính có cờ isTexture
      for (const value of Object.values(material)) {
        if ((value as THREE.Texture)?.isTexture) (value as THREE.Texture).dispose();
      }
      material.dispose();
    }
  });

  root.removeFromParent();
}
