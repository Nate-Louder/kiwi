import type { EnumOf } from "../../../utilities/index";

export const TextColorEnum = {
    primary: "primary",
    secondary: "secondary",
    light: "light",
    white: "white",
} as const;

export type TextColor = EnumOf<typeof TextColorEnum>;