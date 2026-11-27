import { Info } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { type ChatItem, ChatPreview } from "@/components/messages/chat-preview";
import { Card } from "@/components/ui/card";
import { testList } from "@/mock/data";
import { dormStudents } from "@/mock/dorm";
import { currentWeek } from "@/mock/kitchen";

export const metadata = { title: "Xabar namunalari" };

const b = (s: string) => <strong className="font-semibold">{s}</strong>;
/** Xabar ichida yangi qator (ChatPreview whitespace-pre-line bilan ko'rsatadi) */
const NL = "\n";
const NL2 = "\n\n";

// Vaqtlar bugungi smena ro'yxatidan olinadi (yotoqxona sahifasi bilan bir xil)
const aziza = dormStudents.find((d) => d.id === "s-001")!;
const jasur = dormStudents.find((d) => d.id === "s-002")!;

const dorm: ChatItem[] = [
  { kind: "date", label: "26-noyabr, payshanba" },
  {
    kind: "bot",
    time: aziza.notifiedAt!,
    text: (
      <>
        🌙 {b("Yotoqxona · tungi xabar")}
        {NL2}Aziza Karimova (9-A)
        {NL}✅ {b("Uxladi")} — {aziza.sleep}
        {NL2}Tarbiyachi: Malika Sobirova
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
        {NL2}Aziza Karimova
        {NL}Turdi: {aziza.wake}
        {NL}Darsga tushdi: {aziza.lesson}
        {NL2}Yaxshi kun tilaymiz!
      </>
    ),
  },
  { kind: "date", label: "Boshqa holat namunasi · 27-noyabr" },
  {
    kind: "bot",
    time: jasur.notifiedAt!,
    text: (
      <>
        🌙 {b("Yotoqxona · tungi xabar")}
        {NL2}Jasur Rahimov (10-B)
        {NL}
        {b("Kechasi yaxshi uxlay olmadi.")}
        {NL}Tarbiyachi holatdan xabardor va yonida. Ertalab qo&apos;shimcha ma&apos;lumot beramiz.
        {NL2}Savollaringiz bo&apos;lsa, tarbiyachi bilan bog&apos;laning.
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
        {NL2}Kechki ovqat:{NL}
        {currentWeek.days.map((d) => `${d.short} — ${d.dinner}`).join(NL)}
        {NL2}Nonushta, tushlik va tushki — to&apos;liq menyuda.
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
        {NL2}Aziza Karimova · {t.subject}
        {NL}Mavzu: {t.topic}
        {NL}Ball: {b(`${t.score} / 100`)} — A&apos;lo
        {NL}To&apos;g&apos;ri javoblar: {correct} / 25
        {NL}Sinf o&apos;rtachasi: 79
        {NL2}💬 Aziza so&apos;z boyligi bo&apos;yicha yaxshi natija ko&apos;rsatdi. Keyingi qadam —
        Present Perfect mavzusini mustahkamlash.
      </>
    ),
    buttons: [["Batafsil natija", "AI haftalik tahlil"]],
  },
];

const sections = [
  {
    id: "yotoqxona",
    title: "Yotoqxona",
    desc: "Tarbiyachi belgilashi bilan darhol. Salomatlik tafsilotlari (sabab, tibbiyot, psixolog) yuborilmaydi — faqat neytral qisqa matn.",
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
