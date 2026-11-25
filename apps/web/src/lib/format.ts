/** 1250000 -> "1 250 000 so'm" */
export function formatSom(amount: number): string {
  return `${Math.round(amount)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")} so'm`;
}

/** 1250000 -> "1,25 mln" */
export function formatMln(amount: number): string {
  return `${(amount / 1_000_000).toFixed(amount >= 100_000_000 ? 0 : 1).replace(".", ",")} mln`;
}

export function initials(fullName: string): string {
  return fullName
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}
