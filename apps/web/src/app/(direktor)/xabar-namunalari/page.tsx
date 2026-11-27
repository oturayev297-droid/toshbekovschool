import { Info } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { type ChatItem, ChatPreview } from "@/components/messages/chat-preview";
import { Card } from "@/components/ui/card";
import { testList } from "@/mock/data";
import { currentWeek } from "@/mock/kitchen";

export const metadata = { title: "Xabar namunalari" };

const b = (s: string) => <strong className="font-semibold">{s}</strong>;

const dorm: ChatItem[] = [
  { kind: "date", label: "26-noyabr, payshanba" },
  {
    kind: "bot",
    time: "22:10",
    text: (
      <>
        🌙 {b("Yotoqxona · kechki xabar")}
        {"\n\n"}Aziza Karimova (9-A){"\n"}✅ {b("Uxladi")} — 22:05{"\n\n"}Tarbiyachi: Malika
        Sobirova
      </>
    ),
    buttons: [["Tarbiyachiga yozish"]],
  },
  { kind: "date", label: "27-noyabr, juma" },
  {
    kind: "bot",
    time: "08:02",
    text: (
      <>
        ☀️ {b("Ertalabki xabar")}
        {"\n\n"}Aziza Karimova{"\n"}Turdi: 06:30{"\n"}Darsga tushdi: 08:00{"\n\n"}Yaxshi kun
        tilaymiz!
      </>
    ),
  },
  { kind: "date", label: "Boshqa holat namunasi" },
  {
    kind: "bot",
    time: "22:12",
    text: (
      <>
        🌙 {b("Yotoqxona · kechki xabar")}
        {"\n\n"}Jasur Rahimov (10-B){"\n"}⚠️ {b("Kechasi uxlamadi")}
        {"\n"}Tarbiyachi izohi: tish og&apos;rig&apos;i, tibbiyot xonasiga olib borildi, hozir
        yaxshi.{"\n\n"}Savollaringiz bo&apos;lsa, tarbiyachi bilan bog&apos;laning.
      </>
    ),
    buttons: [["Tarbiyachiga yozish", "Qo'ng'iroq qilish"]],
  },
];

const menu: ChatItem[] = [
  { kind: "date", label: "22-noyabr, yakshanba" },
  {
    kind: "bot",
    time: "20:00",
    text: (
      <>
        🍽 {b(`Haftalik menyu · ${currentWeek.range}`)}
        {"\n\n"}Kechki ovqat:{"\n"}
        {currentWeek.days.map((d) => `${d.short} — ${d.dinner}`).join("\n")}
        {"\n\n"}Nonushta, tushlik va tushki — to&apos;liq menyuda.
      </>
    ),
    buttons: [["To'liq menyuni ko'rish"], ["Allergiya haqida xabar berish"]],
  },
];

const t = testList[0];
const correct = Math.round((t.score / 100) * 25);
const test: ChatItem[] = [
  { kind: "date", label: "23-noyabr, dushanba" },
  {
    kind: "bot",
    time: "15:40",
    text: (
      <>
        📝 {b("Test natijasi")}
        {"\n\n"}Aziza Karimova · {t.subject}
        {"\n"}Mavzu: {t.topic}
        {"\n"}Ball: {b(`${t.score} / 100`)} — A&apos;lo{"\n"}To&apos;g&apos;ri javoblar: {correct} /
        25
        {"\n"}Sinf o&apos;rtachasi: 79{"\n\n"}💬 Aziza so&apos;z boyligi bo&apos;yicha yaxshi natija
        ko&apos;rsatdi. Keyingi qadam — Present Perfect mavzusini mustahkamlash.
      </>
    ),
    buttons: [["Batafsil natija", "AI haftalik tahlil"]],
  },
];

const sections = [
  {
    id: "yotoqxona",
    title: "Yotoqxona",
    desc: "Tarbiyachi belgilashi bilan darhol: kechqurun uxlash, ertalab turish va darsga tushish.",
    items: dorm,
  },
  {
    id: "menyu",
    title: "Haftalik menyu",
    desc: "Har yakshanba 20:00 da yoki oshxonadagi “Ota-onalarga yuborish” tugmasi bilan.",
    items: menu,
  },
  {
    id: "test",
    title: "Test natijasi",
    desc: "Test avtomatik baholangach. Izoh muloyim va konstruktiv tilda.",
    items: test,
  },
];

export default function MessageSamplesPage() {
  return (
    <>
      <PageHeader title="Xabar namunalari" description="Ota-ona Telegram botda nimani ko'radi" />
      <Card className="mb-6 flex items-start gap-3 p-4 text-sm">
        <Info className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
        <p className="text-muted-foreground">
          Faqat dizayn uchun maket. Haqiqiy xabarlar Telegram bot orqali yuboriladi: yotoqxona —
          6-bosqich, menyu — 7-bosqich, test natijasi — 8-bosqich. Matn va tugmalarni shu yerda
          kelishib olamiz.
        </p>
      </Card>
      <div className="grid gap-10 lg:grid-cols-3 lg:gap-6">
        {sections.map((s) => (
          <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="scroll-mt-20">
            <h2 id={`${s.id}-h`} className="text-base font-semibold">
              {s.title}
            </h2>
            <p className="mt-1 mb-4 min-h-10 text-sm text-muted-foreground">{s.desc}</p>
            <ChatPreview items={s.items} label={`${s.title} xabari namunasi`} />
          </section>
        ))}
      </div>
    </>
  );
}
