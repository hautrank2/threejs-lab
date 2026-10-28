import type { LessonNodeType, ProgressType } from "./types";

/** Blog chạy ở cổng 8080 (`portfolio/.claude/launch.json`). */
export const BLOG_BASE = "http://localhost:8080/blog/threejs";

/**
 * Cây bài học, chép đúng thứ tự `order:` trong các `index.md` của
 * `content/blog/threejs`. Node `planned` là bài có trong giáo trình mà chưa
 * dựng lab — giữ lại để sidebar vừa là mục lục vừa là backlog, đúng như blog.
 */
export const tree: LessonNodeType[] = [
  {
    kind: "section",
    slug: "chuan-bi",
    title: "Chặng 1 — Chuẩn bị (Bài 1–8)",
    description: "Dựng project, cài three, và ba công cụ đo đạc dùng suốt cả khoá.",
    blogPath: "/chuan-bi",
    children: [
      {
        kind: "note",
        slug: "hoc-the-nao",
        title: "Bài 1 — Học thế nào cho hết 45 bài",
        description:
          "Bốn bước cho mỗi bài, và ba cái bẫy làm người ta bỏ dở giữa chừng.",
        blogPath: "/chuan-bi/hoc-the-nao",
        summary: [
          "Bốn bước mỗi bài: xem một lượt không gõ gì, gõ lại từ đầu không tua video, \"phá\" nó bằng mục Thử phá, rồi commit với message là tên bài.",
          "Bẫy 1 — xem liền nhiều bài rồi mới gõ: tới lúc gõ lại quên mất bài trước nói gì.",
          "Bẫy 2 — copy code mẫu thay vì tự viết: nhanh hết khoá nhưng không viết nổi một scene từ số 0.",
          "Bẫy 3 — bỏ qua Bài 6–7 vì tưởng là phụ: Stats và GUI là hai công cụ dùng lại ở 37 bài sau.",
          "Thời gian thực ≈ 3 lần thời lượng video, vì phần lớn nằm ở gõ lại và sửa lỗi chính tả trong code.",
        ],
      },
      {
        kind: "note",
        slug: "moi-truong",
        title: "Bài 2 — Môi trường phát triển",
        description: "Node >= 20.19, VS Code, và hai extension đáng cài.",
        blogPath: "/chuan-bi/moi-truong",
        summary: [
          "Kiểm `node -v` trước khi bắt đầu: cần >= 20.19, vì Vite 6+ đã bỏ hỗ trợ Node 16 và 18.",
          "VS Code chỉ cần hai extension: ESLint, và một extension tô cú pháp GLSL cho lúc viết shader — không cần extension riêng cho Three.js vì @types/three đã lo gợi ý code.",
          "Bật `editor.formatOnSave` và trỏ `typescript.tsdk` vào bản TypeScript của project, để tránh lệch phiên bản với `tsc` khi build.",
          "DevTools: mở tab Console (lỗi shader chỉ hiện ở đây, không hiện trên màn hình) và tick Disable cache ở tab Network (tránh bug \"sửa file .glb rồi mà không thấy đổi\").",
        ],
      },
      {
        kind: "note",
        slug: "boilerplate",
        title: "Bài 3 — Tạo project",
        description: "Vite + TypeScript trong một lệnh, và ba file cần dọn sạch.",
        blogPath: "/chuan-bi/boilerplate",
        summary: [
          "`npm create vite@latest ... --template vanilla-ts` dựng xong project trong một lệnh.",
          "Xoá file mẫu của template (counter.ts, logo svg, nội dung HTML thừa) trước khi bắt đầu — để không chen vào scene ở bài sau.",
          "Reset CSS mặc định: `margin: 0` và `canvas { display: block }` — nguồn gốc của thanh cuộn thừa khi canvas full màn hình ở scene đầu tiên.",
          "Cấu trúc thư mục dùng cho cả khoá: `public/` chứa asset tĩnh (model, texture), `src/lab.ts` là khung dùng lại (Bài 8), mỗi bài xong thì commit riêng một lần.",
        ],
      },
      {
        kind: "lesson",
        slug: "cai-threejs",
        title: "Bài 4 — Cài three và @types/three",
        description: "Hai gói, và quy tắc khớp phiên bản minor.",
        blogPath: "/chuan-bi/cai-threejs",
        breaks: [
          "Chạy `npm ls three @types/three` — hai số minor phải khớp.",
          "Code Three.js đời cũ hay gãy ở ba chỗ: `Geometry`, `outputEncoding`, `texture.encoding`.",
        ],
        load: () => import("./04-cai-threejs"),
      },
      {
        kind: "note",
        slug: "import-module",
        title: "Bài 5 — Import module và bundle size",
        description: "Namespace hay named import? Đo bundle thật rồi mới kết luận.",
        blogPath: "/chuan-bi/import-module",
        summary: [
          "Ba kiểu import: namespace (`import * as THREE`), named (`import { Scene }`), và addons — `OrbitControls`, `GLTFLoader`... không nằm trong core, phải lấy từ `three/addons/*` kèm đuôi `.js` bắt buộc.",
          "Niềm tin \"namespace import làm bundle nặng hơn\" là sai: build Vite ra bundle giống hệt nhau (kể cả hash tên file), vì Rollup tree-shake tốt cả hai kiểu.",
          "Chọn kiểu import nào là chuyện đọc code cho dễ, không phải chuyện hiệu năng.",
          "Thứ thật sự làm nặng bundle là `WebGLRenderer` và `MeshStandardMaterial` (kéo theo toàn bộ shader + PBR) — một scene Three.js khó xuống dưới ~130 kB gzip.",
        ],
      },
      {
        kind: "lesson",
        slug: "stats-panel",
        title: "Bài 6 — Stats panel",
        description: "Ba con số ở góc màn hình, và lý do nên bật ngay từ bài đầu.",
        blogPath: "/chuan-bi/stats-panel",
        breaks: [
          "Bấm vào panel để chuyển sang bảng MS — MS tăng đều trong khi FPS đứng ở 60 rồi rơi đột ngột.",
          "Đổi `TorusKnotGeometry(0.7, 0.25, 128, 32)` thành `(0.7, 0.25, 16, 8)`: cùng số mesh, nhẹ hơn nhiều lần.",
          "Bỏ `stats.update()` ra khỏi tick — panel đứng hình.",
        ],
        load: () => import("./06-stats-panel"),
      },
      {
        kind: "lesson",
        slug: "dat-gui",
        title: "Bài 7 — GUI để vặn tham số",
        description: "dat.GUI đã cũ; lil-gui đi kèm sẵn trong gói three.",
        blogPath: "/chuan-bi/dat-gui",
        breaks: [
          "Bỏ min/max/step của `speed` — thanh trượt thành ô nhập số.",
          "Trỏ thẳng vào object Three.js: `gui.add(material, 'roughness', 0, 1, 0.01)` không cần onChange.",
          "Quy tắc: số/boolean thì trỏ thẳng; object (Color, Vector3) thì cần onChange.",
        ],
        load: () => import("./07-dat-gui"),
      },
      {
        kind: "lesson",
        slug: "course-boilerplate",
        title: "Bài 8 — Bộ khung dùng lại",
        description: "createLab() viết một lần, 37 bài sau chỉ tốn vài dòng để bắt đầu.",
        blogPath: "/chuan-bi/course-boilerplate",
        breaks: [
          "Đổi sang `MeshBasicMaterial` rồi tắt đèn — vẫn hiện, vì material này không cần ánh sáng.",
          "Bỏ `* delta` — khối quay như điên, vì 0.6 radian mỗi frame thay vì mỗi giây.",
          "Xoá `cube.position.y = 0.5` — nửa dưới chìm xuống lưới, vì gốc toạ độ của BoxGeometry ở tâm khối.",
        ],
        load: () => import("./08-course-boilerplate"),
      },
    ],
  },
  {
    kind: "section",
    slug: "ba-thanh-phan",
    title: "Chặng 2 — Scene, Camera, Renderer (Bài 9–12)",
    description: "Bộ ba tối thiểu để có pixel, và vòng lặp giữ cho nó sống.",
    blogPath: "/ba-thanh-phan",
    children: [
      {
        kind: "lesson",
        slug: "scene",
        title: "Bài 9 — Scene",
        description: "Node gốc của một cái cây, cộng ba thuộc tính toàn cục.",
        blogPath: "/ba-thanh-phan/scene",
        breaks: [
          "Tắt `fog` — khối ở xa hiện rõ mồn một, nhìn phẳng và giả ngay.",
          "Kéo `far` xuống gần bằng `near` — chuyển tiếp gắt như một bức tường sương mù.",
          "Đổi màu nền mà không đổi màu fog — vật ở xa tan vào một màu, nền lại màu khác.",
          "Bấm `scene.remove(row)`: `scene.children` đổi đúng 1 dù cả hàng có 24 khối.",
        ],
        load: () => import("./09-scene"),
      },
      {
        kind: "lesson",
        slug: "camera",
        title: "Bài 10 — Camera",
        description: "Bốn tham số, và một dòng quên gọi là hỏng cả bài.",
        blogPath: "/ba-thanh-phan/camera",
        breaks: [
          "Kéo `fov` từ 10 lên 120 — ở 10 bốn khối gần như bằng nhau, ở 120 khối gần phình to và méo ở rìa.",
          "Kéo `near` lên 5 — khối gần nhất bị cắt phẳng như bị dao xén ngang.",
          "Xoá `camera.updateProjectionMatrix()` trong hàm apply — số đổi, hình đứng im.",
        ],
        load: () => import("./10-camera"),
      },
      {
        kind: "lesson",
        slug: "renderer",
        title: "Bài 11 — Renderer",
        description: "Nơi duy nhất chạm vào GPU, và ba thiết lập quyết định đẹp hay nhoè.",
        blogPath: "/ba-thanh-phan/renderer",
        breaks: [
          "Kéo `devicePixelRatio` từ 0.25 lên 3 — pixel vẽ tăng theo bình phương, FPS tụt theo.",
          "Đổi tone mapping sang `None` — vùng sáng trên kim loại cháy thành mảng trắng bệt.",
          "Đổi `TorusKnotGeometry(1, 0.35, 200, 32)` thành `(1, 0.35, 1000, 64)` — draw call vẫn 1, tam giác nhân lên nhiều lần.",
        ],
        load: () => import("./11-renderer"),
      },
      {
        kind: "lesson",
        slug: "animation-loop",
        title: "Bài 12 — Animation loop và delta time",
        description: "Vì sao animation chạy nhanh gấp đôi trên màn 120Hz.",
        blogPath: "/ba-thanh-phan/animation-loop",
        breaks: [
          "DevTools → Performance → CPU throttling 4× — khối đỏ chậm hẳn, khối xanh giữ nguyên tốc độ.",
          "Bỏ `Math.min(clock.getDelta(), 0.1)` rồi chuyển tab 30 giây — khối xanh nhảy vọt khi quay lại.",
          "Gọi `getDelta()` thừa một lần ở đầu tick — khối xanh gần như đứng im.",
        ],
        load: () => import("./12-animation-loop"),
      },
    ],
  },
  {
    kind: "section",
    slug: "object3d",
    title: "Chặng 3 — Object3D (Bài 13–14)",
    description: "Lớp cha của mọi thứ trong scene, và phép nhân ma trận theo cây.",
    blogPath: "/object3d",
    children: [
      {
        kind: "lesson",
        slug: "object3d",
        title: "Bài 13 — Object3D",
        description: "position, rotation, scale chỉ là lớp vỏ của một ma trận 4×4.",
        blogPath: "/object3d/object3d",
        breaks: [
          "Kéo `position.x` và nhìn `matrix[12]` đổi theo đúng con số đó.",
          "Kéo `scale.y` lên 3 rồi kéo `position.y` — vật cao lên nhưng không bị bắn đi xa.",
          "Đổi `order` sang ZYX khi rotation.x và rotation.z cùng khác 0 — tư thế khác hẳn.",
          "Thêm `cube.matrixAutoUpdate = false` — mọi thanh trượt ngừng có tác dụng.",
        ],
        load: () => import("./13-object3d"),
      },
      {
        kind: "lesson",
        slug: "hierarchy",
        title: "Bài 14 — Object3D hierarchy",
        description: "Cây scene chính là phép nhân ma trận dây chuyền.",
        blogPath: "/object3d/hierarchy",
        breaks: [
          "`earthOrbit.scale.set(2, 1, 1)` — quỹ đạo méo thành elip VÀ trái đất bị kéo xiên.",
          "Đổi `moonOrbit.position.x` thành 3 — mặt trăng bám vào node quỹ đạo, không bám vào trái đất.",
          "Đổi `earthOrbit.rotation.y` thành `.z` — cả hệ lật đứng dậy.",
          "`arrow.setDirection(world.normalize())` — mũi tên biến mất, vì normalize() sửa tại chỗ.",
        ],
        load: () => import("./14-hierarchy"),
      },
    ],
  },
  {
    kind: "section",
    slug: "geometry-material",
    title: "Chặng 4 — Geometry và Material (Bài 15–18)",
    description: "Hình dạng là mảng số, vẻ ngoài là material.",
    blogPath: "/geometry-material",
    children: [
      {
        kind: "lesson",
        slug: "geometries",
        title: "Bài 15 — Geometries",
        description: "Hình dạng chỉ là mảng số. Segments là chỗ đốt hiệu năng dễ nhất.",
        blogPath: "/geometry-material/geometries",
        breaks: [
          "Bật wireframe — Plane chỉ có 2 tam giác, TorusKnot có hàng nghìn.",
          "Đổi `SphereGeometry(0.8, 32, 16)` thành `(0.8, 128, 64)` — tăng ~16 lần, mắt gần như không phân biệt được.",
          "Tắt doubleSide ở tam giác tự dựng — biến mất nửa vòng quay.",
          "Tắt `position.needsUpdate` ở bài sóng — mặt phẳng đứng im dù mảng vẫn đang đổi.",
          "Tắt `computeVertexNormals()` — sóng vẫn nhấp nhô nhưng sáng phẳng lì.",
        ],
        load: () => import("./15-geometries"),
      },
      {
        kind: "lesson",
        slug: "materials",
        title: "Bài 16 — Material",
        description: "Thuộc tính chung, và hai thứ bắt buộc phải needsUpdate.",
        blogPath: "/geometry-material/materials",
        breaks: [
          "Kéo `opacity` xuống 0.3 khi `transparent` đang tắt — không có gì xảy ra.",
          "Bật `transparent` rồi xoay quanh nút thắt — có góc thấy phần trong vẽ sai thứ tự. Hạn chế cố hữu của alpha blending.",
          "Bật `flatShading` — bề mặt vỡ thành các mảnh phẳng.",
          "Đổi `side` sang Back — chỉ còn thấy mặt trong.",
        ],
        load: () => import("./16-materials"),
      },
      {
        kind: "lesson",
        slug: "common-materials",
        title: "Bài 17 — Các material hay dùng",
        description: "Tám loại đặt cạnh nhau, và cây quyết định chọn loại nào.",
        blogPath: "/geometry-material/common-materials",
        breaks: [
          "Bỏ đèn: Basic, Normal, Depth vẫn hiện, năm cái còn lại đen thui.",
          "Đổi `metalness` của Standard lên 1 — tối sầm lại, vì chưa có environment map (Bài 21).",
          "MeshDepthMaterial chuyển trắng sang đen theo khoảng cách — chính là thứ dựng shadow map ở Bài 20.",
        ],
        load: () => import("./17-common-materials"),
      },
      {
        kind: "lesson",
        slug: "lil-gui",
        title: "Bài 18 — lil-gui",
        description: "Thư mục, dropdown, preset, và mẹo trỏ thẳng vào object Three.js.",
        blogPath: "/geometry-material/lil-gui",
        breaks: [
          "Bấm nút in preset ra console, vặn loạn lên, rồi `gui.load()` với JSON vừa in.",
          "Tạo geometry mới ngay trong onChange thay vì dùng object `shapes` — `renderer.info.memory.geometries` leo mãi không xuống.",
        ],
        load: () => import("./18-lil-gui"),
      },
    ],
  },
  {
    kind: "section",
    slug: "anh-sang",
    title: "Chặng 5 — Ánh sáng (Bài 19–21)",
    description: "Bốn loại đèn, đổ bóng, và environment map.",
    blogPath: "/anh-sang",
    children: [
      {
        kind: "lesson",
        slug: "lights",
        title: "Bài 19 — Lights",
        description:
          "Sáu loại đèn, cái nào rẻ cái nào đắt, và vì sao RectAreaLight hay đen thui.",
        blogPath: "/anh-sang/lights",
        breaks: [
          "Bật một mình `ambient` — sáng đều tăm tắp, hoàn toàn phẳng, không phân biệt được hình khối.",
          "Bật một mình `directional` — có chiều sâu ngay, nhưng vùng khuất tối đen.",
          "Bật `point`, kéo intensity từ 0 lên 120 để cảm nhận thang đo vật lý mới (từ r155).",
          "Xoá `RectAreaLightUniformsLib.init()` rồi bật `rect` — đèn có đó mà không chiếu sáng gì cả.",
        ],
        load: () => import("./19-lights"),
      },
      {
        kind: "lesson",
        slug: "shadows",
        title: "Bài 20 — Shadows",
        description: "Ba công tắc phải bật cùng lúc, và cách chữa shadow acne.",
        blogPath: "/anh-sang/shadows",
        breaks: [
          "Đổi `mapSize` xuống 256 — viền bóng vỡ thành bậc thang rất rõ.",
          "Thu khung shadow camera lại — bóng của quả cầu ngoài rìa biến mất hoàn toàn.",
          "Kéo `bias` sang dương mạnh — bóng tách khỏi chân quả cầu (peter-panning).",
          "Tắt `floor.receiveShadow` — bóng biến mất sạch dù đèn và vật vẫn castShadow.",
        ],
        load: () => import("./20-shadows"),
      },
      {
        kind: "lesson",
        slug: "environment-maps",
        title: "Bài 21 — Environment maps",
        description: "Thứ thật sự làm scene đẹp lên, và nó rẻ hơn thêm đèn.",
        blogPath: "/anh-sang/environment-maps",
        breaks: [
          "Tắt `scene.environment` (giữ background) — năm quả cầu đen thui trên nền đẹp.",
          "Kéo `metalness` xuống 0 — vật trở lại thành nhựa trắng.",
          "Kéo `blurriness` từ 0 lên 1 — nền nhoè dần, vật thể nổi hẳn lên.",
          "Kéo `environmentIntensity` xuống 0.2 — tối lại nhưng vẫn giữ đúng hướng phản chiếu.",
        ],
        load: () => import("./21-environment-maps"),
      },
    ],
  },
  {
    kind: "section",
    slug: "tai-tai-nguyen",
    title: "Chặng 6 — Tải tài nguyên (Bài 22–25)",
    description: "Texture, LoadingManager và glTF.",
    blogPath: "/tai-tai-nguyen",
    children: [
      { kind: "planned", slug: "loading-assets", title: "Bài 22 — Loading assets" },
      { kind: "planned", slug: "loading-multiple", title: "Bài 23 — Loading multiple" },
      { kind: "planned", slug: "gltf-loader-1", title: "Bài 24 — glTF loader 1" },
      { kind: "planned", slug: "gltf-loader-2", title: "Bài 25 — glTF loader 2" },
    ],
  },
  {
    kind: "section",
    slug: "tuong-tac",
    title: "Chặng 7 — Tương tác (Bài 26–27)",
    description: "Raycaster và OrbitControls.",
    blogPath: "/tuong-tac",
    children: [
      { kind: "planned", slug: "raycaster", title: "Bài 26 — Raycaster" },
      { kind: "planned", slug: "orbit-controls", title: "Bài 27 — Orbit controls" },
    ],
  },
  {
    kind: "section",
    slug: "animation",
    title: "Chặng 8 — Animation (Bài 28–31)",
    description: "Từ lerp một dòng tới AnimationMixer của glTF.",
    blogPath: "/animation",
    children: [
      { kind: "planned", slug: "lerp", title: "Bài 28 — Lerp" },
      { kind: "planned", slug: "jeasings", title: "Bài 29 — jEasings" },
      { kind: "planned", slug: "gltf-animations", title: "Bài 30 — glTF animations" },
      { kind: "planned", slug: "gltf-draco", title: "Bài 31 — glTF DRACO" },
    ],
  },
  {
    kind: "section",
    slug: "physics",
    title: "Chặng 9 — Physics với Rapier (Bài 32–35)",
    description: "Thế giới vật lý chạy song song với scene.",
    blogPath: "/physics",
    children: [
      { kind: "planned", slug: "rapier", title: "Bài 32 — Rapier" },
      { kind: "planned", slug: "rapier-debug", title: "Bài 33 — Rapier debug" },
      {
        kind: "planned",
        slug: "pointer-lock-controls",
        title: "Bài 34 — Pointer lock controls",
      },
      {
        kind: "planned",
        slug: "impulse-joint-motors",
        title: "Bài 35 — Impulse joint motors",
      },
    ],
  },
  {
    kind: "section",
    slug: "game",
    title: "Chặng 10 — Obstacle Course Game (Bài 36–37)",
    description: "Ghép mọi thứ chín chặng trước thành một thứ chơi được.",
    blogPath: "/game",
    children: [
      { kind: "planned", slug: "obstacle-course-1", title: "Bài 36 — Obstacle course 1" },
      { kind: "planned", slug: "obstacle-course-2", title: "Bài 37 — Obstacle course 2" },
    ],
  },
  {
    kind: "section",
    slug: "deploy",
    title: "Chặng 11 — Deploy (Bài 38–45)",
    description: "Từ npm run build tới HTTPS trên domain riêng.",
    blogPath: "/deploy",
    children: [
      { kind: "planned", slug: "build-production", title: "Bài 38 — Build production" },
      { kind: "planned", slug: "github-pages", title: "Bài 39 — GitHub Pages" },
      { kind: "planned", slug: "gitlab-pages", title: "Bài 40 — GitLab Pages" },
      { kind: "planned", slug: "cloud-server", title: "Bài 41 — Cloud server" },
      { kind: "planned", slug: "nginx", title: "Bài 42 — Nginx" },
      { kind: "planned", slug: "deploy-files", title: "Bài 43 — Deploy files" },
      { kind: "planned", slug: "domain", title: "Bài 44 — Domain" },
      { kind: "planned", slug: "ssl", title: "Bài 45 — SSL" },
    ],
  },
  {
    kind: "section",
    slug: "phu-luc",
    title: "Phụ lục — ngoài giáo trình",
    description: "Vài thứ khoá học không nói tới nhưng sẽ gặp ngay ở dự án thật.",
    blogPath: "/phu-luc",
    children: [
      {
        kind: "lesson",
        slug: "dispose-va-memory-leak",
        title: "dispose() và rò rỉ bộ nhớ GPU",
        description: "scene.remove() không giải phóng gì cả.",
        blogPath: "/phu-luc/dispose-va-memory-leak",
        breaks: [
          "Để chế độ rò rỉ chạy một phút rồi mở Task Manager nhìn bộ nhớ trình duyệt.",
          "Dùng chung một geometry khai báo ngoài `spawn()` — `geometries` không tăng nữa kể cả khi không dispose.",
        ],
        load: () => import("./phu-luc-dispose"),
      },
      { kind: "planned", slug: "nhung-vao-react", title: "Nhúng vào React và Next.js" },
      { kind: "planned", slug: "color-space", title: "sRGB, linear và color management" },
      {
        kind: "planned",
        slug: "draw-call",
        title: "Draw call, InstancedMesh và renderer.info",
      },
    ],
  },
  {
    kind: "section",
    slug: "lab-rieng",
    title: "Lab riêng — ngoài blog",
    description: "Thứ nghịch thêm, chưa có note tương ứng bên blog.",
    children: [
      {
        kind: "lesson",
        slug: "text-3d",
        title: "Ba cách đưa chữ vào scene",
        description: "TextGeometry, canvas texture, và CSS2DRenderer.",
        breaks: [
          "Bỏ `textGeo.center()` — chữ lệch hẳn sang phải, vì gốc toạ độ nằm ở đầu dòng.",
          "Bỏ `texture.colorSpace = SRGBColorSpace` ở canvas texture — màu nhạt đi thấy rõ.",
          "Bỏ `labelRenderer.render()` trong tick — thẻ DOM đứng im một chỗ, không bám theo scene.",
        ],
        load: () => import("./lab-text-3d"),
      },
    ],
  },
];

