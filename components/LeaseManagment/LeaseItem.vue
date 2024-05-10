<template>
  <div class="grid grid-cols-12 gap-x-2 md:items-center">
    <div class="relative col-span-12">
      <Field
        name="title"
        id="title"
        type="text"
        v-model="item.title"
        class="block px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-orange peer"
        placeholder=""
      />
      <label
        for="title"
        class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
      >
        Tytuł
      </label>

      <div class="text-red-500 text-xs min-h-4 min-w-full">
        <ErrorMessage name="title" />
      </div>
    </div>

    <div class="relative mt-4 col-span-12">
      <Field
        name="description"
        id="description"
        as="textarea"
        v-model="item.description"
        class="block px-2.5 pb-2.5 pt-5 w-full h-32 text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-orange peer"
        placeholder=""
      />
      <label
        for="description"
        class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
      >
        Opis
      </label>

      <div class="text-red-500 text-xs min-h-4 min-w-full">
        <ErrorMessage name="description" />
      </div>
    </div>

    <div class="relative mt-4 col-span-12">
      <Field
        name="svgIcon"
        id="svgIcon"
        as="textarea"
        v-model="item.icon"
        class="block px-2.5 pb-2.5 pt-5 w-full h-32 text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-orange peer"
        placeholder=""
      />
      <label
        for="svgIcon"
        class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
      >
        Ikona (SVG)
      </label>

      <div class="text-red-500 text-xs min-h-4 min-w-full">
        <ErrorMessage name="svgIcon" />
      </div>
    </div>

    <div class="relative col-span-12 mt-4 md:col-span-6">
      <Field
        name="iconClass"
        id="iconClass"
        as="select"
        v-model="item.classIcon"
        :placeholder="''"
        class="block px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-orange peer"
      >
        <option
          v-for="classIconOption in classIconOptions"
          :key="classIconOption.key"
          :value="classIconOption.value"
        >
          {{ classIconOption.key }}
        </option>
      </Field>

      <label
        for="iconClass"
        class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
      >
        Klasa ikony
      </label>

      <div class="text-red-500 text-xs min-h-4 min-w-full">
        <ErrorMessage name="iconClass" />
      </div>
    </div>

    <Button
      class="col-span-2 md:col-span-1 h-10"
      @click="$emit('removeItem', listIndex)"
      :theme="Theme.Danger"
    >
      <TrashIcon />
    </Button>

    <Button
      class="col-span-2 md:col-span-1 h-10"
      @click="$emit('moveListItemUp', listIndex)"
      :theme="Theme.Info"
    >
      ↑
    </Button>

    <Button
      class="col-span-2 md:col-span-1 h-10"
      @click="$emit('moveListItemDown', listIndex)"
      :theme="Theme.Info"
    >
      ↓
    </Button>
  </div>
</template>

<script setup lang="ts">
import type { LeaseItemI } from "./contracts";
import { Theme } from "@/components/Button/Button.props";
import * as yup from "yup";

const props = defineProps<{
  item: LeaseItemI;
  listIndex: number;
  registerForm: (formSubmit: () => Promise<boolean>) => void;
  unregisterForm: (formSubmit: () => Promise<boolean>) => void;
}>();

const emit = defineEmits<{
  (event: "removeItem", listIndex: number): void;
  (event: "moveListItemUp", listIndex: number): void;
  (event: "moveListItemDown", listIndex: number): void;
}>();

const classIconOptions = [
  { key: "fill", value: "--fill-white" },
  {
    key: "stroke",
    value: "--stroke-white",
  },
];

const schema = yup.object({
  title: yup.string().required("Tytuł jest wymagany"),
  description: yup.string().required("Opis jest wymagany"),
  svgIcon: yup.string().required("Ikona jest wymagana"),
  // classIcon: yup.string().required("Klasa ikony jest wymagana"),
});

const { value: title } = useField("title");
const { value: description } = useField("description");
const { value: svgIcon } = useField("svgIcon");
const { value: classIcon } = useField("classIcon");

// const { handleSubmit, isSubmitting } = useForm({
//   validationSchema: schema,
// });

const localItem = ref({ ...props.item });
if (!localItem.value.classIcon) {
  localItem.value.classIcon = "--fill-white";
}

const form = useForm({
  validationSchema: schema,
  initialValues: {
    classIcon: null,
  },
});

const validateForm = async (): Promise<boolean> => {
  const formValidation = await form.validate();
  console.log("formValidation");
  console.log(formValidation);
  return formValidation.valid;
};

// Rejestrowanie i wyrejestrowanie formularza przy montowaniu i demontowaniu
onMounted(() => {
  props.registerForm(validateForm);
});

onUnmounted(() => {
  props.unregisterForm(validateForm);
});
</script>
