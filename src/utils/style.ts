import { cx } from "classix";
import { extendTailwindMerge } from "tailwind-merge";

export type Argument = string | boolean | null | undefined;

const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      colors: [
        "primary",
        "secondary",
        "accent",
        "neutral",
        "base-100",
        "info",
        "success",
        "warning",
        "error",
      ],
    },
  },
});

export const tw = (...args: Argument[]) => twMerge(cx(...args));
