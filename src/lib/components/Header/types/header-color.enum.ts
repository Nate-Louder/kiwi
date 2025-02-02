import { type EnumOf } from '../../../utilities/index.ts'

export const HeaderColorEnum = {
    default: 'default',
    secondary: 'secondary',
} as const;

export type HeaderColor = EnumOf<typeof HeaderColorEnum>;