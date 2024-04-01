<template>
  <div class="bg-white">
    <div class="flex justify-center mb-8">
      <h1 class="text-xl text-center border-b-2 border-orange pt-4 pb-2">
        Konfiguracja skrzynki e-mail
      </h1>
    </div>

    <div class="flex justify-center items-center">
      <Form
        ref="emailConfigurationForm"
        @submit="onSubmit"
        class="w-full max-w-md px-4 py-3 rounded-lg"
        :validation-schema="schema"
        :initial-values="initialValues"
      >
        <div>
          <Field name="serviceType" id="serviceType" v-slot="{ field, errors }">
            <select
              v-bind="field"
              class="w-full px-4 py-3 rounded-lg border focus:border-orange focus:outline-none"
            >
              <option disabled value="">Wybierz pocztę</option>
              <option value="gmail">gmail</option>
              <option value="outlook">outlook</option>
            </select>
            <div class="text-red-500 text-xs h-6">
              <span>{{ errors[0] }}</span>
            </div>
          </Field>
        </div>

        <div>
          <Field
            name="email"
            id="email"
            type="email"
            v-slot="{ field }"
            class="w-full px-4 py-3 rounded-lg border focus:border-orange focus:outline-none"
            placeholder="E-mail"
          />
          <div class="text-red-500 text-xs h-6">
            <ErrorMessage name="email" />
          </div>
        </div>

        <div>
          <Field
            name="password"
            id="password"
            type="password"
            v-slot="{ field }"
            class="w-full px-4 py-3 rounded-lg border focus:border-orange focus:outline-none"
            placeholder="Hasło"
          />
          <div class="text-red-500 text-xs h-6">
            <ErrorMessage name="password" />
          </div>
        </div>

        <Button
          class="block m-auto text-white"
          type="submit"
          :componentType="ComponentType.Button"
          :theme="Theme.Primary"
          :isLoading="isLoading"
        >
          Zapisz
        </Button>
      </Form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useForm, useField, Field, Form } from "vee-validate";
import * as yup from "yup";
import { Theme, ComponentType } from "@/components/Button/Button.props";

const initialValues = {
  serviceType: "",
  email: "",
  password: "",
};
// Definicja schematu walidacji
const schema = yup.object({
  serviceType: yup.string().required("Poczta jest wymagana"),
  email: yup
    .string()
    .required("E-mail jest wymagany")
    .email("E-mail jest nieprawidłowy"),
  password: yup.string().required("Hasło jest wymagane"),
});

// Inicjalizacja formularza z walidacją
const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
});

// Definicja pól formularza
const { value: serviceType } = useField("serviceType");
const { value: email } = useField("email");
const { value: password } = useField("password");

// Dostęp do globalnych instancji Nuxt, np. do $toastify
const { $toastify }: any = useNuxtApp();
const isLoading = ref(false);

const { setEmailConfiguration, getEmailConfiguration } =
  useEmailConfiguration();

const emailConfigurationForm = ref<any>(null);

const fulfillForm = async () => {
  getEmailConfiguration().then((config) => {
    if (!config) {
      return;
    }
    if (emailConfigurationForm.value) {
      emailConfigurationForm.value.setFieldValue(
        "serviceType",
        config.serviceType
      );
      emailConfigurationForm.value.setFieldValue("email", config.email);
    }
  });
};
onMounted(() => {
  fulfillForm();
});
const onSubmit = async (values: any) => {
  isLoading.value = true;
  try {
    await setEmailConfiguration(
      values.email,
      values.password,
      values.serviceType
    );
    $toastify({
      text: "Zapisano zmiany",
      backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
    }).showToast();
  } catch (error: any) {
    $toastify({
      text: error.message,
      backgroundColor: "linear-gradient(to right, #ff416c, #ff4b2b)",
    }).showToast();
  } finally {
    isLoading.value = false;
  }
};
</script>
~/store/userStore
