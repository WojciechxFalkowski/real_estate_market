<template>
  <div class="flex justify-center mb-8">
    <h1 class="text-xl text-center border-b-2 border-orange pb-2">
      Zapisz się na nasz newsletter
    </h1>
  </div>

  <div class="flex justify-center items-center bg-white">
    <Form
      @submit="onSubmit"
      class="w-full max-w-lg space-y-4"
      :validation-schema="schema"
      :initial-values="initialValues"
    >
      <div class="relative">
        <Field
          name="email"
          id="email"
          type="email"
          v-slot="{ field }"
          class="block px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-orange peer"
          placeholder=""
        />
        <label
          for="email"
          class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
        >
          E-mail
        </label>

        <div class="text-red-500 text-xs min-h-4 min-w-full">
          <ErrorMessage name="email" />
        </div>
      </div>

      <Button
        class="block m-auto"
        type="submit"
        :componentType="ComponentType.Button"
        :theme="Theme.Primary"
        :isLoading="isLoading"
      >
        Zapisz się
      </Button>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { useForm, useField, Field, Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { Theme, ComponentType } from "@/components/Button/Button.props";

const initialValues = {
  email: "",
};

const schema = yup.object({
  email: yup
    .string()
    .required("E-mail jest wymagany")
    .email("E-mail jest nieprawidłowy"),
});

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
});

const { value: email } = useField("email");

const isLoading = ref(false);

const onSubmit = async (values: any) => {
  isLoading.value = true;
  // Tutaj można dodać logikę wysyłania informacji do backendu
  alert(
    `Dziękujemy za zapisanie się do newslettera! Twoje dane: ${values.email}`
  );
  isLoading.value = false;
};
</script>

<style>
/* Styl może pozostać pusty lub można dodać dodatkowe style specyficzne dla tego komponentu */
</style>
