import type { LessonModuleType } from "~/lab";
import * as THREE from "three";

/**
 * Bài 15 — Geometries
 * Hình dạng chỉ là mảng số. Segments là chỗ đốt hiệu năng dễ nhất.
 *
 * Note      /blog/threejs/geometry-material/geometries — đọc mục "Bài tập" rồi tự viết.
 * Đối chiếu src/solutions/15-geometries.ts — chỉ mở sau khi đã thử.
 *
 * `lab` có sẵn scene, camera, renderer, controls, gui, size, onTick, on,
 * readout, onCleanup — xem `src/lab/create-lab.ts`. Đừng tự dựng renderer
 * mới: mỗi bài đúng một `createLab()`, và nó tự dispose khi rời bài.
 */
export const lesson: LessonModuleType = {
  demos: [
    {
      id: "bang-tra",
      title: "Bảng tra 12 geometry dựng sẵn",
      lab: { helpers: false },
      setup: (lab) => {
        const { camera, scene, gui, readout } = lab;

        camera.position.set(0, 0, 12);

        const material = new THREE.MeshStandardMaterial({
          color: 0x94a3b8,
          roughness: 0.5,
        });

        const geometries: Record<string, THREE.BufferGeometry> = {
          Box: new THREE.BoxGeometry(1.2, 1.2, 1.2),
          Sphere: new THREE.SphereGeometry(0.8, 32, 16),
          Cylinder: new THREE.CylinderGeometry(0.6, 0.6, 1.4, 32),
          Cone: new THREE.ConeGeometry(0.8, 1.5, 32),
          Torus: new THREE.TorusGeometry(0.6, 0.25, 16, 48),
          TorusKnot: new THREE.TorusKnotGeometry(0.5, 0.2, 96, 16),
          Plane: new THREE.PlaneGeometry(1.5, 1.5),
          Circle: new THREE.CircleGeometry(0.8, 32),
          Ring: new THREE.RingGeometry(0.4, 0.8, 32),
          Icosahedron: new THREE.IcosahedronGeometry(0.9, 0),
          Dodecahedron: new THREE.DodecahedronGeometry(0.9),
          Capsule: new THREE.CapsuleGeometry(0.4, 0.8, 8, 16),
        };

        const names = Object.keys(geometries);
        const meshes: THREE.Mesh[] = [];

        names.forEach((name, i) => {
          const mesh = new THREE.Mesh(geometries[name], material);
          mesh.position.set(
            ((i % 4) - 1.5) * 3,
            (1 - Math.floor(i / 4)) * 3,
            0,
          );
          scene.add(mesh);
          meshes.push(mesh);
        });

        const params = { wireframe: false };
        gui.add(params, "wireframe").onChange((v) => (material.wireframe = v));

        // đếm vertices và triangles của từng loại
        const lines = names.map((name) => {
          const geometry = geometries[name];
          const index = geometry.getIndex();
          const vertices = geometry.attributes.position.count;
          const triangles = (index ? index.count : vertices) / 3;
          return `${name.padEnd(13)} ${String(vertices).padStart(5)} vertices  ${String(triangles).padStart(5)} triangles`;
        });

        readout(lines.join("\n"));
      },
    },
    {
      id: "tam-giac",
      title: "Tự dựng một triangle",
      lab: { helpers: false },
      setup: (lab) => {
        const { scene, onTick } = lab;
        const geometry = new THREE.BufferGeometry();

        const vertices = new Float32Array([0, 1, 0, -1, -1, 0, 1, -1, 0]);

        geometry.setAttribute(
          "position",
          new THREE.BufferAttribute(vertices, 3),
        );

        geometry.computeVertexNormals();

        const mesh = new THREE.Mesh(
          geometry,
          new THREE.MeshStandardMaterial({
            color: 0x38bdf8,
            side: THREE.DoubleSide,
          }),
        );

        scene.add(mesh);

        onTick((delta) => {
          mesh.rotation.y += delta;
        });
      },
    },
    {
      id: "song",
      title: "Sửa từng vertex lúc chạy",
      lab: { helpers: false },
      setup: (lab) => {
        const { scene, onTick } = lab;

        const geometry = new THREE.PlaneGeometry(10, 10, 64, 64);
        geometry.rotateX(-Math.PI / 2);

        const mesh = new THREE.Mesh(
          geometry,
          new THREE.MeshStandardMaterial({
            color: 0x38bdf8,
            roughness: 0.4,
            wireframe: false,
            side: THREE.DoubleSide,
          }),
        );
        scene.add(mesh);

        const position = geometry.attributes.position;
        const base = Float32Array.from(position.array);

        onTick((_delta, elapsed) => {
          for (let i = 0; i < position.count; i++) {
            const x = base[i * 3];
            const z = base[i * 3 + 2];
            position.setY(
              i,
              Math.sin(x * 0.7 + elapsed) * Math.cos(z * 0.7) * 0.6,
            );
          }

          position.needsUpdate = true;
          geometry.computeVertexNormals();
        });
      },
    },
  ],
};
