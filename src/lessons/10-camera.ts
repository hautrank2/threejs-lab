import type { LessonModuleType } from "~/lab";
import * as THREE from "three";

export const lesson: LessonModuleType = {
  demos: [
    {
      id: "perspective",
      title: "Bốn khối giống hệt nhau, đặt xa dần",
      setup: (lab) => {
        // TODO — Bốn khối giống hệt nhau, đặt xa dần
        const { scene, camera, gui, readout } = lab;

        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshStandardMaterial({ color: 0x38bdf8 });

        // bốn khối giống hệt nhau, đặt xa dần — chỉ phối cảnh mới làm chúng khác kích thước
        for (let i = 0; i < 4; i++) {
          const cube = new THREE.Mesh(geometry, material);
          cube.position.set(-2 + i * 1.4, 0.5, -i * 3);
          scene.add(cube);
        }

        const params = { fov: 50, near: 0.1, far: 200 };

        // ĐỔI BẤT KỲ THAM SỐ NÀO CŨNG PHẢI GỌI updateProjectionMatrix()
        const apply = () => {
          camera.fov = params.fov;
          camera.near = params.near;
          camera.far = params.far;
          camera.updateProjectionMatrix();
          readout(
            `fov  ${params.fov.toFixed(0)}°\n` +
              `near ${params.near.toFixed(2)}\n` +
              `far  ${params.far.toFixed(0)}\n` +
              `tỉ lệ far/near = ${(params.far / params.near).toFixed(0)}  (càng lớn càng dễ z-fighting)`,
          );
        };

        gui.add(params, "fov", 10, 120, 1).onChange(apply);
        gui.add(params, "near", 0.01, 10, 0.01).onChange(apply);
        gui.add(params, "far", 5, 500, 1).onChange(apply);
        apply();
      },
    },
  ],
};
