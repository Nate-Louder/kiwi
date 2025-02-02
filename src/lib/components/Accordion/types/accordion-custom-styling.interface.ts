export interface AccordionThemeStyles {
    backgroundColor?: string;
    color?: string;
    border?: string;
    borderRadius?: string;
    padding?: string;
    fontSize?: string;
    cursor?: string;
}

export interface AccordionCustomStyling extends AccordionThemeStyles {
    hover?: AccordionThemeStyles;
    focus?: AccordionThemeStyles;
    active?: AccordionThemeStyles;
    expanded?: AccordionThemeStyles;
    header?: {
        backgroundColor?: string;
        color?: string;
        border?: string;
        padding?: string;
        hover?: AccordionThemeStyles;
        focus?: AccordionThemeStyles;
        active?: AccordionThemeStyles;
        chevron?: {
            color?: string;
        };
    };
    body?: {
        backgroundColor?: string;

        color?: string;
        border?: string;
        padding?: string;
    };
}
