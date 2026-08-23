import * as THREE from "three";
import type { LessonModuleType } from "~/lab";

export const lesson: LessonModuleType = {
  demos: [
    {
      id: "solar",
      title: "Hệ mặt trời hai tầng",
      lab: { helpers: false, lights: false },
      setup: (lab) => {
        const { scene } = lab;
        const sphere = new THREE.SphereGeometry(1, 48, 24);

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

        lab.camera.position.set(0, 8, 14);

        const params = { earthSpeed: 0.4, moonSpeed: 1.6, tuQuay: 0 };
        const gui = lab.gui;
        gui.add(params, "earthSpeed", 0, 2, 0.01).name("quỹ đạo trái đất");
        gui.add(params, "moonSpeed", 0, 6, 0.01).name("quỹ đạo mặt trăng");
        gui.add(params, "tuQuay", 0, 4, 0.01).name("trái đất tự quay");

        lab.onTick((delta) => {
          earthOrbit.rotation.y += params.earthSpeed * delta;
          moonOrbit.rotation.y += params.moonSpeed * delta;
          earth.rotation.y += params.tuQuay * delta;
        });
      },
    },
    {
      id: "local-world",
      title: "Nhìn thấy local và world cùng lúc",
      setup: (lab) => {
        const group = new THREE.Object3D();
        group.position.set(3, 0, 0);
        lab.scene.add(group);

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
        lab.scene.add(arrow);

        const world = new THREE.Vector3();
        const dir = new THREE.Vector3();

        lab.onTick((delta) => {
          group.rotation.y += 0.6 * delta;

          ball.getWorldPosition(world);
          // normalize() sửa TẠI CHỖ -> phải copy sang vector khác trước
          dir.copy(world).normalize();
          arrow.setDirection(dir);
          arrow.setLength(world.length(), 0.3, 0.15);

          lab.readout(
            `local  x=${ball.position.x.toFixed(2)}  (không bao giờ đổi)\n` +
              `world  x=${world.x.toFixed(2)}  z=${world.z.toFixed(2)}`,
          );
        });
      },
    },
  ],
};
