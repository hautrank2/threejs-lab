---
name: blog-sync
description: Giữ threejs-lab khớp với track note content/blog/threejs bên portfolio.
---

# blog-sync — đồng bộ note ↔ lab

Hai project, một giáo trình:

| | |
| --- | --- |
| **Nguồn sự thật** | `portfolio/content/blog/threejs/**/*.md` — 45 bài + phụ lục |
| **Bản chạy được** | `threejs-lab/src/lessons/*.ts` — đúng những bài tập trong note đó |
| **Mục lục nối hai bên** | `threejs-lab/src/lessons/registry.ts` |

Note trả lời *vì sao*, lab trả lời *trông thế nào khi chạy*. Note viết trước,
lab theo sau. Không bao giờ ngược lại: một bài tập chỉ tồn tại trong lab mà
không có note thì nằm ở chặng `lab-rieng`, không chen vào 45 bài.

---

## Ba thứ phải khớp

1. **Slug.** Slug trong `registry.ts` trùng tên file `.md` bên blog.
   `content/blog/threejs/anh-sang/lights.md` ↔ `{ slug: "lights" }` trong chặng
   `anh-sang` ↔ route `#/anh-sang/lights`.
2. **Thứ tự.** Mảng `tree` trong `registry.ts` chép đúng mảng `order:` của từng
   `index.md`. Đổi thứ tự bên blog thì đổi luôn bên này, cùng một lần sửa.
3. **Backlog.** Mục nào có trong `order:` mà chưa có file `.md` thì bên blog
   render thành node xám. Bên lab nó là `kind: "planned"` — vẫn hiện trong mục
   lục, mờ đi, không bấm được.

Bốn `kind` của một node:

| kind | Nghĩa | Sidebar |
| --- | --- | --- |
| `section` | Một chặng | Gập/mở được |
| `lesson` | Note đã viết **và** bài tập đã dựng | Bấm được, có canvas |
| `note` | Note đã viết nhưng không có gì để chạy (Bài 1, 2, 3, 5) | Bấm được, chỉ có chữ |
| `planned` | Chưa viết note, chưa dựng lab | Mờ, không bấm được |

Con số ở sidebar (hiện là `19/50`) chính là số node `lesson` trên tổng số node lá.

---

## Thêm một bài mới

Sau khi note bên blog đã viết xong:

1. **Tạo module bài học** — `src/lessons/<số>-<slug>.ts`, số là số bài trong
   giáo trình (`19-lights.ts`). Bài phụ lục không có số: `phu-luc-dispose.ts`.

   ```ts
   import * as THREE from "three";
   import type { LessonModuleType } from "~/lab";

   export const lesson: LessonModuleType = {
     demos: [
       {
         id: "ten-ngan",
         title: "Tiêu đề tab",           // hiện khi bài có nhiều hơn một bài tập
         lab: { helpers: false },        // tuỳ chọn của createLab
         setup: (lab) => {
           // dán code trong mục "Bài tập" của note vào đây
         },
       },
     ],
   };
   ```

2. **Khai báo vào `registry.ts`** — đúng chặng, đúng vị trí trong `order:`. Đổi
   `kind` từ `planned` sang `lesson`, thêm `description`, `blogPath`, `breaks`,
   và `load: () => import("./19-lights")`.

3. **`breaks`** chép từ mục **Thử phá** của note. Đây là phần đáng chép nhất —
   nó là lý do cái lab tồn tại.

4. Chạy `npm run typecheck`, mở bài đó, xoay thử, xong.

Một note có nhiều "Bài tập 1 / Bài tập 2" thì thành nhiều phần tử trong `demos`,
không tách thành hai node.

---

## Sáu chỗ lab lệch khỏi code trong note

Code trong note viết cho một trang tĩnh chạy độc lập. Lab là một app có điều
hướng, nên có sáu chỗ sửa **cố ý**. Khi chép code từ note sang, sửa đúng sáu chỗ
này, không sửa gì thêm:

