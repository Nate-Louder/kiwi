export enum ButtonTypeEnum {
    primary = 'primary',
    secondary = 'secondary',
    tertiary = 'tertiary'
}

export type ButtonType = `${ButtonTypeEnum}`;

export enum ButtonSizeEnum {
    small = 'small',
    medium = 'medium',
    large = 'large'
}

export type ButtonSize = `${ButtonSizeEnum}`;

export interface ButtonThemeStyles {
    backgroundColor?: string;
    color?: string;
    border?: string;
    padding?: string;
    borderRadius?: string;
    fontSize?: string;
    cursor?: string;
}

export interface ButtonCustomStyling extends ButtonThemeStyles {
    hover?: ButtonThemeStyles;
    focus?: ButtonThemeStyles;
    active?: ButtonThemeStyles;
    disabled?: ButtonThemeStyles;
}