<script lang="ts">
    import type { CustomPopoverStore } from './types/index';
    import { getParentStore } from '../../utilities/index';
    import type { PopoverContentCustomStyling } from './types/index';

    export let fullwidth: boolean = false;
    export let style: PopoverContentCustomStyling;

    const popoverStore: CustomPopoverStore = getParentStore() as CustomPopoverStore;

    const defaultStyles: InputSeriesCustomStyling = {
        backgroundColor: '#FFFFFFF',
        color: '#000000',
        border: '1px solid #000000',
        borderRadius: '0',
        padding: '8px',
        fontSize: '16px',
        itemBackgroundColor: '#FFFFFF',
        itemColor: '#000000',
        itemBorderRadius: '0',
        hover: {
            backgroundColor: '#f0f0f0',
            color: '#000000',
        },
        selected: {
            itemBackgroundColor: '#000000',
            itemColor: '#FFFFFF',
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
            selected: {
                ...defaultStyles.selected,
                ...style?.selected,
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

            --item-background-color: ${mergedStyles.itemBackgroundColor};
            --item-color: ${mergedStyles.itemColor};
            --item-border-radius: ${mergedStyles.itemBorderRadius};

            --item-hover-background-color: ${mergedStyles.hover?.backgroundColor ?? 'inherit'};
            --item-hover-color: ${mergedStyles.hover?.color ?? 'inherit'};

            --item-selected-background-color: ${mergedStyles.selected?.itemBackgroundColor};
            --item-selected-color: ${mergedStyles.selected?.itemColor};

            --container-gap: ${mergedStyles.container?.gap};
        `;
    };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    id="content"
    class="popover__content"
    class:popover__content--hidden={!$popoverStore?.open}
    class:popover__content--full-width={fullwidth}
    style={buildStyles()}
>
    <slot name="custom-content"></slot>
</div>

<style lang="scss">
    .popover__content {
        padding: var(--size-xs);
        border-radius: var(--border-radius);
        background-color: var(--background-color);
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
