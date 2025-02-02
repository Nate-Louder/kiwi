export interface CheckboxCustomStyling {
    backgroundColor?: string;
    border?: string;
    borderRadius?: string;
    hover?: {
        border?: string;
    };
    checked?: {
        backgroundColor?: string;
        border?: string;
        hover?: {
            backgroundColor?: string;
            border?: string;
        };
    };
    focus?: {
        border?: string;
    };
}
