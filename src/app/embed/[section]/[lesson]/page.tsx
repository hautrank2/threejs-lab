import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LessonEmbed } from "~/components/lesson/embed";
import { findLesson } from "~/lessons/registry";

type EmbedParams = { section: string; lesson: string };

type EmbedPageProps = {
  params: Promise<EmbedParams>;
  searchParams: Promise<{ demo?: string | string[] }>;
};

export const generateMetadata = async ({
  params,
}: EmbedPageProps): Promise<Metadata> => {
  const { section, lesson } = await params;
  const found = findLesson(`${section}/${lesson}`);
  return found ? { title: found.lesson.title } : {};
};

/**
 * `/embed/ba-thanh-phan/scene?demo=fog` — bản chỉ có canvas của một bài, để
 * note bên blog nhúng bằng iframe. AppShell bỏ khung cho mọi đường dẫn `/embed`.
 */
const EmbedPage = async ({ params, searchParams }: EmbedPageProps) => {
  const { section, lesson } = await params;
  const { demo } = await searchParams;
  const path = `${section}/${lesson}`;
  const found = findLesson(path);

  if (!found?.lesson.load) notFound();

  return (
    <LessonEmbed
      key={path}
      path={path}
      demoId={typeof demo === "string" ? demo : undefined}
    />
  );
};

export default EmbedPage;
