import { useSyncExternalStore } from "react";

/**
 * Router đủ dùng cho một cái lab: đường dẫn nằm ở hash, không cần thư viện.
 * `#/chuan-bi/stats-panel` -> `"chuan-bi/stats-panel"`.
 */
const subscribe = (onChange: () => void) => {
  addEventListener("hashchange", onChange);
  return () => removeEventListener("hashchange", onChange);
};

const getSnapshot = () => location.hash.replace(/^#\/?/, "");

export const useHashRoute = () => useSyncExternalStore(subscribe, getSnapshot);

export const navigate = (path: string) => {
  location.hash = `#/${path}`;
};
