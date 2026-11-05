"use client";

import { useEffect, useState } from "react";
import type { DemoType } from "~/lab";
import { findLesson } from "~/lessons/registry";
import { DemoCanvas } from "./stage";

export type LessonEmbedProps = {
  /** `chặng/slug` — cùng khoá mà registry dùng. */
  path: string;
  /** `id` của demo; bỏ trống thì lấy demo đầu tiên của bài. */
  demoId?: string;
};

/**
 * Chỉ một khung canvas, không header, không sidebar — để blog nhúng qua
 * iframe. Vẫn là đúng một `createLab()` của `DemoCanvas`, nên dispose y hệt.
 */
export const LessonEmbed = ({ path, demoId }: LessonEmbedProps) => {
  const [demo, setDemo] = useState<DemoType | null>(null);

  useEffect(() => {
    const load = findLesson(path)?.lesson.load;
    if (!load) return;

    let cancelled = false;
    load().then((mod) => {
      if (cancelled) return;
      const { demos } = mod.lesson;
      setDemo(demos.find((item) => item.id === demoId) ?? demos[0] ?? null);
    });

    return () => {
      cancelled = true;
    };
  }, [path, demoId]);

  if (!demo) {
    return (
      <div className="lab-stage lab-stage-embed grid place-items-center text-sm text-foreground/40">
        Đang tải demo…
      </div>
    );
  }

  return <DemoCanvas key={demo.id} demo={demo} className="lab-stage-embed" />;
};
