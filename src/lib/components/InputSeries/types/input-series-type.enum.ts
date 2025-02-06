import type { EnumOf } from "../../../index";

export const InputSeriesTypeEnum = {
    character: "character",
    digit: "digit",
    alphanumeric: "alphanumeric",
} as const;

export type InputSeriesType = EnumOf<typeof InputSeriesTypeEnum>;