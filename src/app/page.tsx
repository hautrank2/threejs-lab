import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import { runnableOrder, totalProgress } from "~/lessons/registry";

const HomePage = () => {
  const progress = totalProgress();
  const first = runnableOrder()[0];

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-2xl font-semibold tracking-tight">Three.js lab</h1>
      <p className="mt-3 text-sm leading-relaxed text-foreground/60">
        Mỗi bài trong{" "}
        <span className="text-foreground/80">content/blog/threejs</span> kết thúc
        bằng một bài tập chạy được. Chỗ này là nơi bạn tự viết lại nó: chọn bài ở
        cột trái, mở file tương ứng trong{" "}
        <span className="text-foreground/80">src/lessons</span>, viết vào trong{" "}
        <span className="text-foreground/80">setup()</span>, rồi làm theo mục{" "}
        <span className="text-foreground/80">Thử phá</span> ở dưới.
      </p>

      <ul className="mt-6 space-y-2 text-sm text-foreground/60">
        <li>
          • <span className="text-foreground/80">{progress.done}</span> bài đã có
          sườn để làm trên tổng số {progress.total} bài của giáo trình.
        </li>
        <li>• Bài mờ trong mục lục là bài chưa viết note và chưa dựng sườn.</li>
        <li>
          • Sườn chỉ có <span className="text-foreground/80">id</span>,{" "}
          <span className="text-foreground/80">title</span> và một{" "}
          <span className="text-foreground/80">setup()</span> rỗng. Lời giải nằm ở{" "}
          <span className="text-foreground/80">src/solutions</span> — mở sau khi đã
          thử.
        </li>
        <li>
          • Đổi bài là huỷ trọn gói scene cũ — nhìn{" "}
          <span className="text-foreground/80">renderer.info.memory</span> để tự
          kiểm tra chuyện đó.
        </li>
      </ul>

      {first && (
        <Button className="mt-8" asChild>
          <Link href={`/${first.path}`}>
            Bắt đầu — {first.node.title}
            <ArrowRight />
          </Link>
        </Button>
      )}
    </div>
  );
};

export default HomePage;
