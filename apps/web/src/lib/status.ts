import type { DormStatus, PaymentStatus } from "@/mock/data";

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
