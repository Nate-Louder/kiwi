<script lang="ts">
    import { getParentStore } from '../../utilities/index';
    import type { CustomTabsStore } from './types/index';

    // -----------------------
    // External Properties
    // -----------------------
    export let tabnum: number;

    // -----------------------
    // Internal Properties
    // -----------------------
    const tabsStore: CustomTabsStore = getParentStore() as CustomTabsStore;
    let active: boolean;
    tabsStore.subscribe((value) => {
        active = value.activeTabIndex === tabnum;
    });
</script>

<div class="tab-content" class:tab-content--active={active}>
    <slot></slot>
</div>

<style lang="scss">
    .tab-content {
        width: auto;
        height: auto;
        display: none;

        &--active {
            display: block;
        }
    }
</style>
