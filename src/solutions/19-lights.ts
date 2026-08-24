import * as THREE from "three";
import { RectAreaLightUniformsLib } from "three/addons/lights/RectAreaLightUniformsLib.js";
import { RectAreaLightHelper } from "three/addons/helpers/RectAreaLightHelper.js";
import type { LessonModuleType } from "~/lab";

export const lesson: LessonModuleType = {
  demos: [
    {
      id: "sau-loai",
      title: "Sáu loại đèn, bật tắt từng cái",
      // tắt đèn mặc định của lab: bài này tự bật từng cái một
      lab: { helpers: false, lights: false },
      setup: (lab) => {
        const { scene } = lab;
        lab.camera.position.set(0, 4, 9);

        RectAreaLightUniformsLib.init(); // BẮT BUỘC, nếu không RectAreaLight sẽ đen

        // sân khấu
        const floor = new THREE.Mesh(
          new THREE.PlaneGeometry(30, 30),
          new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.8 }),
        );
        floor.rotation.x = -Math.PI / 2;
        scene.add(floor);

        const props = new THREE.Group();
        scene.add(props);

        const material = new THREE.MeshStandardMaterial({
          color: 0xe2e8f0,
          roughness: 0.35,
          metalness: 0.1,
        });

        const sphere = new THREE.Mesh(new THREE.SphereGeometry(1, 48, 24), material);
        sphere.position.set(-2.5, 1, 0);
        props.add(sphere);

        const box = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.6, 1.6), material);
        box.position.set(0, 0.8, 0);
        props.add(box);

        const knot = new THREE.Mesh(
          new THREE.TorusKnotGeometry(0.6, 0.24, 128, 24),
          material,
        );
        knot.position.set(2.5, 1, 0);
        props.add(knot);

        // ---- sáu loại đèn ----
        const ambient = new THREE.AmbientLight(0xffffff, 0.15);

        const hemisphere = new THREE.HemisphereLight(0x60a5fa, 0xb45309, 0.6);
        hemisphere.position.set(0, 8, 0);

        const directional = new THREE.DirectionalLight(0xffffff, 2);
        directional.position.set(5, 6, 4);

        const point = new THREE.PointLight(0xf472b6, 30, 0, 2);
        point.position.set(-3, 2.5, 2);

        const spot = new THREE.SpotLight(0xfacc15, 60, 0, Math.PI / 8, 0.4, 2);
        spot.position.set(0, 7, 3);
        spot.target.position.set(0, 0, 0);
        scene.add(spot.target);

        const rect = new THREE.RectAreaLight(0x4ade80, 8, 4, 2);
        rect.position.set(0, 3, -4);
        rect.lookAt(0, 1, 0);

        const helpers = {
          directional: new THREE.DirectionalLightHelper(directional, 1, 0xffffff),
          point: new THREE.PointLightHelper(point, 0.3),
          spot: new THREE.SpotLightHelper(spot),
          hemisphere: new THREE.HemisphereLightHelper(hemisphere, 1),
          rect: new RectAreaLightHelper(rect),
        };
        rect.add(helpers.rect); // helper của RectAreaLight phải là CON của đèn

        const lights = { ambient, hemisphere, directional, point, spot, rect };
        type LightName = keyof typeof lights;

        const on: Record<LightName, boolean> = {
          ambient: true,
          hemisphere: false,
          directional: true,
          point: false,
          spot: false,
          rect: false,
        };

        const params = { helpers: true };

        function sync() {
          (Object.keys(lights) as LightName[]).forEach((name) => {
            const light = lights[name];
            if (on[name]) scene.add(light);
            else scene.remove(light);
          });

          (Object.keys(helpers) as Array<keyof typeof helpers>).forEach((name) => {
            if (name === "rect") return; // đã gắn vào đèn
            const helper = helpers[name];
            if (on[name as LightName] && params.helpers) scene.add(helper);
            else scene.remove(helper);
          });

          lab.readout(
            (Object.keys(lights) as LightName[])
              .map((name) => `${on[name] ? "●" : "○"} ${name}`)
              .join("\n") +
              `\n\nđang bật: ${(Object.keys(on) as LightName[]).filter((n) => on[n]).length}/6`,
          );
        }

        const gui = lab.gui;
        gui.add(params, "helpers").name("hiện helper").onChange(sync);

        const toggles = gui.addFolder("Bật / tắt");
        (Object.keys(lights) as LightName[]).forEach((name) =>
          toggles.add(on, name).onChange(sync),
        );

        const intensity = gui.addFolder("Cường độ");
        intensity.add(ambient, "intensity", 0, 2, 0.01).name("ambient");
        intensity.add(hemisphere, "intensity", 0, 3, 0.01).name("hemisphere");
        intensity.add(directional, "intensity", 0, 8, 0.01).name("directional");
        intensity.add(point, "intensity", 0, 120, 0.5).name("point");
        intensity.add(spot, "intensity", 0, 300, 1).name("spot");
        intensity.add(rect, "intensity", 0, 30, 0.1).name("rect");
        intensity.close();

        const spotFolder = gui.addFolder("Spot");
        spotFolder.add(spot, "angle", 0.05, Math.PI / 3, 0.01).onChange(() => {
          helpers.spot.update();
        });
        spotFolder.add(spot, "penumbra", 0, 1, 0.01);
        spotFolder.add(spot, "decay", 0, 3, 0.01);
        spotFolder.close();

        sync();

        // đèn nào đang bị gỡ khỏi scene thì disposeObject() không với tới
        lab.onCleanup(() => {
          for (const light of Object.values(lights)) light.dispose();
          for (const helper of Object.values(helpers)) helper.dispose();
        });

        lab.onTick((delta) => {
          props.rotation.y += 0.15 * delta;
          if (on.spot) helpers.spot.update();
        });
      },
    },
  ],
};
