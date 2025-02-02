<script lang="ts">
    import { setContext } from 'svelte';
    import { createAccordionStore } from './accordionStore.ts';
    import { setParentStoreContext } from '../../utilities/index.ts';
    import type { CustomAccordionStore } from './types/index.ts';
    import type { AccordionCustomStyling } from './types';
    import { createEventDispatcher } from 'svelte';

    // -----------------------
    // External Properties
    // -----------------------
    export let style: AccordionCustomStyling | undefined = undefined;

    // -----------------------
    // Internal Properties
    // -----------------------
    const private_store: CustomAccordionStore = createAccordionStore() as CustomAccordionStore;
    setParentStoreContext(private_store);

    let hovered: boolean = false;

    const defaultStyles: AccordionCustomStyling = {
        backgroundColor: '#FFFFFF',
        border: '1px solid #000000',
        borderRadius: '0px',
        cursor: 'pointer',
        hover: {
            border: '1px solid #000000',
        },
        header: {
            backgroundColor: '#FFFFFF',
            color: '#000000',
            padding: '8px',
            hover: {
                backgroundColor: '#f5f5f5',
            },
            focus: {
                backgroundColor: '#f5f5f5',
            },
            active: {
                backgroundColor: '#f5f5f5',
            },
        },
        body: {
            backgroundColor: '#FFFFFF',
            color: '#000000',
            padding: '8px',
            border: 'none',
        },

        expanded: {
            border: '1px solid #000000',
        },
    };

    // -----------------------
    // Internal Methods
    // -----------------------
    function handleMouseEnter(): void {
        hovered = true;
    }

    function handleMouseLeave(): void {
        hovered = false;
    }

    const buildStyles = () => {
        const baseStyles = defaultStyles;
        const mergedStyles = {
            ...defaultStyles,
            ...style,
            header: {
                ...defaultStyles.header,
                ...style?.header,
                hover: {
                    ...defaultStyles.header?.hover,
                    ...style?.header?.hover,
                },
                focus: {
                    ...defaultStyles.header?.focus,
                    ...style?.header?.focus,
                },
                active: {
                    ...defaultStyles.header?.active,
                    ...style?.header?.active,
                },
            },
            body: {
                ...defaultStyles.body,
                ...style?.body,
            },
            expanded: {
                ...defaultStyles.expanded,
                ...style?.expanded,
            },
        };

        return `
            --background-color: ${mergedStyles.backgroundColor};
            --border: ${mergedStyles.border};
            --border-radius: ${mergedStyles.borderRadius};
            --cursor: ${mergedStyles.cursor};

            --hover-border: ${mergedStyles.hover?.border ?? 'inherit'};
            --hover-background-color: ${mergedStyles.hover?.backgroundColor ?? 'inherit'};

            --header-background-color: ${mergedStyles.header?.backgroundColor};
            --header-color: ${mergedStyles.header?.color};
            --header-padding: ${mergedStyles.header?.padding};
            --header-hover-background-color: ${mergedStyles.header?.hover?.backgroundColor ?? 'inherit'};
            --header-hover-color: ${mergedStyles.header?.hover?.color ?? 'inherit'};
            --header-focus-background: ${mergedStyles.header?.focus?.backgroundColor ?? 'inherit'};
            --header-focus-color: ${mergedStyles.header?.focus?.color ?? 'inherit'};
            --header-active-background: ${mergedStyles.header?.active?.backgroundColor ?? 'inherit'};
            --header-active-color: ${mergedStyles.header?.active?.color ?? 'inherit'};
            --header-chevron-color: ${mergedStyles.header?.chevron?.color ?? 'inherit'};

            --body-background-color: ${mergedStyles.body?.backgroundColor};
            --body-color: ${mergedStyles.body?.color};
            --body-padding: ${mergedStyles.body?.padding};
            --body-border: ${mergedStyles.body?.border};

            --expanded-border: ${mergedStyles.expanded?.border};
        `;
    };
</script>

<div class="accordion" class:accordion--hovered={hovered} style={buildStyles()}>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="accordion__header" on:mouseenter={handleMouseEnter} on:mouseleave={handleMouseLeave}>
        <slot name="header"></slot>
    </div>
    <div class="accordion__body">
        <slot name="body"></slot>
    </div>
</div>

<style lang="scss">
    .accordion {
        overflow: hidden;
        border-radius: var(--border-radius);
        border: var(--border);
        background-color: var(--background-color);
        transition: all 0.2s ease;
        width: auto;
        box-sizing: border-box;
        cursor: var(--cursor);

        &--hovered {
            border: var(--hover-border);
            background-color: var(--hover-background-color);
        }
    }
</style>
