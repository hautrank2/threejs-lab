import * as THREE from "three";
import type { LessonModuleType } from "~/lab";

export const lesson: LessonModuleType = {
  demos: [
    {
      id: "chung",
      title: "Thuộc tính chung, và hai thứ cần needsUpdate",
      lab: { helpers: false },
      setup: (lab) => {
        lab.camera.position.set(0, 0, 5);

        const material = new THREE.MeshStandardMaterial({
          color: 0x38bdf8,
          roughness: 0.4,
        });

        lab.scene.add(
          new THREE.Mesh(new THREE.TorusKnotGeometry(1, 0.35, 128, 24), material),
        );

        // một mặt phẳng phía sau, để thấy rõ transparent và opacity
        const back = new THREE.Mesh(
          new THREE.PlaneGeometry(8, 8),
          new THREE.MeshStandardMaterial({ color: 0x1e293b }),
        );
        back.position.z = -2;
        lab.scene.add(back);

        const params = {
          color: "#38bdf8",
          side: THREE.FrontSide as number,
          flatShading: false,
        };

        const gui = lab.gui;

        gui.addColor(params, "color").onChange((v: string) => material.color.set(v));
        gui.add(material, "wireframe");
        gui.add(material, "visible");
        gui.add(material, "transparent").onChange(() => {
          material.needsUpdate = true;
        });
        gui.add(material, "opacity", 0, 1, 0.01);
        gui.add(material, "roughness", 0, 1, 0.01);
        gui.add(material, "metalness", 0, 1, 0.01);

        // hai thuộc tính dưới đây đổi cấu trúc shader -> BẮT BUỘC needsUpdate
        gui.add(params, "flatShading").onChange((v: boolean) => {
          material.flatShading = v;
          material.needsUpdate = true;
        });

        gui
          .add(params, "side", {
            Front: THREE.FrontSide,
            Back: THREE.BackSide,
            Double: THREE.DoubleSide,
          })
          .onChange((v: number) => {
            material.side = Number(v) as THREE.Side;
            material.needsUpdate = true;
          });

        lab.readout("opacity chỉ có tác dụng khi transparent = true.");
      },
    },
  ],
};
