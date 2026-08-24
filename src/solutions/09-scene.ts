import * as THREE from "three";
import type { LessonModuleType } from "~/lab";

export const lesson: LessonModuleType = {
  demos: [
    {
      id: "fog",
      title: "Một hàng khối chạy về phía xa",
      lab: { helpers: false },
      setup: (lab) => {
        const { scene, camera } = lab;
        camera.position.set(0, 2, 8);

        // Scene chỉ là node gốc, cộng ba thuộc tính toàn cục:
        // background, fog, environment
        scene.background = new THREE.Color(0x0e1116);
        scene.fog = new THREE.Fog(0x0e1116, 6, 40);

        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshStandardMaterial({ color: 0x94a3b8 });

        const row = new THREE.Group();
        row.name = "hang-khoi";
        for (let i = 0; i < 24; i++) {
          const cube = new THREE.Mesh(geometry, material);
          cube.position.set(i % 2 ? 1.5 : -1.5, 0, -i * 1.4);
          row.add(cube);
        }
        scene.add(row);

        const params = {
          fog: true,
          near: 6,
          far: 40,
          background: "#0e1116",
          removeRow: () => scene.remove(row),
          addRow: () => scene.add(row),
        };

        const gui = lab.gui;
        gui.add(params, "fog").onChange((on: boolean) => {
          scene.fog = on
            ? new THREE.Fog(params.background, params.near, params.far)
            : null;
        });
        gui.add(params, "near", 0, 30, 0.1).onChange((v: number) => {
          if (scene.fog) (scene.fog as THREE.Fog).near = v;
        });
        gui.add(params, "far", 5, 80, 0.1).onChange((v: number) => {
          if (scene.fog) (scene.fog as THREE.Fog).far = v;
        });
        gui.addColor(params, "background").onChange((value: string) => {
          (scene.background as THREE.Color).set(value);
          if (scene.fog) (scene.fog as THREE.Fog).color.set(value);
        });
        gui.add(params, "removeRow").name("scene.remove(row)");
        gui.add(params, "addRow").name("scene.add(row)");

        // đếm bằng traverse: cả cây, không chỉ con trực tiếp
        lab.onTick(() => {
          let total = 0;
          scene.traverse(() => total++);
          lab.readout(
            `scene.children:    ${scene.children.length}\n` +
              `traverse đếm được: ${total}`,
          );
        });
      },
    },
  ],
};
