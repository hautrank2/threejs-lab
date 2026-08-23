import { ChevronRight, CirclePlay, FileText, Lock } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import { cn } from "~/lib/utils";
import { progressOf, totalProgress, tree } from "~/lessons/registry";
import type { LessonNodeType } from "~/lessons/types";
import { navigate } from "~/hooks/useHashRoute";
import { LabProgress } from "./progress";

const ordinal = (index: number) => String(index + 1).padStart(2, "0");

const ICON = {
  lesson: CirclePlay,
  note: FileText,
  planned: Lock,
} as const;

type LessonRowProps = {
  node: LessonNodeType;
  path: string;
  active: boolean;
};

const LessonRow = ({ node, path, active }: LessonRowProps) => {
  const Icon = ICON[node.kind as keyof typeof ICON] ?? FileText;
  const openable = node.kind !== "planned";

  return (
    <li>
      <button
        type="button"
        disabled={!openable}
        aria-current={active ? "page" : undefined}
        onClick={() => navigate(path)}
        className={cn(
          "flex w-full items-center gap-2 border-l-2 py-1.5 pl-6 pr-2 text-left text-[0.8rem] transition-colors",
          active
            ? "border-primary bg-primary/10 font-medium text-primary"
            : "border-transparent text-foreground/60",
          openable
            ? "hover:border-primary/40 hover:text-foreground"
            : "cursor-not-allowed text-foreground/25",
        )}
      >
        <Icon size={12} className="shrink-0 opacity-70" />
        <span className="min-w-0 flex-1 truncate">{node.title}</span>
      </button>
    </li>
  );
};

export type LessonSidebarProps = {
  /** `chặng/slug` đang mở. */
  current: string;
};

/**
 * Mục lục bám đúng cây `content/blog/threejs`. Khác sidebar bên blog một chỗ:
 * bài `planned` vẫn hiện (mờ, không bấm được) thay vì bị lọc bỏ — ở lab thì
 * biết còn thiếu bài nào chính là việc chính.
 */
export const LessonSidebar = ({ current }: LessonSidebarProps) => {
  const total = totalProgress();
  const currentSection = current.split("/")[0];

  return (
    <nav aria-label="Mục lục bài học" className="p-4">
      <button
        type="button"
        onClick={() => navigate("")}
        className="block text-left text-sm font-semibold tracking-tight transition-colors hover:text-primary"
      >
        Three.js — 45 bài
      </button>

      <LabProgress done={total.done} total={total.total} className="mt-3" />

      <ul className="mt-5 space-y-0.5">
        {tree.map((section, index) => {
          const progress = progressOf(section);
          const onPath = section.slug === currentSection;

          return (
            <li key={section.slug}>
              <Collapsible key={`${section.slug}:${onPath}`} defaultOpen={onPath}>
                <div className="flex items-center gap-1 pr-2">
                  <CollapsibleTrigger
                    aria-label={`Mở hoặc đóng ${section.title}`}
                    className="group grid size-5 shrink-0 place-items-center rounded text-foreground/35 transition-colors hover:bg-foreground/10 hover:text-foreground"
                  >
                    <ChevronRight
                      size={12}
                      className="transition-transform group-data-[state=open]:rotate-90"
                    />
                  </CollapsibleTrigger>

                  <span
                    className={cn(
                      "min-w-0 flex-1 truncate py-1.5 text-[0.8rem]",
                      onPath ? "text-foreground" : "text-foreground/70",
                    )}
                  >
                    <span className="mr-2 font-mono text-[0.65rem] tabular-nums text-foreground/30">
                      {ordinal(index)}
                    </span>
                    {section.title}
                  </span>

                  <span className="shrink-0 font-mono text-[0.65rem] tabular-nums text-foreground/25">
                    {progress.done}/{progress.total}
                  </span>
                </div>

                <CollapsibleContent asChild>
                  <ul>
                    {(section.children ?? []).map((child) => {
                      const path = `${section.slug}/${child.slug}`;
                      return (
                        <LessonRow
                          key={child.slug}
                          node={child}
                          path={path}
                          active={path === current}
                        />
                      );
                    })}
                  </ul>
                </CollapsibleContent>
              </Collapsible>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
