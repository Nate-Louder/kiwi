<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import type { TextInputCustomStyling } from './types/text-input-custom-styling.interface';

    // -----------------------
    // External Properties
    // -----------------------
    export let label: string = '';
    export let placeholder: string = '';
    export let value: string = '';
    export let error: string = '';
    export let disabled: boolean = false;
    export let style: TextInputCustomStyling | undefined = undefined;

    // -----------------------
    // Internal Events
    // -----------------------
    const dispatch = createEventDispatcher();

    // -----------------------
    // Internal Methods
    // -----------------------
    const defaultStyles: TextInputCustomStyling = {
        backgroundColor: '#FFFFFF',
        color: '#000000',
        border: '1px solid #000000',
        borderRadius: '0px',
        padding: '8px',
        fontSize: '14px',
        hover: {
            border: '1px solid #333333',
        },
        focus: {
            border: '1px solid #000000',
        },
        disabled: {
            backgroundColor: '#f5f5f5',
            color: '#666666',
            cursor: 'not-allowed',
        },
        label: {
            color: '#000000',
            fontSize: '14px',
        },
        error: {
            border: '1px solid #dc2626',
            color: '#dc2626',
            message: {
                color: '#dc2626',
                fontSize: '12px',
            },
        },
    };

    const buildStyles = () => {
        const mergedStyles = {
            ...defaultStyles,
            ...style,
            hover: {
                ...defaultStyles.hover,
                ...style?.hover,
            },
            focus: {
                ...defaultStyles.focus,
                ...style?.focus,
            },
            disabled: {
                ...defaultStyles.disabled,
                ...style?.disabled,
            },
            label: {
                ...defaultStyles.label,
                ...style?.label,
            },
            error: {
                ...defaultStyles.error,
                ...style?.error,
                message: {
                    ...defaultStyles.error?.message,
                    ...style?.error?.message,
                },
            },
        };

        return `
            --background-color: ${mergedStyles.backgroundColor};
            --color: ${mergedStyles.color};
            --border: ${mergedStyles.border};
            --border-radius: ${mergedStyles.borderRadius};
            --padding: ${mergedStyles.padding};
            --font-size: ${mergedStyles.fontSize};

            --hover-border: ${mergedStyles.hover?.border ?? 'inherit'};
            --hover-background: ${mergedStyles.hover?.backgroundColor ?? 'inherit'};
            --hover-color: ${mergedStyles.hover?.color ?? 'inherit'};

            --focus-border: ${mergedStyles.focus?.border ?? 'inherit'};
            --focus-background: ${mergedStyles.focus?.backgroundColor ?? 'inherit'};
            --focus-color: ${mergedStyles.focus?.color ?? 'inherit'};

            --disabled-background: ${mergedStyles.disabled?.backgroundColor ?? 'inherit'};
            --disabled-color: ${mergedStyles.disabled?.color ?? 'inherit'};
            --disabled-border: ${mergedStyles.disabled?.border ?? 'inherit'};
            --disabled-cursor: ${mergedStyles.disabled?.cursor ?? 'not-allowed'};

            --label-color: ${mergedStyles.label?.color};
            --label-font-size: ${mergedStyles.label?.fontSize};

            --error-border: ${mergedStyles.error?.border};
            --error-color: ${mergedStyles.error?.color};
            --error-message-color: ${mergedStyles.error?.message?.color};
            --error-message-font-size: ${mergedStyles.error?.message?.fontSize};
        `;
    };

    function handleInput(event: Event) {
        const target = event.target as HTMLInputElement;
        value = target.value;
        dispatch('change', { value });
    }
</script>

<div class="input-container" style={buildStyles()}>
    {#if label}
        <label class="input-label" for="input">{label}</label>
    {/if}
    <input
        id="input"
        class="input"
        class:input--error={error}
        class:input--disabled={disabled}
        type="text"
        {value}
        {placeholder}
        {disabled}
        on:input={handleInput}
    />
    {#if error}
        <span class="input-error">{error}</span>
    {/if}
</div>

<style lang="scss">
    .input-container {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .input-label {
        color: var(--label-color);
        font-size: var(--label-font-size);
    }

    .input {
        background-color: var(--background-color);
        color: var(--color);
        border: var(--border);
        border-radius: var(--border-radius);
        padding: var(--padding);
        font-size: var(--font-size);
        outline: none;
        transition: all 0.2s ease;

        &:hover:not(.input--disabled) {
            border: var(--hover-border);
            background-color: var(--hover-background);
            color: var(--hover-color);
        }

        &:focus:not(.input--disabled) {
            border: var(--focus-border);
            background-color: var(--focus-background);
            color: var(--focus-color);
        }

        &--disabled {
            background-color: var(--disabled-background);
            color: var(--disabled-color);
            border: var(--disabled-border);
            cursor: var(--disabled-cursor);
        }

        &--error {
            border: var(--error-border);
            color: var(--error-color);
        }
    }

    .input-error {
        color: var(--error-message-color);
        font-size: var(--error-message-font-size);
    }
</style>