/** Bài chạy được / tổng số bài, dùng cho thanh tiến độ ở sidebar. */
export function progressOf(node: LessonNodeType): ProgressType {
  if (!node.children?.length) {
    return { done: node.kind === "lesson" ? 1 : 0, total: 1 };
  }
  return node.children.reduce<ProgressType>(
    (acc, child) => {
      const next = progressOf(child);
      return { done: acc.done + next.done, total: acc.total + next.total };
    },
    { done: 0, total: 0 },
  );
}

export function totalProgress(): ProgressType {
  return tree.reduce<ProgressType>(
    (acc, node) => {
      const next = progressOf(node);
      return { done: acc.done + next.done, total: acc.total + next.total };
    },
    { done: 0, total: 0 },
  );
}

/** `chuan-bi/stats-panel` -> node, kèm chặng chứa nó. */
export function findLesson(path: string) {
  for (const section of tree) {
    for (const child of section.children ?? []) {
      if (`${section.slug}/${child.slug}` === path) return { section, lesson: child };
    }
  }
  return null;
}

/** Bài chạy được, theo đúng thứ tự đọc — cho nút Trước / Sau. */
export function runnableOrder(): Array<{ path: string; node: LessonNodeType }> {
  const out: Array<{ path: string; node: LessonNodeType }> = [];
  for (const section of tree) {
    for (const child of section.children ?? []) {
      if (child.kind === "lesson") {
        out.push({ path: `${section.slug}/${child.slug}`, node: child });
      }
    }
  }
  return out;
}
