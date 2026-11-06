import type { LessonModuleType } from "~/lab";
import * as THREE from "three";

/**
 * Bài 14 — Object3D hierarchy
 * Cây scene chính là phép nhân ma trận dây chuyền.
 *
 * Note      /blog/threejs/object3d/hierarchy — đọc mục "Bài tập" rồi tự viết.
 * Đối chiếu src/solutions/14-hierarchy.ts — chỉ mở sau khi đã thử.
 *
 * `lab` có sẵn scene, camera, renderer, controls, gui, size, onTick, on,
 * readout, onCleanup — xem `src/lab/create-lab.ts`. Đừng tự dựng renderer
 * mới: mỗi bài đúng một `createLab()`, và nó tự dispose khi rời bài.
 */
export const lesson: LessonModuleType = {
  demos: [
    {
      id: "solar",
      title: "Hệ mặt trời hai tầng",
      lab: { helpers: false, lights: false },
      setup: (lab) => {
        const { scene, onTick } = lab;

        const sphere = new THREE.SphereGeometry(1, 32, 16);
        const sun = new THREE.Mesh(
          sphere,
          new THREE.MeshBasicMaterial({ color: 0xfbbf24 }),
        );
        scene.add(sun);
        scene.add(new THREE.PointLight(0xffffff, 400));
        scene.add(new THREE.AmbientLight(0xffffff, 0.15));

        const earthOrbit = new THREE.Object3D();
        scene.add(earthOrbit);

        const earth = new THREE.Mesh(
          sphere,
          new THREE.MeshStandardMaterial({ color: 0x38bdf8 }),
        );
        earth.position.x = 6;
        earth.scale.setScalar(0.4);
        earthOrbit.add(earth);

        const moonOrbit = new THREE.Object3D();
        moonOrbit.position.x = 6;
        earthOrbit.add(moonOrbit);

        const moon = new THREE.Mesh(
          sphere,
          new THREE.MeshStandardMaterial({ color: 0xe2e8f0 }),
        );
        moon.position.x = 1.4;
        moon.scale.setScalar(0.15);
        moonOrbit.add(moon);

        onTick((delta) => {
          earthOrbit.rotation.y += 0.4 * delta;
          moonOrbit.rotation.y += 1.6 * delta;
        });
      },
    },
    {
      id: "local-world",
      title: "Nhìn thấy local và world cùng lúc",
      setup: (lab) => {
        const { scene, onTick, readout } = lab;

        const group = new THREE.Object3D();
        group.position.set(3, 0, 0);
        scene.add(group);

        const ball = new THREE.Mesh(
          new THREE.SphereGeometry(0.3, 32, 16),
          new THREE.MeshStandardMaterial({ color: 0xf472b6 }),
        );
        ball.position.set(1.5, 0, 0);
        group.add(ball);

        const arrow = new THREE.ArrowHelper(
          new THREE.Vector3(1, 0, 0),
          new THREE.Vector3(),
          1,
          0xfacc15,
        );
        scene.add(arrow);

        const world = new THREE.Vector3();
        const dir = new THREE.Vector3();

        onTick((delta) => {
          group.rotation.y += 0.6 * delta;

          ball.getWorldPosition(world);
          dir.copy(world).normalize();
          arrow.setDirection(dir);
          arrow.setLength(world.length());

          readout(
            `local  x=${ball.position.x.toFixed(2)}  (không bao giờ đổi)\n` +
              `world  x=${world.x.toFixed(2)}  z=${world.z.toFixed(2)}`,
          );
        });
      },
    },
  ],
};
