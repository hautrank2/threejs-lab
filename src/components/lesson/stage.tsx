"use client";

import { useEffect, useRef, useState } from "react";
import { ExternalLink, Hammer } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { createLab } from "~/lab";
import type { DemoType } from "~/lab";
import { BLOG_BASE, findLesson } from "~/lessons/registry";
import { cn } from "~/lib/utils";

type DemoCanvasProps = {
  demo: DemoType;
};

/**
 * Một bài tập, một `createLab()`. Đổi bài là huỷ trọn gói rồi dựng lại —
 * `lab.dispose()` chạy trong hàm dọn của effect, đúng như note phụ lục.
 */
const DemoCanvas = ({ demo }: DemoCanvasProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const lab = createLab({
      container,
      title: demo.title,
      helpers: demo.lab?.helpers,
      lights: demo.lab?.lights,
    });

    let cleanup: (() => void) | void;
    let cancelled = false;

    // setup có thể là async (bài nào phải chờ FontLoader / GLTFLoader)
    Promise.resolve(demo.setup(lab)).then((fn) => {
      if (cancelled) fn?.();
      else cleanup = fn;
    });

    return () => {
      cancelled = true;
      cleanup?.();
      lab.dispose();
    };
  }, [demo]);

  return <div ref={ref} className="lab-stage" />;
};

export type LessonStageProps = {
  /** `chặng/slug` — cùng khoá mà route dùng. */
  path: string;
};

/**
 * Nội dung một bài. Nhận `path` chứ không nhận cả node: registry chứa hàm
 * `load()`, mà hàm thì không đi qua được ranh giới server -> client. Tra lại
 * node ngay bên client là xong, cùng một object trong module.
 */
export const LessonStage = ({ path }: LessonStageProps) => {
  const lesson = findLesson(path)?.lesson ?? null;
  const [demos, setDemos] = useState<DemoType[] | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    setDemos(null);
    setActive(0);

    const load = lesson?.load;
    if (!load) return;

    let cancelled = false;
    load().then((mod) => {
      if (!cancelled) setDemos(mod.lesson.demos);
    });

    return () => {
      cancelled = true;
    };
  }, [lesson]);

  if (!lesson) return null;

  const demo = demos?.[active];

  return (
    <article className="flex min-h-0 flex-1 flex-col">
      <header className="border-b border-border/60 px-6 py-5">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-lg font-semibold tracking-tight">{lesson.title}</h1>
          {lesson.kind === "note" && (
            <Badge variant="outline" className="rounded-full text-[0.7rem]">
              chỉ có lý thuyết
            </Badge>
          )}
          {lesson.blogPath && (
            <a
              href={`${BLOG_BASE}${lesson.blogPath}`}
              target="_blank"
              rel="noreferrer"
              className="ml-auto inline-flex items-center gap-1.5 text-xs text-foreground/50 transition-colors hover:text-primary"
            >
              Mở note bên blog
              <ExternalLink size={12} />
            </a>
          )}
        </div>

        {lesson.description && (
          <p className="mt-1.5 max-w-3xl text-sm text-foreground/60">
            {lesson.description}
          </p>
        )}

        {demos && demos.length > 1 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {demos.map((item, index) => (
              <Button
                key={item.id}
                size="sm"
                variant={index === active ? "secondary" : "ghost"}
                onClick={() => setActive(index)}
                className={cn("h-7 text-xs", index === active && "font-medium")}
              >
                {index + 1}. {item.title}
              </Button>
            ))}
          </div>
        )}
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {lesson.load ? (
          demo ? (
            <DemoCanvas key={`${path}:${demo.id}`} demo={demo} />
          ) : (
            <div className="lab-stage grid place-items-center text-sm text-foreground/40">
              Đang tải bài tập…
            </div>
          )
        ) : (
          <div className="lab-stage grid place-items-center px-6 text-center">
            <p className="max-w-md text-sm text-foreground/50">
              Bài này không dựng được gì lên màn hình — nó nói về môi trường, cách
              import, hoặc cách học. Đọc note bên blog là đủ.
            </p>
          </div>
        )}

        {lesson.breaks?.length ? (
          <section className="px-6 py-6">
            <Separator className="mb-6" />
            <h2 className="flex items-center gap-2 text-sm font-medium">
              <Hammer size={14} className="text-foreground/40" />
              Thử phá
            </h2>
            <ul className="mt-3 space-y-2">
              {lesson.breaks.map((item) => (
                <li
                  key={item}
                  className="flex gap-2.5 text-sm leading-relaxed text-foreground/60"
                >
                  <span className="mt-2 size-1 shrink-0 rounded-full bg-foreground/25" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </article>
  );
};
