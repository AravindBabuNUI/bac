import type { SelectOption } from "@/ui/atoms/select/Select";

const currentYear = new Date().getFullYear();

type DateOptionsConfig =
  | { type: "sequential"; count: number; start?: number; pad?: number }
  | { type: "descending"; count: number; from: number };

export const createDateOptions = (config: DateOptionsConfig): SelectOption[] =>
  Array.from({ length: config.count }, (_, i) => {
    const num =
      config.type === "descending"
        ? config.from - i
        : (config.start ?? 1) + i;
    const str =
      config.type === "sequential" && config.pad
        ? String(num).padStart(config.pad, "0")
        : String(num);
    return { value: str, label: str };
  });

export const MONTH_OPTIONS = createDateOptions({ type: "sequential", count: 12, pad: 2 });
export const DAY_OPTIONS = createDateOptions({ type: "sequential", count: 31, pad: 2 });
export const YEAR_OPTIONS =
  createDateOptions({ type: "descending", count: 100, from: currentYear });
