<template>
    <component :is="componentIs" v-bind="linkProperties" class="button bg-orange py-2 px-4 rounded focus:outline-none focus:shadow-outline" :class="[theme, { 'w-100': isFluid }]"
        :disabled="isDisabled || isLoading">
        <slot></slot>

        <slot name="loader">
            <span v-if="isLoading" class="--loading-icon">
                <LoadingIcon name="loading" :class="{ '--loading': isLoading }" />
            </span>
        </slot>
    </component>
</template>

<script setup lang="ts">
import { ButtonProps, ComponentType } from './Button.props';
import LoadingIcon from './partials/LoadingIcon.vue';

const props = defineProps(ButtonProps)
const { theme, isDisabled, componentType, link } = props

const componentIs = computed(() => {
    if (componentType === ComponentType.Submit) {
        return 'button'
    }
    return componentType
})

const linkProperties = computed(() => {
    if (componentType === ComponentType.ExternalLink) {
        return { href: link }
    }
    if (componentType === ComponentType.InternalLink) {
        return { to: link }
    }
    if (componentType === ComponentType.Button) {
        return { type: 'button' }
    }
    if (componentType === ComponentType.Submit) {
        return { type: 'submit' }
    }
    return {}
})
</script>

<style lang="scss">
.button {
    position: relative;

    & .--loading-icon {
        position: absolute;
        top: -1px;
        left: -1px;
        right: -1px;
        bottom: -1px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(255, 255, 255, 0.8);

        & svg {
            width: 20px;
            height: 20px;
            animation: loading-animation 1s linear infinite;
        }

        @keyframes loading-animation {
            from {
                transform: rotate(0deg)
            }

            to {
                transform: rotate(360deg)
            }
        }
    }
}
</style>