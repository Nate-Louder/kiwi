export interface PopoverContentThemeStyling {
    backgroundColor?: string;
    color?: string;
    border?: string;
    borderRadius?: string;
    padding?: string;
    fontSize?: string;
    width?: string;
    height?: string;
    cursor?: string;
    itemBackgroundColor?: string;
    itemColor?: string;
    itemBorderRadius?: string;
    indicator?: {
        height?: string;
        width?: string;
        borderRadius?: string;
        color?: string;
    };

}


export interface PopoverContentCustomStyling extends PopoverContentThemeStyling {
    hover?: PopoverContentThemeStyling;
    focus?: PopoverContentThemeStyling;
    active?: PopoverContentThemeStyling;
    disabled?: PopoverContentThemeStyling;
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