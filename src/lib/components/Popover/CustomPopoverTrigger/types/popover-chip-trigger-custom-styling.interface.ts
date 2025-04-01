export interface PopoverChipTriggerThemeStyling {
    backgroundColor?: string;
    color?: string;
    border?: string;
    borderRadius?: string;
    padding?: string;
    fontSize?: string;
    width?: string;
    height?: string;
    cursor?: string;
    chevronColor?: string;
    indicator?: {
        height?: string;
        width?: string;
        borderRadius?: string;
        color?: string;
    };

}


export interface PopoverChipTriggerCustomStyling extends PopoverChipTriggerThemeStyling {
    hover?: PopoverChipTriggerThemeStyling;
    focus?: PopoverChipTriggerThemeStyling;
    active?: PopoverChipTriggerThemeStyling;
    disabled?: PopoverChipTriggerThemeStyling;
    label?: {
        color?: string;
        fontSize?: string;
    };
    error?: {
        border?: string;
        color?: string;
        message?: {
            color?: string;
            fontSize?: string;
        };
    };
    container?: {
        gap?: string;
    };
} 