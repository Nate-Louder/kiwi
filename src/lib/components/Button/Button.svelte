<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import {
        ButtonTypeEnum,
        type ButtonType,
        ButtonSizeEnum,
        type ButtonSize,
        type ButtonCustomStyling,
        type ButtonThemeStyles,
    } from './types/index';

    // -----------------------
    // External Properties
    // -----------------------
    export let href: string = '';
    export let target: string = '';
    export let type: ButtonType = ButtonTypeEnum.primary;
    export let size: ButtonSize = ButtonSizeEnum.medium;

    export let style: ButtonCustomStyling | undefined = undefined;

    // -----------------------
    // Internal Properties
    // -----------------------
    let button: HTMLElement;
    let dispatch = createEventDispatcher();

    // -----------------------
    // Internal Methods
    // -----------------------
    const onClick = (event: MouseEvent) => {
        if (!href) {
            event.preventDefault();
        }
        dispatch('click', event);
        const ripple: HTMLElement = document.createElement('div');
        ripple.classList.add('ripple');
        ripple.style.backgroundColor = style?.backgroundColor ?? defaultStyles[type].backgroundColor ?? '#ffffff';
        button.appendChild(ripple);

        const rect = button.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        setTimeout(() => {
            ripple.remove();
        }, 1000);
    };

    const defaultStyles: Record<ButtonType, ButtonCustomStyling> = {
        primary: {
            backgroundColor: '#000000',
            color: '#ffffff',
            border: '1px solid #000000',
            hover: {
                backgroundColor: '#333333',
                color: '#ffffff',
                border: '1px solid #000000',
            },
            focus: {
                backgroundColor: '#333333',
                color: '#ffffff',
                border: '1px solid #000000',
            },
            active: {
                backgroundColor: '#333333',
                color: '#ffffff',
                border: '1px solid #000000',
            },
        },
        secondary: {
            backgroundColor: '#FFFFFF',
            color: '#000000',
            border: '1px solid #000000',
            hover: {
                backgroundColor: '#f5f5f5',
                border: '1px solid #000000',
            },
            focus: {
                backgroundColor: '#f5f5f5',
                color: '#000000',
                border: '1px solid #000000',
            },
            active: {
                backgroundColor: '#f5f5f5',
                color: '#000000',
                border: '1px solid #000000',
            },
        },

        tertiary: {
            backgroundColor: '#FFFFFF',
            color: '#000000',
            border: '1px solid #FFFFFF',
            hover: {
                backgroundColor: '#f5f5f5',
                border: '1px solid #FFFFFF',
            },
            focus: {
                backgroundColor: '#f5f5f5',
                color: '#000000',
                border: '1px solid #FFFFFF',
            },
            active: {
                backgroundColor: '#f5f5f5',
                color: '#000000',
                border: '1px solid #FFFFFF',
            },
        },
    };

    const sizeStyles: Record<ButtonSize, ButtonThemeStyles> = {
        small: {
            padding: '4px 8px',
            fontSize: '14px',
        },
        medium: {
            padding: '8px 16px',
            fontSize: '16px',
        },
        large: {
            padding: '12px 24px',
            fontSize: '18px',
        },
    };

    const buildStyles = () => {
        const baseStyles = defaultStyles[type];
        const sizeStyle = sizeStyles[size];

        const mergedStyles = {
            borderRadius: '0px',
            cursor: 'pointer',
            border: style?.border ?? baseStyles.border,
            ...baseStyles,
            ...sizeStyle,
            ...style,
            hover: {
                ...baseStyles.hover,
                ...style?.hover,
                backgroundColor: style?.hover?.backgroundColor ?? style?.backgroundColor ?? baseStyles.hover?.backgroundColor,
                color: style?.hover?.color ?? style?.color ?? baseStyles.hover?.color,
                border: style?.hover?.border ?? style?.border ?? baseStyles.hover?.border ?? baseStyles.border,
            },
            focus: {
                ...baseStyles.focus,
                ...style?.focus,
                backgroundColor:
                    style?.focus?.backgroundColor ??
                    style?.hover?.backgroundColor ??
                    style?.backgroundColor ??
                    baseStyles.focus?.backgroundColor,
                color: style?.focus?.color ?? style?.color ?? baseStyles.hover?.color,
                border:
                    style?.focus?.border ??
                    style?.hover?.border ??
                    style?.border ??
                    baseStyles.focus?.border ??
                    baseStyles.hover?.border ??
                    baseStyles.border,
            },
            active: {
                ...baseStyles.active,
                ...style?.active,
                backgroundColor:
                    style?.focus?.backgroundColor ??
                    style?.hover?.backgroundColor ??
                    style?.backgroundColor ??
                    baseStyles.active?.backgroundColor,
                color: style?.active?.color ?? style?.color ?? baseStyles.hover?.color,
                border:
                    style?.focus?.border ??
                    style?.hover?.border ??
                    style?.border ??
                    baseStyles.focus?.border ??
                    baseStyles.hover?.border ??
                    baseStyles.border,
            },
            disabled: {
                ...baseStyles.disabled,
                ...style?.disabled,
            },
        };

        return `
            --background-color: ${mergedStyles.backgroundColor};
            --color: ${mergedStyles.color};
            --border: ${mergedStyles.border};
            --border-radius: ${mergedStyles.borderRadius};
            --padding: ${mergedStyles.padding};
            --font-size: ${mergedStyles.fontSize};
            --cursor: ${mergedStyles.cursor};
            --hover-background: ${mergedStyles.hover?.backgroundColor ?? 'inherit'};
            --hover-color: ${mergedStyles.hover?.color ?? 'inherit'};
            --hover-border: ${mergedStyles.hover?.border ?? 'inherit'};
            --focus-background: ${mergedStyles.focus?.backgroundColor ?? 'inherit'};
            --focus-color: ${mergedStyles.focus?.color ?? 'inherit'};
            --focus-border: ${mergedStyles.focus?.border ?? 'inherit'};
            --active-background: ${mergedStyles.active?.backgroundColor ?? 'inherit'};
            --active-color: ${mergedStyles.active?.color ?? 'inherit'};
            --active-border: ${mergedStyles.active?.border ?? 'inherit'};
            --disabled-background: ${mergedStyles.disabled?.backgroundColor ?? 'inherit'};
            --disabled-color: ${mergedStyles.disabled?.color ?? 'inherit'};
            --disabled-border: ${mergedStyles.disabled?.border ?? 'inherit'};
            --disabled-cursor: ${mergedStyles.disabled?.cursor ?? 'not-allowed'};
        `;
    };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<a class="button" {href} {target} on:click={onClick} bind:this={button} style={buildStyles()}>
    <span class="button__label">
        <slot />
    </span>
