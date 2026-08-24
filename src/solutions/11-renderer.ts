import * as THREE from "three";
import type { LessonModuleType } from "~/lab";

export const lesson: LessonModuleType = {
  demos: [
    {
      id: "tone-mapping",
      title: "Pixel ratio, tone mapping và ba con số",
      lab: { helpers: false },
      setup: (lab) => {
        const { scene, renderer } = lab;

        const knot = new THREE.Mesh(
          new THREE.TorusKnotGeometry(1, 0.35, 200, 32),
          new THREE.MeshStandardMaterial({
            color: 0xf59e0b,
            metalness: 0.6,
            roughness: 0.25,
          }),
        );
        scene.add(knot);

        const params = {
          pixelRatio: Math.min(devicePixelRatio, 2),
          toneMapping: THREE.ACESFilmicToneMapping as number,
          exposure: 1,
        };

        const gui = lab.gui;

        gui
          .add(params, "pixelRatio", 0.25, 3, 0.25)
          .name("devicePixelRatio")
          .onChange((value: number) => {
            const { width, height } = lab.size();
            renderer.setPixelRatio(value);
            renderer.setSize(width, height);
          });

        gui
          .add(params, "toneMapping", {
            None: THREE.NoToneMapping,
            Linear: THREE.LinearToneMapping,
            Reinhard: THREE.ReinhardToneMapping,
            Cineon: THREE.CineonToneMapping,
            ACESFilmic: THREE.ACESFilmicToneMapping,
          })
          .onChange((value: number) => {
            renderer.toneMapping = Number(value) as THREE.ToneMapping;
          });

        gui.add(params, "exposure", 0, 3, 0.01).onChange((value: number) => {
          renderer.toneMappingExposure = value;
        });

        renderer.toneMapping = params.toneMapping as THREE.ToneMapping;

        let frames = 0;
        let acc = 0;

        lab.onTick((delta) => {
          knot.rotation.y += 0.4 * delta;

          frames++;
          acc += delta;
          if (acc >= 0.5) {
            const { width, height } = lab.size();
            lab.readout(
              `FPS        ${Math.round(frames / acc)}\n` +
                `draw call  ${renderer.info.render.calls}\n` +
                `tam giác   ${renderer.info.render.triangles.toLocaleString("vi-VN")}\n` +
                `pixel vẽ   ${((width * height * params.pixelRatio ** 2) / 1e6).toFixed(1)}M`,
            );
            frames = 0;
            acc = 0;
          }
        });
      },
    },
  ],
};
