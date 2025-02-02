import type { EnumOf } from "../../../utilities/index.ts";

export const TextSizeEnum = {
    small: "small",
    medium: "medium",
    large: "large",
    xl: "xlarge",
} as const;

export type TextSize = EnumOf<typeof TextSizeEnum>;