<template>
  <div class="flex justify-center mb-8">
    <h1 class="text-xl text-center border-b-2 border-orange pb-2">Logowanie</h1>
  </div>

  <div class="flex justify-center items-center bg-white">
    <Form
      @submit="onSubmit"
      class="w-full max-w-md px-4 py-3 bg-white rounded-lg"
      :validation-schema="schema"
      :initial-values="initialValues"
    >
      <div>
        <Field
          name="email"
          id="email"
          type="email"
          v-slot="{ field }"
          class="w-full px-4 py-3 rounded-lg bg-gray-50 border focus:border-orange focus:bg-white focus:outline-none"
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
          class="w-full px-4 py-3 rounded-lg bg-gray-50 border focus:border-orange focus:bg-white focus:outline-none"
          placeholder="Hasło"
        />
        <div class="text-red-500 text-xs h-6">
          <ErrorMessage name="password" />
        </div>
      </div>

      <Button
        class="block m-auto"
        type="submit"
        :componentType="ComponentType.Button"
        :theme="Theme.Primary"
        :isLoading="isLoading"
      >
        Zaloguj się
      </Button>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { useForm, useField, Field, Form } from "vee-validate";
import * as yup from "yup";
import { Theme, ComponentType } from "@/components/Button/Button.props";
import { userStore } from "~/store/userStore";
const { setUser, pathBeforeRedirect } = userStore();

const initialValues = {
  email: "",
  password: "",
};
// Definicja schematu walidacji
const schema = yup.object({
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
const { value: email } = useField("email");
const { value: password } = useField("password");

// Dostęp do globalnych instancji Nuxt, np. do $toastify
const { $toastify }: any = useNuxtApp();
const isLoading = ref(false);

const { signIn } = useAuth();
const router = useRouter();
const navigateToCms = () => {
  router.push({ name: "cms" });
};

const { showToast } = useToast();

// Funkcja obsługująca wysyłanie formularza
const onSubmit = async (values: any) => {
  isLoading.value = true;
  console.log(values);
  try {
    await signIn(values.email, values.password);
    await setUser();
    if (pathBeforeRedirect) {
      router.push(pathBeforeRedirect);
    }
    navigateToCms();
  } catch (error: any) {
    showToast(error.message, false);
  } finally {
    isLoading.value = false;
  }
};
</script>
