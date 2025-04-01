<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { InputSeriesTypeEnum, type InputSeriesType } from './types/index';
    import type { InputSeriesCustomStyling } from './types/input-series-custom-styling.interface';
    import Text from '../Text/Text.svelte';
    // -----------------------
    // External Properties
    // -----------------------
    export let inputamount: number = 5;
    export let maxlength: number = 1;
    export let type: InputSeriesType = InputSeriesTypeEnum.alphanumeric;
    export let label: string;
    export let value: string[] = Array(inputamount).fill('');
    export let style: InputSeriesCustomStyling | undefined = undefined;

    // -----------------------
    // Internal Events
    // -----------------------
    const dispatch = createEventDispatcher();

    // -----------------------
    // Internal Properties
    // -----------------------
    let inputElements: HTMLInputElement[] = [];

    const defaultStyles: InputSeriesCustomStyling = {
        backgroundColor: '#FFFFFF',
        color: '#000000',
        border: '1px solid #000000',
        borderRadius: '0',
        padding: '8px',
        fontSize: '16px',
        width: '35px',
        height: '35px',
        hover: {
            border: '2px solid #000000',
        },
        focus: {
            border: '2px solid #000000',
        },
        label: {
            color: '#000000',
            fontSize: '14px',
        },
        container: {
            gap: '8px',
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
            container: {
                ...defaultStyles.container,
                ...style?.container,
            },
        };

        return `
            --background-color: ${mergedStyles.backgroundColor};
            --color: ${mergedStyles.color};
            --border: ${mergedStyles.border};
            --border-radius: ${mergedStyles.borderRadius};
            --padding: ${mergedStyles.padding};
            --font-size: ${mergedStyles.fontSize};
            --width: ${mergedStyles.width};
            --height: ${mergedStyles.height};

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

            --container-gap: ${mergedStyles.container?.gap};
        `;
    };

    // -----------------------
    // Internal Methods
    // -----------------------
    function handleKeyNavigation(event: KeyboardEvent, index: number): void {
        if (event.key === 'Enter') {
            if (index != inputElements.length - 1) {
                inputElements[index + 1].focus();
            } else {
                inputElements[index].blur();
            }
        }
    }

    function handleInput(event: Event, index: number): void {
        let targetValue = (event.target as HTMLInputElement).value;

        if (type === InputSeriesTypeEnum.digit) {
            if (!/^\d+$/.test(targetValue)) {
                (event.target as HTMLInputElement).value = targetValue.slice(0, -1);
                return;
            }
        } else if (type === InputSeriesTypeEnum.character) {
            if (!/^[a-zA-Z]+$/.test(targetValue)) {
                (event.target as HTMLInputElement).value = targetValue.slice(0, -1);
                return;
            }
        } else if (type === InputSeriesTypeEnum.alphanumeric) {
            if (!/^[a-zA-Z0-9]+$/.test(targetValue)) {
                (event.target as HTMLInputElement).value = targetValue.slice(0, -1);
                return;
            }
        }

        if (targetValue.length > maxlength) {
            (event.target as HTMLInputElement).value = (event as InputEvent).data ?? '';
        }
        if (targetValue.length >= maxlength) {
            if (index != inputElements.length - 1) {
                inputElements[index + 1].focus();
            } else {
                inputElements[index].blur();
            }
        }
    }
</script>

<div class="input-series" style={buildStyles()}>
    <div class="input-series__header">
        <div class="input-series__label">{label}</div>
    </div>
    <div class="input-series__container">
        {#each Array(inputamount) as _, index}
            <div class="input-series__entryarea">
                <input
                    class="input-series__input"
                    type="text"
                    bind:this={inputElements[index]}
                    on:keydown={(event) => handleKeyNavigation(event, index)}
                    on:input={(event) => handleInput(event, index)}
                    on:change={() => dispatch('change', { value: inputElements.map((input) => input.value) })}
                    bind:value={value[index]}
                />
            </div>
        {/each}
    </div>
</div>

<style lang="scss">
    .input-series {
        display: flex;
        flex-direction: column;
        gap: var(--container-gap);
        align-items: flex-start;

        &__container {
            display: flex;
            gap: var(--container-gap);
        }

        &__entryarea {
            height: var(--height);
            line-height: var(--height);
        }

        &__input {
            width: var(--width);
            height: var(--height);
            box-sizing: border-box;
            font-size: var(--font-size);
            color: var(--color);
            border: var(--border);
            border-radius: var(--border-radius);
            padding: var(--padding);
            background-color: var(--background-color);
            outline: none;
            text-align: center;

            &:hover {
                border: var(--hover-border);
                background-color: var(--hover-background);
                color: var(--hover-color);
            }

            &:focus {
                border: var(--focus-border);
                background-color: var(--focus-background);
                color: var(--focus-color);
            }

            &:disabled {
                background-color: var(--disabled-background);
                color: var(--disabled-color);
                border: var(--disabled-border);
                cursor: var(--disabled-cursor);
            }
        }

        &__label {
            color: var(--label-color);
            font-size: var(--label-font-size);
        }
    }
</style>
