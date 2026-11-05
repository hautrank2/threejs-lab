import type { LessonModuleType } from "~/lab";
import * as THREE from "three";

export const lesson: LessonModuleType = {
  demos: [
    {
      id: "fog",
      title: "Một hàng khối chạy về phía xa",
      lab: { helpers: true },
      setup: (lab) => {
        const { scene, camera, gui, readout } = lab;
        camera.position.set(2, 2, 8);

        // Scene chỉ là node gốc, cộng ba global property: background, fog, environment
        scene.background = new THREE.Color(0x0e1116);

        const geometry = new THREE.BoxGeometry(1, 1.5, 1);
        const material = new THREE.MeshStandardMaterial({ color: 0x94a3b8 });

        // một hàng khối chạy về phía xa — để nhìn thấy fog
        const row = new THREE.Group();
        row.name = "hang-khoi";
        for (let i = 0; i < 24; i++) {
          const cube = new THREE.Mesh(geometry, material);
          cube.position.set(i % 2 ? 1.5 : -1.5, 0.75, -i * 1.4);
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
        scene.fog = new THREE.Fog(params.background, params.near, params.far);

        gui
          .add(params, "fog")
          .onChange(
            (on) =>
              (scene.fog = on
                ? new THREE.Fog(params.background, params.near, params.far)
                : null),
          );
        gui
          .add(params, "near", 0, 30, 0.1)
          .onChange((v) => scene.fog && ((scene.fog as THREE.Fog).near = v));
        gui
          .add(params, "far", 5, 80, 0.1)
          .onChange((v) => scene.fog && ((scene.fog as THREE.Fog).far = v));
        gui.addColor(params, "background").onChange((value) => {
          (scene.background as THREE.Color).set(value);
          if (scene.fog) (scene.fog as THREE.Fog).color.set(value);
        });
        gui.add(params, "removeRow").name("Remove blocks");
        gui.add(params, "addRow").name("Add blocks");

        // đếm bằng traverse: cả cây, không chỉ con trực tiếp
        let total = 0;
        scene.traverse(() => total++);
        readout(
          `scene.children: ${scene.children.length}\ntraverse đếm được: ${total}`,
        );
      },
    },
  ],
};
