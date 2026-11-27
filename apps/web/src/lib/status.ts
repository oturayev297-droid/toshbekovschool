import type { AlertLevel, DormStatus, PaymentStatus } from "@/mock/data";
import type { DeliveryStatus } from "@/mock/dorm";

export const paymentBadge: Record<
  PaymentStatus,
  { label: string; variant: "success" | "warning" | "danger" }
> = {
  tolangan: { label: "To'langan", variant: "success" },
  qisman: { label: "Qisman", variant: "warning" },
  qarz: { label: "Qarzdor", variant: "danger" },
};

export const dormBadge: Record<
  DormStatus,
  { label: string; variant: "info" | "danger" | "default" }
> = {
  uxladi: { label: "Uxladi", variant: "info" },
  uxlamadi: { label: "Uxlamadi", variant: "danger" },
  belgilanmagan: { label: "Belgilanmagan", variant: "default" },
};

/** Ogohlantirish / muammo darajasi */
export const alertBadge: Record<
  AlertLevel,
  { label: string; variant: "danger" | "warning" | "info" }
> = {
  yuqori: { label: "Muhim", variant: "danger" },
  orta: { label: "E'tibor", variant: "warning" },
  past: { label: "Ma'lumot", variant: "info" },
};

/** Telegram xabari yetkazilish holati */
export const deliveryBadge: Record<
  DeliveryStatus,
  { label: string; variant: "success" | "warning" | "danger" }
> = {
  yetkazildi: { label: "Yetkazildi", variant: "success" },
  navbatda: { label: "Qayta urinilmoqda", variant: "warning" },
  xato: { label: "Yetkazilmadi", variant: "danger" },
};
