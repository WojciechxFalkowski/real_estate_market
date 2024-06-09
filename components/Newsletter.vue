<template>
  <div class="flex flex-col items-center space-y-2">
    <span class="text-sm uppercase tracking-widest text-gray-500"
      >Zapisz się do newslettera</span
    >
    <h2 class="text-2xl font-light uppercase tracking-wide text-gray-800">
      Bądź na bieżąco
    </h2>
  </div>

  <div class="flex justify-center items-center bg-white mt-8">
    <Form
      @submit="onSubmit"
      class="w-full max-w-lg"
      :validation-schema="schema"
      :initial-values="initialValues"
    >
      <div
        class="flex border-0 border-b-2 border-black focus:border-orange"
      >
        <div class="relative grow">
          <Field
            name="email"
            id="email"
            type="email"
            v-slot="{ field }"
            class="block pe-2.5 pb-2.5 pt-5 w-full text-sm text-black appearance-none peer focus:outline-none focus:ring-0"
            placeholder=""
          />
          <label
            for="email"
            class="absolute text-sm text-black duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
          >
            Twój e-mail
          </label>
        </div>

        <Button
          class="block m-auto uppercase"
          type="submit"
          :componentType="ComponentType.Button"
          :theme="Theme.Outline"
          :isLoading="isLoading"
        >
          Zapisz
        </Button>
      </div>

      <div class="text-red-500 text-xs min-h-4 min-w-full">
        <ErrorMessage name="email" />
      </div>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { useForm, useField, Field, Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { Theme, ComponentType } from "@/components/Button/Button.props";

const { addEmailToNewsletter } = useNewsletter();

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
const { showToast } = useToast();

const isLoading = ref(false);

const onSubmit = async (values: any) => {
  isLoading.value = true;
  const email = values.email;
  try {
    const response = await addEmailToNewsletter(email);
    if (!response?.message) {
      return;
    }
    showToast(response?.message);
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      showToast(error.message, false);
    }
  } finally {
    isLoading.value = false;
  }
};
</script>

<style lang="scss">
#email {
  &:-webkit-autofill {
    background-color: transparent !important;
    color: inherit !important;
  }
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
  }
}
</style>
