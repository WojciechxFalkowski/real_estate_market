<template>
  <div class="flex justify-center mb-8">
    <h1 class="text-xl text-center border-b-2 border-orange pb-2">
      Rejestracja
    </h1>
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

      <div>
        <Field
          name="repeatPassword"
          id="repeatPassword"
          type="password"
          v-slot="{ field }"
          class="w-full px-4 py-3 rounded-lg bg-gray-50 border focus:border-orange focus:bg-white focus:outline-none"
          placeholder="Hasło"
        />
        <div class="text-red-500 text-xs h-6">
          <ErrorMessage name="repeatPassword" />
        </div>
      </div>

      <Button
        class="block m-auto"
        type="submit"
        :componentType="ComponentType.Button"
        :theme="Theme.Primary"
        :isLoading="isLoading"
      >
        Zarejestruj się
      </Button>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { useForm, useField, Field, Form } from "vee-validate";
import * as yup from "yup";
import { Theme, ComponentType } from "@/components/Button/Button.props";
import SignIn from "./SignIn.vue";
import { userStore } from "~/store/userStore";

const { setUser, pathBeforeRedirect } = userStore();

const initialValues = {
  email: "",
  password: "",
  repeatPassword: "",
};

const schema = yup.object({
  email: yup
    .string()
    .required("E-mail jest wymagany")
    .email("E-mail jest nieprawidłowy"),
  password: yup
    .string()
    .min(5, "Hasło musi mieć przynajmniej 5 znaków")
    .required("Hasło jest wymagane"),
  repeatPassword: yup
    .string()
    .required("Hasło jest wymagane")
    .oneOf([yup.ref("password")], "Hasła nie są takie same"),
});

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
});

const { value: email } = useField("email");
const { value: password } = useField("password");
const { value: repeatPassword } = useField("repeat-password");
const { $toastify }: any = useNuxtApp();
const isLoading = ref(false);

const { signUp, signIn } = useAuth();
const router = useRouter();
const navigateToCms = () => {
  router.push({ name: "cms" });
};
const onSubmit = async (values: any) => {
  isLoading.value = true;
  console.log(values);

  try {
    await signUp(values.email, values.password);
    await signIn(values.email, values.password);
    await setUser();
    if (pathBeforeRedirect) {
      router.push(pathBeforeRedirect);
    }
    navigateToCms();
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

<style scoped>
/* Dodatkowe style, jeśli są potrzebne */
</style>
