import { type EnumOf } from '../../../utilities'

export const PopoverPositionEnum = {
    top: 'top',
    right: 'right',
    bottom: 'bottom',
    left: 'left',
} as const;

export type PopoverPosition = EnumOf<typeof PopoverPositionEnum>;