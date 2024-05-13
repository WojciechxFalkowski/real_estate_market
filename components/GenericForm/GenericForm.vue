<template>
  <Form @submit="onSubmit" :validation-schema="schema" :class="formClass">
    <div
      v-for="field in fields"
      :key="field.id"
      class="relative"
      :class="field.class"
    >
      <div v-if="field.as === 'select'" class="relative" :class="field.class">
        <Field
          :as="field.as"
          :name="field.id"
          :id="field.id"
          v-model="formData[field.id]"
          :placeholder="''"
          class="block px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-orange peer"
        >
          <option
            v-for="option in field.options"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </Field>

        <label
          :for="field.id"
          class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
        >
          {{ field.name }}
        </label>

        <div class="text-red-500 text-xs min-h-4 min-w-full">
          <ErrorMessage :name="field.id" />
        </div>
      </div>

      <div v-else class="relative">
        <Field
          :as="field.as"
          :name="field.id"
          :id="field.id"
          :type="field.type"
          v-slot="{ field: slotField, errors }"
          class="block px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-orange peer"
          v-model="formData[field.id]"
          :placeholder="''"
        />

        <label
          :for="field.id"
          class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
        >
          {{ field.name }}
        </label>

        <div class="text-red-500 text-xs min-h-4 min-w-full">
          <ErrorMessage :name="field.id" />
        </div>
      </div>
    </div>

    <Button
      class="block m-auto"
      :class="submitButton.class"
      type="submit"
      :componentType="submitButton.componentType"
      :theme="submitButton.theme"
      :disabled="isLoading"
      :isLoading="isLoading"
    >
      {{ submitButton.name }}
    </Button>
  </Form>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import * as yup from "yup";
import type { FormConfig } from "./contracts";

const props = defineProps<FormConfig>();

const { fields, submitButton, onSubmit } = props;

const isLoading = computed(() => {
  return props.submitButton.isLoading;
});

const schema = yup.object(
  fields.reduce((acc, field) => {
    acc[field.id] = field.validation;
    return acc;
  }, {} as Record<string, yup.StringSchema<string | undefined>>)
);

const formData = reactive(
  fields.reduce((acc, field) => {
    acc[field.id] = field.initialValue ?? "";
    return acc;
  }, {} as Record<string, string | number>)
);

const initialValues = computed(() => {
  return props.initialValues;
});

watch(initialValues, () => {
  initialValues.value.forEach((field) => {
    formData[field.id] = field.initialValue;
  });
});

const handleSubmit = () => {
  onSubmit(formData);
};
</script>
