import { type EnumOf } from '../../../utilities/index.ts'

export const PopoverPositionEnum = {
    top: 'top',
    right: 'right',
    bottom: 'bottom',
    left: 'left',
} as const;

export type PopoverPosition = EnumOf<typeof PopoverPositionEnum>;