<script lang="ts">
    import Button from '../Button/Button.svelte';
    import Header from '../Header/Header.svelte';
    import { HeaderTypeEnum } from '../Header/types/index';
    import { ButtonTypeEnum } from '../Button/types/index';
    import { createFlyoutStore } from './FlyoutStore';
    import { type FlyoutCustomStyling } from './types/flyout-custom-styling.interface';

    import { type CustomFlyoutStore, type FlyoutSide, FlyoutSideEnum } from './types/index';

    // -----------------------
    // External Properties
    // -----------------------
    export let side: FlyoutSide = FlyoutSideEnum.right;
    export let header: string = 'Header';
    export let subheader: string = 'Subheader';
    export let hidebackground: boolean = true;
    export let style: FlyoutCustomStyling;

    // -----------------------
    // External Methods
    // -----------------------
    export function toggle() {
        private_store.toggle();
    }

    export function close() {
        private_store.close();
    }

    export function open() {
        private_store.expand();
    }

    const defaultStyles: InputSeriesCustomStyling = {
        backgroundColor: '#FFFFFF',
        color: '#000000',
        width: '500px',
        headerColor: '#222222',
        subheaderColor: '#555555',
        headerFontSize: '48px',
        subheaderFontSize: '16px',
        headerFontWeight: 'bold',
        subheaderFontWeight: 'normal',
    };

    const buildStyles = () => {
        const mergedStyles = {
            ...defaultStyles,
            ...style,
            disabled: {
                ...defaultStyles.disabled,
                ...style?.disabled,
            },
        };

        return `
            --background-color: ${mergedStyles.backgroundColor};
            --color: ${mergedStyles.color};
            --border: ${mergedStyles.border};
            --width: ${mergedStyles.width};
            --header-color: ${mergedStyles.headerColor};
            --subheader-color: ${mergedStyles.subheaderColor};
            --header-font-size: ${mergedStyles.headerFontSize};
            --subheader-font-size: ${mergedStyles.subheaderFontSize};
            --header-font-weight: ${mergedStyles.headerFontWeight};
            --subheader-font-weight: ${mergedStyles.subheaderFontWeight};

            --disabled-background: ${mergedStyles.disabled?.backgroundColor ?? 'inherit'};
            --disabled-color: ${mergedStyles.disabled?.color ?? 'inherit'};
            --disabled-border: ${mergedStyles.disabled?.border ?? 'inherit'};

        `;
    };

    // -----------------------
    // Internal Properties
    // -----------------------
    let private_store: CustomFlyoutStore = createFlyoutStore(false, hidebackground);
</script>

<div class="flyout" style={buildStyles()}>
    <div
        class="flyout__content"
        class:flyout__content--expanded={$private_store.open}
        class:flyout__content--modeless={!hidebackground}
        class:left={side === 'left'}
    >
        <div class="flyout__inner">
            <div class="flyout__header">
                <div class="flyout__header__top">
                    <span class="flyout__header-h1">{header}</span>
                </div>
                <span class="flyout__header-sub">{subheader}</span>
            </div>
            <div class="flyout__body">
                <slot name="flyout-body" />
            </div>
            <div class="flyout__footer">
                <slot name="flyout-footer" />
            </div>
        </div>
    </div>

    {#if hidebackground}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="flyout__overlay" class:flyout__overlay--expanded={$private_store.open} on:click={() => private_store.close()} />
    {/if}
</div>

<style>.flyout {
  background-color: var(--background-color);
}
.flyout__content {
  position: fixed;
  top: 0;
  right: -500px;
  height: 100vh;
  width: var(--width);
  color: var(--color);
  z-index: 1500;
  transition: 0.2s ease;
}
.flyout__content--expanded {
  display: block;
  transform: translateX(-500px);
}
.flyout__content--left {
  left: 0;
}
.flyout__content--right {
  right: 0;
}
.flyout__content--modeless {
  border-left: 1px solid var(--color-edge-dark);
}
.flyout__overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  z-index: 1499;
  display: none;
  background-color: rgba(0, 0, 0, 0.5);
}
.flyout__overlay--expanded {
  display: block;
}
.flyout__inner {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: var(--background-color);
  padding: var(--size-md) var(--size-lg);
  gap: var(--size-md);
  box-sizing: border-box;
}
.flyout__close-button {
  display: flex;
  justify-content: flex-end;
}
.flyout__header {
  display: flex;
  flex-direction: column;
  gap: var(--size-xs);
}
.flyout__header-h1 {
  font-size: var(--header-font-size);
  font-weight: var(--header-font-weight);
  color: var(--header-color);
}
.flyout__header-sub {
  font-size: var(--subheader-font-size);
  font-weight: var(--subheader-font-weight);
  color: var(--subheader-color);
}
.flyout__header__top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.flyout__body {
  height: 100%;
  overflow-y: auto;
  scrollbar-width: thin;
  padding: var(--size-xs) var(--size-xs);
}
.flyout__footer {
  display: flex;
  padding: var(--size-md) 0;
}</style>
