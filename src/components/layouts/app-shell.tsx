"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, ArrowRight, Boxes, ChevronRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import { ScrollArea } from "~/components/ui/scroll-area";
import { LessonSidebar } from "~/components/lesson/sidebar";
import { runnableOrder, totalProgress } from "~/lessons/registry";

type StepButtonProps = {
  step?: { path: string };
  children: ReactNode;
};

/** Trước / Sau: có bài thì là link thật, hết bài thì là nút xám. */
const StepButton = ({ step, children }: StepButtonProps) =>
  step ? (
    <Button size="sm" variant="ghost" asChild>
      <Link href={`/${step.path}`}>{children}</Link>
    </Button>
  ) : (
    <Button size="sm" variant="ghost" disabled>
      {children}
    </Button>
  );

/**
 * Khung chung của mọi trang: thanh trên, mục lục bên trái, nội dung ở giữa.
 * Nằm trong `layout.tsx` nên đổi bài không dựng lại sidebar — chỉ phần
 * `children` bị thay, đúng cái ta cần: một `LessonStage` mới, một lab mới.
 */
export const AppShell = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  // `/anh-sang/lights` -> `anh-sang/lights`, khớp với khoá của registry.
  const route = pathname.replace(/^\//, "");

  const progress = totalProgress();
  const order = runnableOrder();
  const at = order.findIndex((item) => item.path === route);
  const prev = at > 0 ? order[at - 1] : undefined;
  const next = at >= 0 && at < order.length - 1 ? order[at + 1] : undefined;

  return (
    <div className="flex h-dvh flex-col bg-background text-foreground">
      <header className="flex h-12 shrink-0 items-center gap-2 border-b border-border/60 px-4">
        <Boxes size={16} className="text-primary" />
        <Link href="/" className="text-sm font-semibold tracking-tight">
          threejs-lab
        </Link>
        <span className="ml-auto flex items-center gap-1">
          <StepButton step={prev}>
            <ArrowLeft />
            Trước
          </StepButton>
          <StepButton step={next}>
            Sau
            <ArrowRight />
          </StepButton>
        </span>
      </header>

      <div className="flex min-h-0 flex-1">
        {/* Viewport của Radix bọc con trong một div display:table -> nó nở
            theo nội dung và phá `truncate`. Ép về block ngay tại chỗ dùng,
            không sửa file registry. */}
        <ScrollArea className="hidden w-72 shrink-0 border-r border-border/60 md:block [&>[data-slot=scroll-area-viewport]>div]:!block">
          <LessonSidebar current={route} />
        </ScrollArea>

        <main className="flex min-w-0 flex-1 flex-col overflow-y-auto md:overflow-visible">
          {/* Dưới md không còn rail -> thay bằng một mục lục gập lại.
              `key={route}` để nó tự đóng sau mỗi lần chọn bài. */}
          <Collapsible
            key={`nav:${route}`}
            className="shrink-0 border-b border-border/60 md:hidden"
          >
            <CollapsibleTrigger className="group flex w-full items-center gap-2 px-4 py-3 text-sm font-medium">
              <ChevronRight
                size={14}
                className="text-foreground/40 transition-transform group-data-[state=open]:rotate-90"
              />
              Mục lục
              <span className="ml-auto font-mono text-xs tabular-nums text-foreground/40">
                {progress.done}/{progress.total}
              </span>
            </CollapsibleTrigger>
            <CollapsibleContent className="max-h-[60vh] overflow-y-auto">
              <LessonSidebar current={route} />
            </CollapsibleContent>
          </Collapsible>

          {children}
        </main>
      </div>
    </div>
  );
};
