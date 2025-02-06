<script lang="ts">
    import { createTabsStore } from './TabsStore';
    import { setParentStoreContext } from '../../index';
    import type { TabsCustomStyling, TabsThemeStyles } from './types';

    // -----------------------
    // External Properties
    // -----------------------
    export let activeTab: number;
    export let style: TabsCustomStyling | undefined = undefined;

    // -----------------------
    // Internal Properties
    // -----------------------
    const private_store = createTabsStore(activeTab);
    setParentStoreContext(private_store);

    const baseStyles: TabsThemeStyles = {
        backgroundColor: '#FFFFFF',
        color: '#000000',
        border: 'none',
        borderRadius: '0px',
        padding: '8px 16px',
        fontSize: '16px',
        cursor: 'pointer',
    };

    const defaultStyles: TabsCustomStyling = {
        ...baseStyles,
        hover: {
            ...baseStyles,
            backgroundColor: '#f5f5f5',
        },
        active: {
            ...baseStyles,
            color: '#000000',
            fontWeight: '500',
        },

        disabled: {
            ...baseStyles,
            backgroundColor: '#f5f5f5',
            color: '#666666',
            cursor: 'not-allowed',
        },
        indicator: {
            ...baseStyles,
            height: '2px',
            width: '16px',
            color: '#dc2626',
        },
    };

    const buildStyles = () => {
        const mergedStyles = {
            ...defaultStyles,
            ...style,
            active: {
                ...defaultStyles.active,
                ...style?.active,
            },
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
            indicator: {
                ...defaultStyles.indicator,
                ...style?.indicator,
            },
            error: {
                ...defaultStyles.error,
                ...style?.error,
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
            --cursor: ${mergedStyles.cursor};

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
            --disabled-font-weight: ${mergedStyles.disabled?.fontWeight ?? 'inherit'};
            --diabled-fontSize: ${mergedStyles.disabled?.fontSize ?? 'inherit'};
            --disabled-width: ${mergedStyles.disabled?.width ?? 'inherit'};

            --indicator-height: ${mergedStyles.indicator?.height};
            --indicator-width: ${mergedStyles.indicator?.width};
            --indicator-border-radius: ${mergedStyles.indicator?.borderRadius ?? '8px'};
            --indicator-color: ${mergedStyles.indicator?.color};

            --active-font-weight: ${mergedStyles.active?.fontWeight ?? 'inherit'};
            --active-color: ${mergedStyles.active?.color ?? 'inherit'};
            --active-background: ${mergedStyles.active?.backgroundColor ?? 'inherit'};
            --active-border: ${mergedStyles.active?.border ?? 'inherit'};
            --active-border-radius: ${mergedStyles.active?.borderRadius ?? 'inherit'};
            --active-padding: ${mergedStyles.active?.padding ?? 'inherit'};
            --active-font-size: ${mergedStyles.active?.fontSize ?? 'inherit'};
            --active-width: ${mergedStyles.active?.width ?? 'inherit'};
            --active-height: ${mergedStyles.active?.height ?? 'inherit'};
            
            --error-border: ${mergedStyles.error?.border ?? 'inherit'};
            --error-color: ${mergedStyles.error?.color ?? 'inherit'};
            --error-message-color: ${mergedStyles.error?.message?.color ?? 'inherit'};
            --error-message-font-size: ${mergedStyles.error?.message?.fontSize ?? 'inherit'};
            
            --label-color: ${mergedStyles.label?.color ?? 'inherit'};
            --label-font-size: ${mergedStyles.label?.fontSize ?? 'inherit'};

            --container-gap: ${mergedStyles.container?.gap};
        `;
    };
</script>

<div class="tabs" style={buildStyles()}>
    <div class="tabs__labels">
        <slot name="labels"></slot>
    </div>
    <div class="tabs__content">
        <slot name="contents"></slot>
    </div>
</div>

<style lang="scss">
    @import '../../../variables.css';

    .tabs {
        display: flex;
        flex-direction: column;

        &__labels {
            display: flex;

            & > * {
                flex: 1;
                text-align: center;
                padding: 8px 16px;
                cursor: var(--cursor);
            }

            & > *:hover {
                background-color: var(--hover-background);
            }

            & > *:not(:last-child) {
            }
        }

        &__content {
            padding: 16px;
        }
    }
</style>
