<script lang="ts">
    import type { CustomPopoverStore } from './types/index';
    import { getParentStore } from '../../utilities/index';

    export let fullwidth: boolean = false;

    const popoverStore: CustomPopoverStore = getParentStore() as CustomPopoverStore;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    id="content"
    class="popover__content"
    class:popover__content--hidden={!$popoverStore?.open}
    class:popover__content--full-width={fullwidth}
>
    <slot name="custom-content"></slot>
</div>

<style lang="scss">
    .popover__content {
        padding: var(--size-xs);
        border-radius: var(--size-sm);
        background-color: var(--color-surface);
        box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.1);
        position: absolute;
        width: fit-content;
        box-sizing: border-box;
        z-index: 1000;
        margin-top: var(--size-xs);

        &--hidden {
            display: none;
        }

        &--full-width {
            width: 100%;
        }
    }
</style>
