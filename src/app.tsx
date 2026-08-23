import { ArrowLeft, ArrowRight, Boxes, ChevronRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import { ScrollArea } from "~/components/ui/scroll-area";
import { LessonSidebar } from "~/components/lesson/sidebar";
import { LessonStage } from "~/components/lesson/stage";
import { navigate, useHashRoute } from "~/hooks/useHashRoute";
import { findLesson, runnableOrder, totalProgress } from "~/lessons/registry";

const Home = () => {
  const progress = totalProgress();
  const first = runnableOrder()[0];

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-2xl font-semibold tracking-tight">Three.js lab</h1>
      <p className="mt-3 text-sm leading-relaxed text-foreground/60">
        Mỗi bài trong{" "}
        <span className="text-foreground/80">content/blog/threejs</span> kết thúc
        bằng một bài tập chạy được. Chỗ này là nơi chúng chạy thật: chọn bài ở cột
        trái, vặn thanh trượt bên phải, rồi làm theo mục{" "}
        <span className="text-foreground/80">Thử phá</span> ở dưới.
      </p>

      <ul className="mt-6 space-y-2 text-sm text-foreground/60">
        <li>
          • <span className="text-foreground/80">{progress.done}</span> bài đã dựng
          lab trên tổng số {progress.total} bài của giáo trình.
        </li>
        <li>• Bài mờ trong mục lục là bài chưa viết note và chưa dựng lab.</li>
        <li>
          • Đổi bài là huỷ trọn gói scene cũ — nhìn{" "}
          <span className="text-foreground/80">renderer.info.memory</span> để tự
          kiểm tra chuyện đó.
        </li>
      </ul>

      {first && (
        <Button className="mt-8" onClick={() => navigate(first.path)}>
          Bắt đầu — {first.node.title}
          <ArrowRight />
        </Button>
      )}
    </div>
  );
};

export const App = () => {
  const route = useHashRoute();
  const found = findLesson(route);

  const progress = totalProgress();
  const order = runnableOrder();
  const at = order.findIndex((item) => item.path === route);
  const prev = at > 0 ? order[at - 1] : undefined;
  const next = at >= 0 && at < order.length - 1 ? order[at + 1] : undefined;

  return (
    <div className="flex h-dvh flex-col bg-background text-foreground">
      <header className="flex h-12 shrink-0 items-center gap-2 border-b border-border/60 px-4">
        <Boxes size={16} className="text-primary" />
        <button
          type="button"
          onClick={() => navigate("")}
          className="text-sm font-semibold tracking-tight"
        >
          threejs-lab
        </button>
        <span className="ml-auto flex items-center gap-1">
          <Button
            size="sm"
            variant="ghost"
            disabled={!prev}
            onClick={() => prev && navigate(prev.path)}
          >
            <ArrowLeft />
            Trước
          </Button>
          <Button
            size="sm"
            variant="ghost"
            disabled={!next}
            onClick={() => next && navigate(next.path)}
          >
            Sau
            <ArrowRight />
          </Button>
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

          {found ? (
            <LessonStage key={`stage:${route}`} lesson={found.lesson} path={route} />
          ) : (
            <Home />
          )}
        </main>
      </div>
    </div>
  );
};
