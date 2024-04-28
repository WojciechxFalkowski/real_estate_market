<template>
  <div class="flex justify-center mb-8">
    <h1 class="text-xl text-center border-b-2 border-orange pb-2">
      Skontaktuj się z nami
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
          class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
        >
          E-mail
        </label>

        <div class="text-red-500 text-xs min-h-4 min-w-full">
          <ErrorMessage name="email" />
        </div>
      </div>

      <div class="relative mt-4">
        <Field
          name="phone"
          id="phone"
          type="tel"
          v-slot="{ field }"
          class="block px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-orange peer"
          placeholder=""
        />
        <label
          for="phone"
          class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
        >
          Numer telefonu
        </label>

        <div class="text-red-500 text-xs min-h-4 min-w-full">
          <ErrorMessage name="phone" />
        </div>
      </div>

      <div class="relative mt-4">
        <Field
          name="message"
          id="message"
          as="textarea"
          v-slot="{ field }"
          class="block px-2.5 pb-2.5 pt-5 w-full h-32 text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-orange peer"
          placeholder=""
        />
        <label
          for="message"
          class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
        >
          Wiadomość
        </label>

        <div class="text-red-500 text-xs min-h-4 min-w-full">
          <ErrorMessage name="message" />
        </div>
      </div>

      <!-- <button
        type="submit"
        class="bg-orange text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        :disabled="isSubmitting"
      >
        <span v-if="!isLoading">Wyślij</span>
        <span v-if="isLoading" class="--loading-icon">
          <LoadingIcon name="loading" :class="{ '--loading': isLoading }" />
        </span>
      </button> -->

      <Button
        class="block m-auto"
        type="submit"
        :componentType="ComponentType.Button"
        :theme="Theme.Primary"
        :isLoading="isLoading"
      >
        Wyślij
      </Button>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { useForm, useField, Field, Form } from "vee-validate";
import * as yup from "yup";
import { useNuxtApp } from "#app";
// import LoadingIcon from "@/components/icons/LoadingIcon.vue";
import { Theme, ComponentType } from "@/components/Button/Button.props";
const initialValues = {
  email: "",
  phone: "",
  message: "",
};
// Definicja schematu walidacji
const schema = yup.object({
  email: yup
    .string()
    .required("E-mail jest wymagany")
    .email("E-mail jest nieprawidłowy"),
  phone: yup.string().required("Numer telefonu jest wymagany"),
  message: yup
    .string()
    .required("Wiadomość jest wymagana")
    .min(10, "Wiadomość musi zawierać przynajmniej 10 znaków"),
});

// Inicjalizacja formularza z walidacją
const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
});

// Definicja pól formularza
const { value: email } = useField("email");
const { value: phone } = useField("phone");
const { value: message } = useField("message");

const isLoading = ref(false);

const { sendEmail } = useEmailConfiguration();

const { showToast } = useToast();

const onSubmit = async (values: any) => {
  isLoading.value = true;
  try {
    await sendEmail(values.email, values.phone, values.message);
    showToast("Wiadomość została wysłana!");
  } catch (e) {
    showToast("Wystąpił błąd podczas wysyłania wiadomości!", false);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style>
/* Dodatkowe style, jeśli są potrzebne */
</style>
