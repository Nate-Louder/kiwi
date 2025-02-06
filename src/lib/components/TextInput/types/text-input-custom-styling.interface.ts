export interface TextInputThemeStyles {
    backgroundColor?: string;
    color?: string;
    border?: string;
    borderRadius?: string;
    padding?: string;
    fontSize?: string;
}

export interface TextInputCustomStyling extends TextInputThemeStyles {
    hover?: TextInputThemeStyles;
    focus?: TextInputThemeStyles;
    active?: TextInputThemeStyles;
    disabled?: TextInputThemeStyles;
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
}
