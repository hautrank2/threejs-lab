import Link from "next/link";
import { Button } from "~/components/ui/button";

const NotFound = () => (
  <div className="mx-auto max-w-md px-6 py-24 text-center">
    <h1 className="text-lg font-semibold tracking-tight">Không có bài này</h1>
    <p className="mt-2 text-sm leading-relaxed text-foreground/60">
      Đường dẫn không khớp bài nào trong mục lục — có thể bài đó còn nằm ở backlog
      (mờ trong mục lục), hoặc slug đã đổi bên blog.
    </p>
    <Button variant="outline" className="mt-6" asChild>
      <Link href="/">Về trang đầu</Link>
    </Button>
  </div>
);

export default NotFound;
