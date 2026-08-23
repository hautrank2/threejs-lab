import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import GUI from "three/addons/libs/lil-gui.module.min.js";
import { disposeObject } from "./dispose";

export type TickFn = (delta: number, elapsed: number) => void;

export type CreateLabOptions = {
  /** Nơi cắm canvas. Khác bản trong blog: bài học không chiếm cả `document.body`. */
  container: HTMLElement;
  /** Lưới và trục toạ độ. */
  helpers?: boolean;
  /** Ambient + directional. Tắt khi bài học tự bật đèn (Bài 19–21). */
  lights?: boolean;
  /** Tiêu đề panel lil-gui. */
  title?: string;
};

export type Lab = {
  /** Khung chứa canvas. Bài nào cần cắm thêm DOM (Stats) thì cắm vào đây. */
  container: HTMLElement;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  controls: OrbitControls;
  /** Panel lil-gui do lab sở hữu — bài học chỉ việc `gui.add(...)`. */
  gui: GUI;
  /** Kích thước khung vẽ hiện tại. Thay cho `innerWidth` / `innerHeight`. */
  size: () => { width: number; height: number };
  onTick: (fn: TickFn) => void;
  /** In chữ ra góc trái. `console.log` trong vòng lặp 60Hz làm treo DevTools. */
  readout: (text: string) => void;
  /** Listener tự gỡ khi chuyển bài. */
  on: (target: EventTarget, type: string, handler: EventListener) => void;
  /** Việc cần làm khi rời bài (dispose PMREM, gỡ panel Stats…). */
  onCleanup: (fn: () => void) => void;
  dispose: () => void;
};

/**
 * `lab.ts` của Bài 8, sửa ba chỗ để sống được trong một app có điều hướng:
 * cắm vào `container` thay vì `body`, tự sở hữu panel GUI, và có `dispose()`.
 */
export function createLab({
  container,
  helpers = true,
  lights = true,
  title = "Tham số",
}: CreateLabOptions): Lab {
  const size = () => ({
    width: container.clientWidth || 1,
    height: container.clientHeight || 1,
  });

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0e1116);

  const { width, height } = size();
  const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 200);
  camera.position.set(4, 3, 6);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.domElement.classList.add("lab-canvas");
  container.append(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  if (lights) {
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const key = new THREE.DirectionalLight(0xffffff, 3);
    key.position.set(4, 6, 3);
    scene.add(key);
  }

  if (helpers) {
    scene.add(new THREE.GridHelper(20, 20, 0x3b4252, 0x232833));
    scene.add(new THREE.AxesHelper(2));
  }

  const gui = new GUI({ title, container });
  gui.domElement.classList.add("lab-gui");

  // Container co giãn theo sidebar và theo cửa sổ -> ResizeObserver, không phải
  // sự kiện `resize` của window.
  const observer = new ResizeObserver(() => {
    const next = size();
    camera.aspect = next.width / next.height;
    camera.updateProjectionMatrix();
    renderer.setSize(next.width, next.height);
  });
  observer.observe(container);

  const ticks: TickFn[] = [];
  const cleanups: Array<() => void> = [];

  // Blog viết bằng `THREE.Clock`; r185 đã deprecate nó. `Timer` cùng ý tưởng,
  // thêm `connect(document)` để không nhận delta khổng lồ khi quay lại tab.
  const timer = new THREE.Timer();
  timer.connect(document);

  renderer.setAnimationLoop(() => {
    timer.update();
    const delta = Math.min(timer.getDelta(), 0.1);
    const elapsed = timer.getElapsed();
    controls.update();
    for (const tick of ticks) tick(delta, elapsed);
    renderer.render(scene, camera);
  });

  let readoutEl: HTMLPreElement | null = null;
  const readout = (text: string) => {
    if (!readoutEl) {
      readoutEl = document.createElement("pre");
      readoutEl.className = "lab-readout";
      container.append(readoutEl);
    }
    readoutEl.textContent = text;
  };

  const on: Lab["on"] = (target, type, handler) => {
    target.addEventListener(type, handler);
    cleanups.push(() => target.removeEventListener(type, handler));
  };

  const dispose = () => {
    renderer.setAnimationLoop(null); // 1. dừng vòng lặp TRƯỚC mọi thứ khác
    for (const fn of cleanups.splice(0)) fn();
    ticks.length = 0;
    observer.disconnect();
    controls.dispose();
    gui.destroy();
    disposeObject(scene);
    timer.disconnect();
    renderer.dispose();
    // dispose() thôi thì context vẫn sống tới lúc GC dọn -> đổi bài vài lần là
    // đụng trần ~16 context của trình duyệt. Trả lại ngay tại đây.
    renderer.forceContextLoss();
    renderer.domElement.remove();
    readoutEl?.remove();
  };

  return {
    container,
    scene,
    camera,
    renderer,
    controls,
    gui,
    size,
    onTick: (fn) => ticks.push(fn),
    readout,
    on,
    onCleanup: (fn) => cleanups.push(fn),
    dispose,
  };
}
