import { createLab, type LessonModuleType } from "~/lab";
import * as THREE from "three";
import GUI from "three/examples/jsm/libs/lil-gui.module.min.js";

/**
 * Bài 9 — Scene
 * Node gốc của một cái cây, cộng ba thuộc tính toàn cục.
 *
 * Note      /blog/threejs/ba-thanh-phan/scene — đọc mục "Bài tập" rồi tự viết.
 * Đối chiếu src/solutions/09-scene.ts — chỉ mở sau khi đã thử.
 *
 * `lab` có sẵn scene, camera, renderer, controls, gui, size, onTick, on,
 * readout, onCleanup — xem `src/lab/create-lab.ts`. Đừng tự dựng renderer
 * mới: mỗi bài đúng một `createLab()`, và nó tự dispose khi rời bài.
 */
const color = 0x0e1116;
export const lesson: LessonModuleType = {
  demos: [
    {
      id: "fog",
      title: "Một hàng khối chạy về phía xa",
      lab: { helpers: false },
      setup: (lab) => {
        const { gui } = lab;
        const { scene, camera, readout } = createLab(lab);
        camera.position.set(2, 2, 8);

        // Scene chỉ là node gốc, cộng ba global property: background, fog, environment
        scene.background = new THREE.Color(0x0e1116);
        scene.fog = new THREE.Fog(0x0e1116, 6, 40);

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
        gui.add(params, "removeRow").name("scene.remove(row)");
        gui.add(params, "addRow").name("scene.add(row)");

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
