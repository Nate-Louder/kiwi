<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { TextColorEnum, Text, TextSizeEnum } from '../../components/index.ts';
    import type { CheckboxCustomStyling } from './types/checkbox-custom-styling.interface.ts';

    // -----------------------
    // External Properties
    // -----------------------
    export let label;
    export let checked = false;
    export let style: CheckboxCustomStyling | undefined = undefined;

    // -----------------------
    // Internal Properties
    // -----------------------
    let checkbox: HTMLElement;
    const dispatch = createEventDispatcher();

    // -----------------------
    // Internal Methods
    // -----------------------
    function handleClick(event: MouseEvent) {
        event.stopPropagation();
        checked = !checked;
        dispatch('change', { value: checked });
        checkbox.focus();
    }

    const defaultStyles: CheckboxCustomStyling = {
        backgroundColor: '#FFFFFF',
        border: '2px solid #000000',
        borderRadius: '0px',
        hover: {
            border: '2px solid #555555',
        },

        checked: {
            backgroundColor: '#000000',
            border: '2px solid #000000',
            hover: {
                backgroundColor: '#555555',
                border: '2px solid #555555',
            },
        },
        focus: {
            border: 'solid 2px #000000',
        },
    };

    const buildStyles = () => {
        const baseStyles = defaultStyles;
        const mergedStyles = {
            ...baseStyles,
            ...style,
            hover: {
                ...baseStyles.hover,
                ...style?.hover,
            },
            checked: {
                ...baseStyles.checked,
                ...style?.checked,
                hover: {
                    ...baseStyles.checked?.hover,
                    ...style?.checked?.hover,
                },
            },
            focus: {
                ...baseStyles.focus,
                ...style?.focus,
            },
        };

        return `
            --background-color: ${mergedStyles.backgroundColor};
            --border: ${mergedStyles.border};
            --border-radius: ${mergedStyles.borderRadius};
            --hover-border: ${mergedStyles.hover?.border ?? 'inherit'};
            --checked-background: ${mergedStyles.checked?.backgroundColor ?? 'inherit'};
            --checked-border: ${mergedStyles.checked?.border ?? 'inherit'};
            --checked-hover-background: ${mergedStyles.checked?.hover?.backgroundColor ?? 'inherit'};
            --checked-hover-border: ${mergedStyles.checked?.hover?.border ?? 'inherit'};
            --focus-border: ${mergedStyles.focus?.border ?? 'inherit'};
        `;
    };

    $: checked;
</script>

<div class="checkbox">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="checkbox__inner" class:checkbox__inner--checked={checked} bind:this={checkbox} on:click={handleClick} style={buildStyles()}>
        {#if checked}
            <svg width="8" height="7" viewBox="0 0 8 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M2.46971 5.65706L0.812892 3.72545C0.626679 3.50835 0.325873 3.50835 0.13966 3.72545C-0.0465533 3.94254 -0.0465533 4.29324 0.13966 4.51034L2.13548 6.83718C2.3217 7.05427 2.6225 7.05427 2.80871 6.83718L7.86034 0.947714C8.04655 0.730616 8.04655 0.37992 7.86034 0.162823C7.67413 -0.0542743 7.37332 -0.0542743 7.18711 0.162823L2.46971 5.65706Z"
                    fill="white"
                />
            </svg>
        {/if}
    </div>
    {#if label}
        <Text color={TextColorEnum.primary} size={TextSizeEnum.medium}>
            {label}
        </Text>
    {/if}
</div>

<style lang="scss">
    .checkbox {
        display: flex;
        align-items: center;
        gap: 8px;
        width: fit-content;
        z-index: 2;

        &__inner {
            width: 13px;
            height: 13px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            background-color: var(--background-color);
            border: var(--border);
            border-radius: var(--border-radius);
            cursor: pointer;
            transition: all 0.3s ease;

            &:hover {
                border: var(--hover-border);
            }

            &--checked {
                background-color: var(--checked-background);
                border: var(--checked-border);

                &:hover {
                    background-color: var(--checked-hover-background);
                    border: var(--checked-hover-border);
                }
            }

            &:focus {
                border: var(--focus-border);
            }

            &:focus-visible {
                border: var(--focus-border);
            }
        }

        &__label {
            font-weight: 500;
            color: var(--color-text);
            user-select: none;
        }

        &__check-mark {
            width: 5px;
            height: 5px;
            background-color: white;
            border-radius: 50%;
        }
    }
</style>
