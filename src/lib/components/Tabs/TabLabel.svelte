<script lang="ts">
    import type { CustomTabsStore } from './types/index';
    import { getParentStore } from '../../index';

    // -----------------------
    // External Properties
    // -----------------------
    export let tabnum: number;

    // -----------------------
    // Internal Properties
    // -----------------------
    const tabsStore: CustomTabsStore = getParentStore() as CustomTabsStore;
    let active: boolean;
    let activeTabIndex: number;

    tabsStore.subscribe((value) => {
        active = value.activeTabIndex === tabnum;
        activeTabIndex = value.activeTabIndex ?? -1;
    });

    // -----------------------
    // Internal Methods
    // -----------------------
    function handleTabClick(tabnum: number): void {
        tabsStore.updateActiveTabIndex(tabnum);
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="tab-label" class:tab-label--active={active} class:tab-label--disabled={false} on:click={() => handleTabClick(tabnum)}>
    <span class="tab-label__text">
        <slot></slot>
    </span>
    <div class="tab-label__indicator" class:tab-label__indicator--active={active}></div>
</div>

<style lang="scss">
    .tab-label {
        padding: var(--padding);
        font-size: var(--font-size);
        background-color: var(--background-color);
        color: var(--color);
        border: none;
        border-radius: var(--border-radius);
        cursor: var(--cursor);
        width: var(--width);
        height: var(--height);
        user-select: none;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;

        &:hover:not(.tab-label--disabled) {
            background-color: var(--hover-background);
            color: var(--hover-color);
            border: var(--hover-border);
        }

        &:focus:not(.tab-label--disabled) {
            background-color: var(--focus-background);
            color: var(--focus-color);
            border: var(--focus-border);
        }

        &--active {
            background-color: var(--active-background);
            color: var(--active-color);
            border: var(--active-border);
            border-radius: var(--active-border-radius);
            padding: var(--active-padding);
            font-size: var(--active-font-size);
            cursor: var(--active-cursor);
            font-weight: var(--active-font-weight);

            &:hover {
                background-color: var(--active-background);
                color: var(--active-color);
                border: var(--active-border);
            }
        }

        &--disabled {
            background-color: var(--disabled-background);
            color: var(--disabled-color);
            border: var(--disabled-border);
            cursor: var(--disabled-cursor);
            font-weight: var(--disabled-font-weight);
            font-size: var(--disabled-font-size);
            width: var(--disabled-width);
        }

        .tab-label__indicator {
            height: var(--indicator-height);
            width: var(--indicator-width);
            border-radius: var(--indicator-border-radius);
            position: absolute;
            bottom: 2px;

            &--active {
                background-color: var(--indicator-color);
            }
        }
    }
</style>
