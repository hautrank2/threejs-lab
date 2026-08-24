import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LessonStage } from "~/components/lesson/stage";
import { findLesson, tree } from "~/lessons/registry";

type LessonParams = { section: string; lesson: string };

type LessonPageProps = { params: Promise<LessonParams> };

/**
 * Route thật thay cho hash cũ: `#/anh-sang/lights` -> `/anh-sang/lights`.
 * Mọi node mở được đều dựng sẵn lúc build; bài `planned` thì không, nên gõ tay
 * vào URL của nó sẽ ra 404 thay vì một trang trắng.
 */
export const generateStaticParams = (): LessonParams[] =>
  tree.flatMap((section) =>
    (section.children ?? [])
      .filter((child) => child.kind !== "planned")
      .map((child) => ({ section: section.slug, lesson: child.slug })),
  );

export const generateMetadata = async ({
  params,
}: LessonPageProps): Promise<Metadata> => {
  const { section, lesson } = await params;
  const found = findLesson(`${section}/${lesson}`);
  if (!found) return {};

  return { title: found.lesson.title, description: found.lesson.description };
};

const LessonPage = async ({ params }: LessonPageProps) => {
  const { section, lesson } = await params;
  const path = `${section}/${lesson}`;
  const found = findLesson(path);

  if (!found || found.lesson.kind === "planned") notFound();

  // `key` để đổi bài là dựng lại component từ đầu — state demo về 0 và
  // hàm dọn của effect chạy, tức `lab.dispose()` chạy.
  return <LessonStage key={path} path={path} />;
};

export default LessonPage;
