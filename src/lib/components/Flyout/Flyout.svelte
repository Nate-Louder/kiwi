<script lang="ts">
    import Button from '../Button/Button.svelte';
    import Header from '../Header/Header.svelte';
    import { HeaderTypeEnum } from '../Header/types/index';
    import { ButtonTypeEnum } from '../Button/types/index';
    import { createFlyoutStore } from './FlyoutStore';

    import { type CustomFlyoutStore, type FlyoutSide, FlyoutSideEnum } from './types/index';

    // -----------------------
    // External Properties
    // -----------------------
    export let side: FlyoutSide = FlyoutSideEnum.right;
    export let header: string = 'Header';
    export let subheader: string = 'Subheader';
    export let hidebackground: boolean = false;

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

    // -----------------------
    // Internal Properties
    // -----------------------
    let private_store: CustomFlyoutStore = createFlyoutStore(false, hidebackground);
</script>

<div class="flyout">
    <div
        class="flyout__content"
        class:flyout__content--expanded={$private_store.open}
        class:flyout__content--modeless={!hidebackground}
        class:left={side === 'left'}
    >
        <div class="flyout__inner">
            <div class="flyout__header">
                <div class="flyout__header__top">
                    <Header type={HeaderTypeEnum.h1}>{header}</Header>
                    <div class="flyout__close-button">
                        <Button type={ButtonTypeEnum.secondary} style={{}} on:click={() => private_store.close()}
                            ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                ><path
                                    fill="currentColor"
                                    d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"
                                /></svg
                            ></Button
                        >
                    </div>
                </div>
                <Header type={HeaderTypeEnum.subheader}>{subheader}</Header>
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

<style lang="scss">
    .flyout {
        &__content {
            position: fixed;
            top: 0;
            right: -500px;
            height: 100vh;
            width: 500px;
            z-index: 1500;
            transition: 0.2s ease;

            &--expanded {
                display: block;
                transform: translateX(-500px);
            }

            &--left {
                left: 0;
            }

            &--right {
                right: 0;
            }

            &--modeless {
                border-left: 1px solid var(--color-edge-dark);
            }
        }

        &__overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: transparent;
            z-index: 1499;
            display: none;
            background-color: rgba(0, 0, 0, 0.5);

            &--expanded {
                display: block;
            }
        }

        &__inner {
            display: flex;
            flex-direction: column;
            height: 100%;
            background-color: var(--color-surface);
            padding: var(--size-md) var(--size-lg);
            gap: var(--size-md);
            box-sizing: border-box;
        }

        &__close-button {
            display: flex;
            justify-content: flex-end;
        }

        &__header {
            display: flex;
            flex-direction: column;
            gap: var(--size-xs);
        }

        &__header__top {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        &__body {
            height: 100%;
            overflow-y: auto;
            scrollbar-width: thin;
            padding: var(--size-xs) var(--size-xs);
        }

        &__footer {
            display: flex;
            padding: var(--size-md) 0;
        }
    }
</style>
