import type { EnumOf } from '../../../utilities'

export const ButtonTypeEnum = {
    primary: 'primary',
    secondary: 'secondary',
    tertiary: 'tertiary',
    custom: 'custom',
} as const;

export type ButtonType = EnumOf<typeof ButtonTypeEnum>;
