import { cn } from "~/lib/utils";

export type LabProgressProps = {
  done: number;
  total: number;
  className?: string;
};

/** `12 / 46 bài` cộng một thanh mảnh. Đọc như độ phủ của backlog. */
export const LabProgress = ({ done, total, className }: LabProgressProps) => {
  if (!total) return null;
  const pct = Math.round((done / total) * 100);

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="h-1 w-24 overflow-hidden rounded-full bg-foreground/10">
        <div
          className="h-full rounded-full bg-primary transition-[width]"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs tabular-nums text-foreground/50">
        {done}/{total} bài
      </span>
    </div>
  );
};