| Note (`lab.ts` Bài 8) | Lab (`src/lab/create-lab.ts`) | Vì sao |
| --- | --- | --- |
| `document.body.append(canvas)` | `container.append(canvas)` | Canvas nằm trong khung bài học, không chiếm cả trang |
| `addEventListener("resize")` | `ResizeObserver(container)` | Khung co giãn theo sidebar, không chỉ theo cửa sổ |
| `innerWidth` / `innerHeight` | `lab.size()` | Cùng lý do trên |
| `new GUI({ title })` mỗi bài | `lab.gui` do lab sở hữu | Panel phải bị `destroy()` khi rời bài |
| `addEventListener(...)` trực tiếp | `lab.on(target, type, fn)` | Listener tự gỡ |
| không có dọn dẹp | `lab.dispose()` + `lab.onCleanup(fn)` | Xem `phu-luc/dispose-va-memory-leak` |

`lab.dispose()` chạy đúng thứ tự trong note phụ lục: dừng `setAnimationLoop`
trước, rồi mới tới controls, gui, `disposeObject(scene)`, renderer.

**Giữ `StrictMode`.** React mount → unmount → mount lại ở dev là máy dò rò rỉ
miễn phí: `dispose()` sai thì thấy ngay hai canvas hoặc scene chạy nhanh gấp
đôi. Đừng tắt nó để "sửa" lỗi đó.

---

## Nhật ký lệch — thứ lab phát hiện mà note chưa có

Note ghi "đã chạy thật trên **three r182**". Lab đang chạy **r185**. Hai chỗ đã
lộ ra khi dựng lab, **nên cập nhật ngược lại vào note**:

- **`THREE.Clock` bị deprecate ở r185.** Mỗi bài in một dòng cảnh báo. Bản thay
  thế là `THREE.Timer` (đã có trong core, không phải addon): `timer.update()`
  một lần đầu vòng lặp, rồi `getDelta()` / `getElapsed()` gọi bao nhiêu lần cũng
  ra cùng một giá trị — đúng cái bẫy 2 mà Bài 12 mô tả, giờ hết bẫy. Thêm
  `timer.connect(document)` thì delta không còn nhảy vọt khi quay lại tab, tức
  là bẫy 3 cũng được xử lý sẵn. Lab vẫn giữ `Math.min(delta, 0.1)` cho chắc.
- **`renderer.dispose()` không trả lại WebGL context ngay.** Đổi bài khoảng
  mười lần là trình duyệt bắn `Too many active WebGL contexts. Oldest context
  will be lost.` Phải gọi thêm `renderer.forceContextLoss()`. Danh sách dọn dẹp
  7 bước trong note phụ lục còn thiếu đúng dòng này.

Một con số đo được, hợp với Bài 5 (bundle size): chunk của **Bài 19 nặng
250 kB** trong khi mọi bài khác dưới 6 kB. Thủ phạm là
`RectAreaLightUniformsLib` — nó nhúng sẵn bảng tra LTC. Đó là cái giá thật của
một cái đèn.

---

## Đổi tên hoặc đổi thứ tự bên blog

Sửa `order:` trong `index.md` mà quên `registry.ts` thì không có lỗi nào cả —
hai bên chỉ lặng lẽ khác nhau. Nên coi đây là một thao tác **hai file**:

```
content/blog/threejs/<chặng>/index.md      # order:
threejs-lab/src/lessons/registry.ts        # tree
```

Đổi tên file `.md` thì đổi cả `slug`, `blogPath`, và tên file trong
`src/lessons/`. Route ở hash sẽ đổi theo — không sao, lab không có link ngoài.

---

## Kiểm tra trước khi coi là xong

```bash
npm run typecheck        # tsc -b, strict, không any
npm run build            # tsc -b && vite build
npm run dev              # rồi bấm hết một lượt các bài trong chặng vừa sửa
```

Ba thứ nhìn bằng mắt sau khi đổi bài vài lần:

- Console **sạch** — không cảnh báo context, không cảnh báo deprecate.
- Trong DOM chỉ có **một** `canvas` và **một** `.lil-gui.root`.
- Bài `phu-luc/dispose-va-memory-leak` là bài tự kiểm tra: `geometries` phải
  đứng yên khi bật `dispose()`.

Blog chạy ở `http://localhost:8080` (`portfolio`, pnpm dev), lab ở
`http://localhost:5173`. Nút "Mở note bên blog" ở đầu mỗi bài trỏ sang cổng
8080 — đổi cổng thì sửa `BLOG_BASE` trong `registry.ts`.
