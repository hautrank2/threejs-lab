import * as THREE from "three";
import type { LessonModuleType } from "~/lab";

export const lesson: LessonModuleType = {
  demos: [
    {
      id: "bang-tra",
      title: "Bảng tra 12 geometry dựng sẵn",
      lab: { helpers: false },
      setup: (lab) => {
        lab.camera.position.set(0, 0, 12);

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

        names.forEach((name, i) => {
          const mesh = new THREE.Mesh(geometries[name], material);
          mesh.position.set(((i % 4) - 1.5) * 3, (1 - Math.floor(i / 4)) * 3, 0);
          lab.scene.add(mesh);
        });

        lab.gui.add(material, "wireframe");

        // đếm đỉnh và tam giác của từng loại
        const lines = names.map((name) => {
          const geometry = geometries[name];
          const index = geometry.getIndex();
          const vertices = geometry.attributes.position.count;
          const triangles = (index ? index.count : vertices) / 3;
          return `${name.padEnd(13)} ${String(vertices).padStart(5)} đỉnh  ${String(
            triangles,
          ).padStart(5)} tam giác`;
        });

        lab.readout(lines.join("\n"));
      },
    },
    {
      id: "tam-giac",
      title: "Tự dựng một tam giác",
      lab: { helpers: false },
      setup: (lab) => {
        const geometry = new THREE.BufferGeometry();

        // ngược chiều kim đồng hồ = mặt trước
        const vertices = new Float32Array([0, 1, 0, -1, -1, 0, 1, -1, 0]);

        geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
        geometry.computeVertexNormals();

        const material = new THREE.MeshStandardMaterial({
          color: 0x38bdf8,
          side: THREE.DoubleSide,
        });
        const mesh = new THREE.Mesh(geometry, material);
        lab.scene.add(mesh);

        const params = { doubleSide: true };
        lab.gui.add(params, "doubleSide").onChange((on: boolean) => {
          material.side = on ? THREE.DoubleSide : THREE.FrontSide;
          material.needsUpdate = true;
        });

        lab.onTick((delta) => {
          mesh.rotation.y += 0.8 * delta;
        });

        lab.readout(
          "3 đỉnh, 1 tam giác.\nTắt doubleSide -> biến mất nửa vòng quay.",
        );
      },
    },
    {
      id: "song",
      title: "Sửa từng đỉnh lúc chạy",
      lab: { helpers: false },
      setup: (lab) => {
        const geometry = new THREE.PlaneGeometry(10, 10, 64, 64);
        geometry.rotateX(-Math.PI / 2);

        const material = new THREE.MeshStandardMaterial({
          color: 0x38bdf8,
          roughness: 0.4,
          wireframe: false,
        });
        lab.scene.add(new THREE.Mesh(geometry, material));

        const position = geometry.attributes.position;
        // giữ BẢN GỐC, nếu không sóng chồng lên sóng và mặt phẳng trôi vô hạn
        const base = Float32Array.from(position.array);

        const params = { needsUpdate: true, normals: true };
        lab.gui.add(material, "wireframe");
        lab.gui.add(params, "needsUpdate").name("position.needsUpdate");
        lab.gui.add(params, "normals").name("computeVertexNormals()");

        lab.onTick((_delta, elapsed) => {
          for (let i = 0; i < position.count; i++) {
            const x = base[i * 3];
            const z = base[i * 3 + 2];
            position.setY(i, Math.sin(x * 0.7 + elapsed) * Math.cos(z * 0.7) * 0.6);
          }

          if (params.needsUpdate) position.needsUpdate = true;
          if (params.normals) geometry.computeVertexNormals();
        });
      },
    },
  ],
};
