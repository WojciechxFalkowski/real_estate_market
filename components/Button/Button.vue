<template>
  <component
    :is="componentIs"
    v-bind="linkProperties"
    class="button py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    :class="[theme, { 'w-100': isFluid }]"
    :disabled="isDisabled || isLoading"
  >
    <slot></slot>

    <slot name="loader">
      <span v-if="isLoading" class="--loading-icon">
        <ButtonLoadingIcon name="loading" :class="{ '--loading': isLoading }" />
      </span>
    </slot>
  </component>
</template>

<script setup lang="ts">
import { ButtonProps, ComponentType } from "./Button.props";

const props = defineProps(ButtonProps);

const componentIs = computed(() => {
  if (props.componentType === ComponentType.Submit) {
    return "button";
  }
  return props.componentType;
});

const linkProperties = computed(() => {
  if (props.componentType === ComponentType.ExternalLink) {
    return { href: props.link };
  }
  if (props.componentType === ComponentType.InternalLink) {
    return { to: props.link };
  }
  if (props.componentType === ComponentType.Button) {
    return { type: "button" };
  }
  if (props.componentType === ComponentType.Submit) {
    return { type: "submit" };
  }
  return {};
});
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
        transform: rotate(0deg);
      }

      to {
        transform: rotate(360deg);
      }
    }
  }

  &.btn-primary {
    background-color: #ffc444;
    color: black;
  }

  &.btn-danger {
    background-color: red;
    color: white;
  }

  &.btn-outline-dark {
    background-color: unset;
  }

  &.btn-grey {
    background-color: grey;
    color: white;
  }

  &.btn-info {
    background-color: #007bff;
    color: white;
  }

  &.button:disabled {
    background-color: #ccc;
    color: white;
  }
}
</style>
