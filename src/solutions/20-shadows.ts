import * as THREE from "three";
import type { LessonModuleType } from "~/lab";

export const lesson: LessonModuleType = {
  demos: [
    {
      id: "ba-cong-tac",
      title: "Ba công tắc, và khung shadow camera",
      lab: { helpers: false, lights: false },
      setup: (lab) => {
        const { scene, renderer } = lab;
        lab.camera.position.set(6, 6, 10);

        // 1. bật shadow map ở RENDERER
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        scene.add(new THREE.AmbientLight(0xffffff, 0.25));

        // 2. bật castShadow ở ĐÈN
        const light = new THREE.DirectionalLight(0xffffff, 3);
        light.position.set(5, 8, 4);
        light.castShadow = true;
        light.shadow.mapSize.set(1024, 1024);
        light.shadow.camera.near = 1;
        light.shadow.camera.far = 30;
        light.shadow.camera.left = -10;
        light.shadow.camera.right = 10;
        light.shadow.camera.top = 10;
        light.shadow.camera.bottom = -10;
        scene.add(light);

        const shadowCameraHelper = new THREE.CameraHelper(light.shadow.camera);
        scene.add(shadowCameraHelper);

        // 3. bật castShadow / receiveShadow ở TỪNG MESH
        const floor = new THREE.Mesh(
          new THREE.PlaneGeometry(30, 30),
          new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.9 }),
        );
        floor.rotation.x = -Math.PI / 2;
        floor.receiveShadow = true;
        scene.add(floor);

        const material = new THREE.MeshStandardMaterial({
          color: 0xe2e8f0,
          roughness: 0.4,
        });
        const movers: THREE.Mesh[] = [];

        for (let i = 0; i < 5; i++) {
          const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.6, 32, 16), material);
          mesh.position.set(-4 + i * 2, 1.5, 0);
          mesh.castShadow = true;
          mesh.receiveShadow = true;
          scene.add(mesh);
          movers.push(mesh);
        }

        const params = {
          mapSize: 1024,
          helper: true,
          frame: 10,
          receiveShadow: true,
          type: THREE.PCFSoftShadowMap as number,
        };

        const gui = lab.gui;

        gui.add(params, "helper").name("hiện shadow camera").onChange((v: boolean) => {
          shadowCameraHelper.visible = v;
        });

        gui
          .add(params, "mapSize", [256, 512, 1024, 2048, 4096])
          .name("mapSize")
          .onChange((value: number) => {
            light.shadow.mapSize.set(Number(value), Number(value));
            light.shadow.map?.dispose(); // buộc dựng lại với kích thước mới
            light.shadow.map = null;
          });

        gui
          .add(params, "frame", 3, 20, 0.5)
          .name("nửa khung shadow camera")
          .onChange((value: number) => {
            light.shadow.camera.left = -value;
            light.shadow.camera.right = value;
            light.shadow.camera.top = value;
            light.shadow.camera.bottom = -value;
            light.shadow.camera.updateProjectionMatrix();
            shadowCameraHelper.update();
          });

        gui.add(params, "receiveShadow").name("floor.receiveShadow").onChange((v: boolean) => {
          floor.receiveShadow = v;
          (floor.material as THREE.Material).needsUpdate = true;
        });

        gui.add(light.shadow, "bias", -0.005, 0.005, 0.0001).name("bias (chống acne)");
        gui.add(light.shadow, "normalBias", 0, 0.1, 0.001).name("normalBias");
        gui.add(light.shadow, "radius", 0, 10, 0.1).name("radius (PCF / VSM)");

        gui
          .add(params, "type", {
            Basic: THREE.BasicShadowMap,
            PCF: THREE.PCFShadowMap,
            PCFSoft: THREE.PCFSoftShadowMap,
            VSM: THREE.VSMShadowMap,
          })
          .onChange((value: number) => {
            renderer.shadowMap.type = Number(value) as THREE.ShadowMapType;
            scene.traverse((obj) => {
              const mesh = obj as THREE.Mesh;
              if (mesh.isMesh) (mesh.material as THREE.Material).needsUpdate = true;
            });
          });

        lab.onCleanup(() => {
          light.dispose();
          shadowCameraHelper.dispose();
        });

        lab.onTick((_delta, elapsed) => {
          movers.forEach((mesh, i) => {
            mesh.position.y = 1.5 + Math.sin(elapsed * 1.5 + i * 0.7) * 1.1;
          });
        });
      },
    },
  ],
};
