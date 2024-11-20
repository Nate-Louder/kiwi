import type { EnumOf } from "../../../utilities";

export const InputSeriesTypeEnum ={
    character: "character",
    digit: "digit",
    alphanumeric: "alphanumeric",
} as const;

export type InputSeriesType = EnumOf<typeof InputSeriesTypeEnum>;