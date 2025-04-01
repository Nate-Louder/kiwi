<script lang="ts">
    import PopoverContent from '../PopoverContent.svelte';
    import type { CustomPopoverStore, PopoverItem } from '../types/index';
    import { getParentStore } from '../../../utilities/index';
    import { Text, TextColorEnum } from '../../../components';
    import { createEventDispatcher } from 'svelte';

    // -----------------------
    // External Properties
    // -----------------------
    export let style: PopoverContentCustomStyling;

    // -----------------------
    // Internal Properties
    // -----------------------
    const popoverStore: CustomPopoverStore = getParentStore() as CustomPopoverStore;
    let items: PopoverItem[];
    let selectedItems: PopoverItem[];

    // -----------------------
    // Internal Methods
    // -----------------------
    function handleItemClicked(item: PopoverItem): void {
        if (selectedItems) {
            const label = item.label;
            const value = item.value;
            if (!selectedItems.includes(item)) {
                popoverStore.updateSelectedItems([{ value, label }]);
            } else {
                popoverStore.updateSelectedItems([]);
            }
        }
        popoverStore.close();
    }

    function isItemSelected(item: PopoverItem): boolean {
        return selectedItems.some((selectedItem) => selectedItem.value === item.value);
    }

    // -----------------------
    // Reactive Lifecycle
    // -----------------------
    $: items = $popoverStore.items ?? [];
    $: selectedItems = $popoverStore.selectedItems ?? [];
</script>

<PopoverContent {style}>
    <div slot="custom-content" class="single-select-content">
        {#each items as item}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div
                class="single-select-content__item"
                class:single-select-content__item--selected={isItemSelected(item)}
                on:click={() => handleItemClicked(item)}
            >
                <span>{item.label}</span>
            </div>
        {/each}
    </div>
</PopoverContent>

<style lang="scss">
    .single-select-content {
        display: flex;
        flex-direction: column;
        width: 200px;
        gap: var(--size-xs);
        background-color: var(--background-color);

        &__item {
            width: auto;
            padding: var(--size-xs) var(--size-md) var(--size-xs) var(--size-md);
            cursor: pointer;
            border-radius: var(--item-border-radius);
            transition: all 0.2s ease;
            color: var(--item-color);

            &:hover {
                background-color: var(--item-hover-background-color);
                color: var(--item-hover-color);
            }

            &--selected {
                background-color: var(--item-selected-background-color);
                color: var(--item-selected-color);

                &:hover {
                    background-color: var(--item-hover-background-color);
                }
            }
        }

        &__selected-indicator {
            width: var(--size-sm);
            height: var(--size-sm);
            border-radius: 50%;
            background-color: transparent;
            margin-right: var(--size-xs);
            display: flex;
            align-items: center;
            justify-content: center;

            &--selected {
                background-color: var(--item-selected-background-color);
                color: var(--item-selected-color);
            }
        }
    }
</style>
