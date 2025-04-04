<script lang="ts">
    import { getContext } from 'svelte';
    import PopoverTrigger from '../PopoverTrigger.svelte';
    import Text from '../../Text/Text.svelte';
    import type { CustomPopoverStore, PopoverItem } from '../types/index';
    import { getParentStore } from '../../../utilities/index';
    import { TextColorEnum, TextSizeEnum } from '../../Text/types/index';
    import { type PopoverChipTriggerCustomStyling } from './types/index';

    // -----------------------
    // External Properties
    // -----------------------
    export let label: string = '';
    export let requireselection: boolean = false;
    export let style: Record<string, string | number> | undefined = undefined; // External custom style prop

    // -----------------------
    // Internal Properties
    // -----------------------
    const popoverStore: CustomPopoverStore = getParentStore() as CustomPopoverStore;
    let rotateDegrees: number = 0;
    let selectedItems: PopoverItem[] = [];
    let isClearButtonHovered: boolean = false;

    // -----------------------
    // Internal Methods
    // -----------------------
    function handleClearButtonClick(event: MouseEvent): void {
        event.stopPropagation();
        isClearButtonHovered = false;
        popoverStore.close();
        popoverStore.updateSelectedItems([]);
    }

    // -----------------------
    // Reactive Lifecycle
    // -----------------------
    $: selectedItems = $popoverStore.selectedItems ?? [];
    $: rotateDegrees = $popoverStore.open ? 0 : 180;

    // -----------------------
    // Default Styles
    // -----------------------
    const defaultStyles: PopoverChipTriggerCustomStyling = {
        backgroundColor: '#FFFFFF',
        color: '#000000',
        padding: '8px 10px',
        borderRadius: '12px',
        border: '1px solid #CCC',
        labelColor: '#000000',
        chevronColor: '#787878',
        clearButtonColor: '#000000',
        hoverBackground: '#f0f0f0',
        hoverBorder: '#d0d0d0',
        selectedColor: '#FFFFFF',
        chevronColor: '#FFFFFF',
    };

    // -----------------------
    // Merging Styles Function
    // -----------------------
    const buildStyles = () => {
        const mergedStyles = {
            ...defaultStyles,
            ...style,
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

            --selected-color: ${mergedStyles.selectedColor};
            --chevron-color: ${mergedStyles.chevronColor};
        `;
    };
</script>

<PopoverTrigger>
    <div slot="custom-trigger" class="popover-chip-trigger" style={buildStyles()}>
        <div class="popover-chip-trigger__label">
            {#if selectedItems.length > 0}
                <span class="popover-chip-trigger__selected-label">
                    {selectedItems[0].label}
                </span>
                {#if selectedItems.length > 1}
                    <span class="popover-chip-trigger__selected-label">
                        +{selectedItems.length - 1}
                    </span>
                {/if}
            {:else}
                <span class="popover-chip-trigger__label">{label}</span>
            {/if}
        </div>
        {#if selectedItems.length === 0 || requireselection}
            <div class="popover-chip-trigger__chevron">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    style="transform: rotate({rotateDegrees}deg); transition: transform 0.3s ease;"
                >
                    <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
            </div>
        {:else}
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <!-- svelte-ignore a11y-mouse-events-have-key-events -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div
                class="popover-chip-trigger__clear-button"
                on:click={handleClearButtonClick}
                on:mouseenter={() => (isClearButtonHovered = true)}
                on:mouseleave={() => (isClearButtonHovered = false)}
            >
                <svg viewBox="0 0 14 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M13.3 0.709971C12.91 0.319971 12.28 0.319971 11.89 0.709971L7 5.58997L2.11 0.699971C1.72 0.309971 1.09 0.309971 0.700001 0.699971C0.310001 1.08997 0.310001 1.71997 0.700001 2.10997L5.59 6.99997L0.700001 11.89C0.310001 12.28 0.310001 12.91 0.700001 13.3C1.09 13.69 1.72 13.69 2.11 13.3L7 8.40997L11.89 13.3C12.28 13.69 12.91 13.69 13.3 13.3C13.69 12.91 13.69 12.28 13.3 11.89L8.41 6.99997L13.3 2.10997C13.68 1.72997 13.68 1.08997 13.3 0.709971Z"
                    />
                </svg>
            </div>
        {/if}
    </div>
</PopoverTrigger>

<style lang="scss">
    @import '../../../../variables.css';
    .popover-chip-trigger {
        display: flex;
        min-width: 100px;
        padding: var(--padding);
        justify-content: space-between;
        align-items: center;
        border-radius: var(--border-radius);
        outline: var(--border);
        background-color: var(--background-color);
        transition: all 0.3s ease;
        gap: var(--size-sm);

        &:hover {
            background-color: var(--hover-background);
            outline: var(--hover-border);
        }

        &--no-hover-effect {
            &:hover {
                background-color: transparent;
            }
        }

        &__label {
            display: flex;
            align-items: center;
            gap: 8px;
            user-select: none;
            color: var(--label-color);
            white-space: nowrap;
        }

        &__chevron {
            height: 14px;
            width: 14px;
            transition: transform 0.3s ease;
            color: var(--chevron-color);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 calc(var(--size-xs) + 3) px;
        }

        &__clear-button {
            height: 8px;
            width: 8px;
            cursor: pointer;
            color: var(--chevron-color);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: var(--size-xs);
            border-radius: var(--size-xs);
            z-index: 15;

            &--hovered {
                background-color: var(--hover-background);
            }
        }

        &__selected-label {
            color: var(--selected-color);
        }

        &__label {
            color: var(--color);
        }
    }
</style>
