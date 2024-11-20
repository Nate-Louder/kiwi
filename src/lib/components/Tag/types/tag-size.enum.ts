import type { EnumOf } from "../../../utilities";

export const TagSizeEnum = {
    small: "small",
    medium: "medium",
    large: "large",
} as const;

export type TagSize = EnumOf<typeof TagSizeEnum>;