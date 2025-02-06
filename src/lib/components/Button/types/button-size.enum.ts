import type { EnumOf } from "../../../utilities/index";

export const ButtonSizeEnum = {
    small: 'small',
    medium: 'medium',
    large: 'large',
} as const;

export type ButtonSize = EnumOf<typeof ButtonSizeEnum>;