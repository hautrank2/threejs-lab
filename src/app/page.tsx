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
