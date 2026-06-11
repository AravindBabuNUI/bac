export const MONTH_OPTIONS = Array.from({ length: 12 }, (_, i) => ({
  value: String(i + 1).padStart(2, "0"),
  label: String(i + 1).padStart(2, "0"),
}));

export const DAY_OPTIONS = Array.from({ length: 31 }, (_, i) => ({
  value: String(i + 1).padStart(2, "0"),
  label: String(i + 1).padStart(2, "0"),
}));

const currentYear = new Date().getFullYear();

export const YEAR_OPTIONS = Array.from({ length: 100 }, (_, i) => ({
  value: String(currentYear - i),
  label: String(currentYear - i),
}));
