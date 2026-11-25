import { notFound } from "next/navigation";
import { Construction } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { directorNav } from "@/config/nav";

// Vaqtinchalik: Bosqich 1 ning ikkinchi qismida har bo'lim o'z sahifasini oladi.
const sections = directorNav.filter((n) => n.href !== "/" && n.href !== "/oquvchilar");

export const dynamicParams = false;

export function generateStaticParams() {
  return sections.map((n) => ({ bolim: n.href.slice(1) }));
}

export async function generateMetadata({ params }: { params: Promise<{ bolim: string }> }) {
  const { bolim } = await params;
  return { title: sections.find((n) => n.href === `/${bolim}`)?.label };
}

export default async function SectionPlaceholder({
  params,
}: {
  params: Promise<{ bolim: string }>;
}) {
  const { bolim } = await params;
  const item = sections.find((n) => n.href === `/${bolim}`);
  if (!item) notFound();
  return (
    <>
      <PageHeader title={item.label} />
      <EmptyState
        icon={Construction}
        title="Bu bo'lim maketi keyingi qadamda"
        description="Avval Dashboard, sidebar va o'quvchi profili tasdiqlanadi, keyin qolgan sahifalar shu dizayn tizimida quriladi."
      />
    </>
  );
}
