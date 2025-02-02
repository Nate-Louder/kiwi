import type { EnumOf } from "../../../utilities/index.ts";

export const TagSizeEnum = {
    small: "small",
    medium: "medium",
    large: "large",
} as const;

export type TagSize = EnumOf<typeof TagSizeEnum>;