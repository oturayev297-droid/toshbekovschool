/**
 * Maktab sozlamalari — yagona joy. Kodga qotirilmaydi: 2-bosqichdan keyin DB'dagi
 * sozlamalardan o'qiladi va Sozlamalar sahifasidan o'zgartiriladi.
 */
export const schoolConfig = {
  dorm: {
    /** Tungi smena vaqti */
    shiftStart: "22:00",
    shiftEnd: "07:00",
    /** "Uxladi/Uxlamadi" bosilgach xabar ketishidan oldingi bekor qilish oynasi */
    undoSeconds: 5,
    /** Yotoqxona guruhlari: qiz va o'g'il bolalar uchun alohida smena va tarbiyachi */
    groups: [
      { key: "qiz", floor: 2 },
      { key: "ogil", floor: 1 },
    ],
  },
} as const;

export type DormGroup = (typeof schoolConfig.dorm.groups)[number]["key"];

/** "22:00–07:00" */
export const shiftHours = () => `${schoolConfig.dorm.shiftStart}–${schoolConfig.dorm.shiftEnd}`;