</a>

<style lang="scss">
    .button {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        overflow: hidden;
        width: fit-content;
        user-select: none;
        transition: all 0.2s ease;
        text-decoration: none;
        outline: none;
        background-color: var(--background-color);
        color: var(--color);
        border: var(--border);
        border-radius: var(--border-radius);
        padding: var(--padding);
        font-size: var(--font-size);
        cursor: var(--cursor);

        &:hover {
            background-color: var(--hover-background);
            color: var(--hover-color);
            border: var(--hover-border);
        }

        &:focus {
            background-color: var(--focus-background);
            color: var(--focus-color);
            border: var(--focus-border);
        }

        &:active {
            background-color: var(--active-background);
            color: var(--active-color);
            border: var(--active-border);
        }

        &:disabled {
            background-color: var(--disabled-background);
            color: var(--disabled-color);
            border: var(--disabled-border);
            cursor: var(--disabled-cursor);
        }
    }

    .button__label {
        z-index: 2;
        display: flex;
        align-items: center;
    }

    :global(.ripple) {
        position: absolute;
        border-radius: 50%;
        width: 100px;
        height: 100px;
        transform: translate(-50%, -50%) scale(0);
        animation: ripple 1s forwards;
        pointer-events: none;
        z-index: 1;
        opacity: 0;
    }

    @keyframes ripple {
        from {
            opacity: 1;
            transform: translate(-50%, -50%) scale(0);
        }
        to {
            opacity: 0;
            transform: translate(-50%, -50%) scale(4);
        }
    }
</style>
