"use client";

import { type ReactNode, useState } from "react";
import { Bot, Eye, Check, KeyRound, Link2, Minus, Plus, ShieldCheck, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { formatSom } from "@/lib/format";
import { schoolConfig } from "@/config/school";
import { t } from "@/i18n";
import { cn } from "@/lib/utils";
import { dormStudents } from "@/mock/dorm";
import {
  type Access,
  permissions,
  primaryPackage,
  roles,
  subjectSettings,
  telegramSettings,
  users,
} from "@/mock/settings";

/** Yo'nalishlar va narxlar */
export function SubjectsPanel() {
  const [rows, setRows] = useState(subjectSettings);
  const set = (subject: string, patch: Partial<(typeof rows)[number]>) =>
    setRows((rs) => rs.map((r) => (r.subject === subject ? { ...r, ...patch } : r)));

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader
          title="Yo'nalishlar (fanlar) va oylik narxlar"
          description="Har o'quvchi aniq 2 ta fan tanlaydi; oylik to'lov = 2 fan narxi yig'indisi (masalan English + IT = 1 800 000 so'm)"
          action={
            <Button size="sm">
              <Plus /> Yo&apos;nalish qo&apos;shish
            </Button>
          }
        />
        <CardContent className="px-0 pb-2">
          <ul className="divide-y">
            {rows.map((r) => (
              <li
                key={r.subject}
                className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-2 px-5 py-3 md:grid-cols-[minmax(0,1fr)_12rem_auto]"
              >
                <div className="min-w-0">
                  <p className={cn("font-semibold", !r.active && "text-muted-foreground")}>
                    {r.subject}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {r.teachers} o&apos;qituvchi · {r.students} o&apos;quvchi · mentor{" "}
                    {r.active ? "faol" : "o'chiq"}
                  </p>
                </div>
                <Switch
                  label={`${r.subject} yo'nalishi faol`}
                  checked={r.active}
                  onCheckedChange={(v) => set(r.subject, { active: v })}
                  className="md:order-last"
                />
                <div className="col-span-2 flex items-center gap-2 md:col-span-1">
                  <Input
                    aria-label={`${r.subject} oylik narxi`}
                    inputMode="numeric"
                    value={formatSom(r.price).replace(" so'm", "")}
                    onChange={(e) =>
                      set(r.subject, { price: Number(e.target.value.replace(/\D/g, "")) || 0 })
                    }
                    className="h-9 text-right tabular-nums"
                  />
                  <span className="text-xs text-muted-foreground">so&apos;m</span>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="font-semibold">Boshlang&apos;ich: {primaryPackage.name}</p>
            <p className="text-sm text-muted-foreground">{primaryPackage.subjects.join(" · ")}</p>
          </div>
          <p className="text-lg font-bold tabular-nums">{formatSom(primaryPackage.price)}</p>
        </div>
      </Card>
    </div>
  );
}

/** Telegram ulanishi */
export function TelegramPanel() {
  const t = telegramSettings;
  const [on, setOn] = useState(Object.fromEntries(t.notifications.map((n) => [n.key, n.on])));

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <Card>
        <CardHeader title="Avtomatik xabarlar" description="Qachon va kimga yuboriladi" />
        <CardContent className="px-0 pb-2">
          <ul className="divide-y">
            {t.notifications.map((n) => (
              <li key={n.key} className="flex items-center justify-between gap-4 px-5 py-3">
                <div className="min-w-0">
                  <p className="text-sm font-semibold">{n.label}</p>
                  <p className="text-xs text-muted-foreground">{n.when}</p>
                </div>
                <Switch
                  label={n.label}
                  checked={on[n.key]}
                  onCheckedChange={(v) => setOn((o) => ({ ...o, [n.key]: v }))}
                />
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Card className="p-4 sm:p-5">
          <p className="flex items-center gap-2 font-semibold">
            <Bot className="size-4 text-accent" aria-hidden /> Telegram bot
          </p>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between gap-3">
              <dt className="text-muted-foreground">Holat</dt>
              <dd>
                <Badge variant="success">
                  <Check className="size-3" aria-hidden /> Ulangan
                </Badge>
              </dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-muted-foreground">Webhook</dt>
              <dd className="text-right">{t.webhook}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-muted-foreground">Bot token</dt>
              <dd className="flex items-center gap-1 text-right">
                <KeyRound className="size-3.5" aria-hidden /> faqat server env&apos;da
              </dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-muted-foreground">Direktor chati</dt>
              <dd>{t.directorLinked ? "Bog'langan" : "Bog'lanmagan"}</dd>
            </div>
          </dl>
        </Card>
        <Card className="p-4 sm:p-5">
          <p className="flex items-center gap-2 font-semibold">
            <Users className="size-4 text-accent" aria-hidden /> Ota-onalar ulanishi
          </p>
          <p className="mt-2 text-2xl font-bold tabular-nums">
            {t.parentsLinked}/{t.parentsTotal}
          </p>
          <div className="mt-2 h-2 rounded-full bg-muted">
            <div
              className="h-2 rounded-full bg-primary"
              style={{ width: `${(t.parentsLinked / t.parentsTotal) * 100}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Ulanmaganlarga bir martalik kod beriladi: ota-ona botga kodni yuboradi va farzandiga
            bog&apos;lanadi.
          </p>
          <Button variant="outline" size="sm" className="mt-3 w-full">
            <Link2 /> Bir martalik kod yaratish
          </Button>
        </Card>
      </div>
    </div>
  );
}

const accessCell: Record<Access, { label: string; icon: ReactNode; cls: string }> = {
  full: { label: "To'liq", icon: <Check className="size-4" aria-hidden />, cls: "text-success" },
  own: {
    label: "O'ziniki",
    icon: <ShieldCheck className="size-4" aria-hidden />,
    cls: "text-primary",
  },
  view: {
    label: "Faqat ko'rish",
    icon: <Eye className="size-4" aria-hidden />,
    cls: "text-accent",
  },
  none: {
    label: "Yo'q",
    icon: <Minus className="size-4" aria-hidden />,
    cls: "text-muted-foreground/60",
  },
};

const roleBadge: Record<string, "brand" | "accent" | "info" | "default" | "warning" | "success"> = {
  direktor: "brand",
  zavuch: "brand",
  admin: "accent",
  oqituvchi: "info",
  tarbiyachi: "warning",
  psixolog: "accent",
  oshpaz: "default",
  otaona: "success",
  oquvchi: "info",
};

/** Foydalanuvchilar va rollar */
export function UsersPanel() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader
          title="Foydalanuvchilar"
          description={`${users.length} ta hisob · auth 12-bosqichda`}
          action={
            <Button size="sm">
              <Plus /> Foydalanuvchi
            </Button>
          }
        />
        <CardContent className="px-0 pb-2">
          <ul className="divide-y">
            {users.map((u) => (
              <li key={u.id} className="flex items-center justify-between gap-3 px-5 py-3">
                <div className="min-w-0">
                  <p
                    className={cn(
                      "truncate text-sm font-semibold",
                      !u.active && "text-muted-foreground",
                    )}
                  >
                    {u.fullName}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {u.login} · {u.lastSeen}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  {!u.active && <Badge>O&apos;chirilgan</Badge>}
                  <Badge variant={roleBadge[u.role]}>
                    {roles.find((r) => r.key === u.role)?.label}
                  </Badge>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader
          title="Rollar va ruxsatlar"
          description="Har so'rovda rol bo'yicha tekshiriladi (RBAC). «O'ziniki» — faqat o'ziga yoki o'z farzandi/guruhiga tegishli."
        />
        <CardContent className="px-0 pb-2">
          {/* Mobil: rol bo'yicha kartalar */}
          <ul className="divide-y md:hidden">
            {roles.map((r) => (
              <li key={r.key} className="px-5 py-3">
                <p className="text-sm font-semibold">{r.label}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {permissions
                    .filter((p) => p.access[r.key] !== "none")
                    .map((p) => (
                      <Badge
                        key={p.section}
                        variant={p.access[r.key] === "full" ? "success" : "info"}
                      >
                        {p.section}
                        {p.access[r.key] === "own" && " (o'ziniki)"}
                      </Badge>
                    ))}
                </div>
              </li>
            ))}
          </ul>
          {/* Planshet/desktop: matritsa */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-xs text-muted-foreground">
                  <th scope="col" className="px-5 py-3 font-semibold">
                    Bo&apos;lim
                  </th>
                  {roles.map((r) => (
                    <th key={r.key} scope="col" className="px-2 py-3 text-center font-semibold">
                      {r.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {permissions.map((p) => (
                  <tr key={p.section} className="border-b last:border-0">
                    <th scope="row" className="px-5 py-2.5 text-left font-medium">
                      {p.section}
                    </th>
                    {roles.map((r) => {
                      const a = accessCell[p.access[r.key]];
                      return (
                        <td key={r.key} className={cn("px-2 py-2.5", a.cls)}>
                          <span className="flex justify-center" title={a.label}>
                            {a.icon}
                            <span className="sr-only">{a.label}</span>
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="flex flex-wrap gap-4 px-5 pt-3 pb-2 text-xs text-muted-foreground">
              {Object.values(accessCell).map((a) => (
                <span key={a.label} className={cn("flex items-center gap-1.5", a.cls)}>
                  {a.icon}
                  <span className="text-muted-foreground">{a.label}</span>
                </span>
              ))}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/** Yotoqxona: smena vaqti, bekor qilish oynasi, guruhlar va xonalar (kodga qotirilmaydi) */
export function DormPanel() {
  const [start, setStart] = useState<string>(schoolConfig.dorm.shiftStart);
  const [end, setEnd] = useState<string>(schoolConfig.dorm.shiftEnd);
  const [rooms, setRooms] = useState(() =>
    Object.fromEntries(
      schoolConfig.dorm.groups.map(({ key }) => [
        key,
        [...new Set(dormStudents.filter((d) => d.group === key).map((d) => d.room))].sort(),
      ]),
    ),
  );
  const addRoom = (key: string, floor: number) =>
    setRooms((r) => {
      const list = r[key];
      const last = list.length ? Number(list[list.length - 1]) : floor * 100;
      return { ...r, [key]: [...list, String(last + 1)] };
    });

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-4 sm:p-5">
          <p className="font-semibold">{t.settings.shiftTitle}</p>
          <p className="text-sm text-muted-foreground">{t.settings.shiftHint}</p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <label className="text-xs font-semibold text-muted-foreground">
              {t.settings.shiftStart}
              <Input
                type="time"
                value={start}
                onChange={(e) => setStart(e.target.value)}
                className="mt-1 tabular-nums"
              />
            </label>
            <label className="text-xs font-semibold text-muted-foreground">
              {t.settings.shiftEnd}
              <Input
                type="time"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
                className="mt-1 tabular-nums"
              />
            </label>
          </div>
        </Card>
        <Card className="p-4 sm:p-5">
          <p className="font-semibold">{t.settings.undoTitle}</p>
          <p className="text-sm text-muted-foreground">
            {t.settings.undoHint(schoolConfig.dorm.undoSeconds)}
          </p>
          <p className="mt-4 text-2xl font-bold tabular-nums">
            {t.common.seconds(schoolConfig.dorm.undoSeconds)}
          </p>
        </Card>
      </div>

      <Card>
        <CardHeader title={t.settings.groupsTitle} description={t.settings.groupsHint} />
        <CardContent className="px-0 pb-2">
          <ul className="divide-y">
            {schoolConfig.dorm.groups.map(({ key, floor }) => (
              <li key={key} className="px-5 py-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold">
                    {t.dorm.groups[key]}{" "}
                    <span className="text-xs font-normal text-muted-foreground">
                      · {t.dorm.floor(floor)} · {t.settings.rooms(rooms[key].length)}
                    </span>
                  </p>
                  <Button variant="outline" size="sm" onClick={() => addRoom(key, floor)}>
                    <Plus /> {t.settings.addRoom}
                  </Button>
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {rooms[key].map((r) => (
                    <Badge key={r} variant="info">
                      {t.dorm.room(r)}
                    </Badge>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <p className="text-xs text-muted-foreground">{t.settings.note}</p>
    </div>
  );
}
