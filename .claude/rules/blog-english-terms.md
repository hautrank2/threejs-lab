---
paths:
  - "content/blog/**/*.md"
---

# Blog notes — keep English terms in English

Notes are written in Vietnamese, but a word does **not** have to be translated
just because it can be. When the reader will meet the English word in the
code, the API, the docs or a tool's output, keep it in English.

## Keep in English

- **API names and their concepts** — `Scene`, `Mesh`, `Object3D`, property,
  method, constructor, callback, Pod, Deployment, manifest, volume, rollout.
- **Widely used technical nouns** — global property, render loop, frame,
  texture, shader, material, geometry, node, tree, state, cluster, container.
- **Headings** made of those terms — `## Global properties`, not
  `## Ba thuộc tính toàn cục`.

## Do not

- Coin Vietnamese replacements ("thuộc tính toàn cục" for global property,
  "bản khai" for a Kubernetes object, "lưới" for mesh).
- Mix both in one track: once a term is English, keep it English everywhere
  in that track.

## Still Vietnamese

The sentence around the term — explanations, warnings, the "why". Write
"`background` và `environment` độc lập nhau", not a fully English sentence.
When unsure whether a word counts as a term, ask: would a Vietnamese developer
say it in English while talking? If yes, keep it English.
