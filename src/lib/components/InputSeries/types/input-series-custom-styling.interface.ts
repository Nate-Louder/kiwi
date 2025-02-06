export interface InputSeriesThemeStyles {
    backgroundColor?: string;
    color?: string;
    border?: string;
    borderRadius?: string;
    padding?: string;
    fontSize?: string;
    width?: string;
    height?: string;
    cursor?: string;
    indicator?: {
        height?: string;
        width?: string;
        borderRadius?: string;
        color?: string;
    };

}


export interface InputSeriesCustomStyling extends InputSeriesThemeStyles {
    hover?: InputSeriesThemeStyles;
    focus?: InputSeriesThemeStyles;
    active?: InputSeriesThemeStyles;
    disabled?: InputSeriesThemeStyles;
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