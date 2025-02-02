<script lang="ts">
    import type { CustomPopoverStore } from './types/index.ts';
    import { getParentStore } from '../../utilities/index.ts';

    export let fullheight: boolean = false;
    export let fullwidth: boolean = false;

    const popoverStore: CustomPopoverStore = getParentStore() as CustomPopoverStore;
    popoverStore.updateFullWidth(fullwidth);

    function handleClick(): void {
        if ($popoverStore.hover) {
            return;
        }
        popoverStore.toggle();
    }

    function handleHover(): void {
        if (!$popoverStore.hover) {
            return;
        }
        popoverStore.toggle();
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    id="trigger"
    class="popover__trigger"
    class:popover__trigger--full-height={fullheight}
    class:popover__trigger--full-width={fullwidth}
    on:click={handleClick}
    on:mouseenter={handleHover}
    on:mouseleave={handleHover}
>
    <slot name="custom-trigger"></slot>
</div>

<style lang="scss">
    .popover__trigger {
        cursor: pointer;
        width: fit-content;

        &--full-height {
            height: 100%;
        }

        &--full-width {
            width: 100%;
        }
    }
</style>
