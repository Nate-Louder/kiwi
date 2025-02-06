export interface TabsThemeStyles {
    backgroundColor?: string;
    color?: string;
    border?: string;
    borderRadius?: string;
    padding?: string;
    fontSize?: string;
    fontWeight?: string;
    width?: string;
    height?: string;
}

export interface TabsCustomStyling extends TabsThemeStyles {
    hover?: TabsThemeStyles;
    focus?: TabsThemeStyles;
    active?: TabsThemeStyles;
    disabled?: TabsThemeStyles;
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