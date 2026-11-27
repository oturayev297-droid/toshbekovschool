import { schoolConfig } from "@/config/school";
import { t } from "@/i18n";
import type { AlertLevel, DormStatus, PaymentStatus } from "@/mock/data";
import type { DeliveryStatus } from "@/mock/dorm";

// Holat belgilari: matn — i18n lug'atidan, rang — shu yerda.

export const paymentBadge: Record<
  PaymentStatus,
  { label: string; variant: "success" | "warning" | "danger" }
> = {
  tolangan: { label: t.status.payment.tolangan, variant: "success" },
  qisman: { label: t.status.payment.qisman, variant: "warning" },
  qarz: { label: t.status.payment.qarz, variant: "danger" },
};

export const dormBadge: Record<
  DormStatus,
  { label: string; variant: "info" | "danger" | "default" }
> = {
  uxladi: { label: t.status.dorm.uxladi, variant: "info" },
  uxlamadi: { label: t.status.dorm.uxlamadi, variant: "danger" },
  belgilanmagan: { label: t.status.dorm.belgilanmagan, variant: "default" },
};

/** Ogohlantirish / muammo darajasi */
export const alertBadge: Record<
  AlertLevel,
  { label: string; variant: "danger" | "warning" | "info" }
> = {
  yuqori: { label: t.status.alert.yuqori, variant: "danger" },
  orta: { label: t.status.alert.orta, variant: "warning" },
  past: { label: t.status.alert.past, variant: "info" },
};

/** Telegram xabari yetkazilish holati */
export const deliveryBadge: Record<
  DeliveryStatus,
  { label: string; variant: "info" | "success" | "warning" | "danger" | "default" }
> = {
  kutilmoqda: {
    label: t.status.delivery.kutilmoqda(schoolConfig.dorm.undoSeconds),
    variant: "info",
  },
  yetkazildi: { label: t.status.delivery.yetkazildi, variant: "success" },
  navbatda: { label: t.status.delivery.navbatda, variant: "warning" },
  xato: { label: t.status.delivery.xato, variant: "danger" },
  bekor: { label: t.status.delivery.bekor, variant: "default" },
};
