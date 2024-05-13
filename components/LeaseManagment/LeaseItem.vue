<template>
  <div class="grid grid-cols-12 gap-x-2 md:items-center relative">
    <div
      class="absolute top-0 left-0 bg-green-500 rounded-full z-10 w-6 h-6 text-center text-white -translate-x-2 -translate-y-2"
    >
      {{ listIndex + 1 }}
    </div>

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

    <div
      @click="toggleAccordion"
      class="col-span-12 flex gap-5 items-center py-2 cursor-pointer transition-colors duration-200 bg-gray-50 mb-2 px-2.5"
    >
      <ArrowIcon
        :class="isOpen ? 'transform rotate-180' : ''"
        class="w-4 h-4 text-gray-800 transition-transform duration-200"
      />

      <h2 class="text-gray-700">Konfiguracja Ikony</h2>
    </div>

    <!-- Content -->
    <transition name="accordion-content">
      <div v-show="isOpen" class="overflow-hidden col-span-12">
        <!-- <slot v-if="false"> -->
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

        <div class="relative col-span-12">
          <Field
            name="desktopSize"
            id="desktopSize"
            type="text"
            v-model="item.desktopSize"
            class="block px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-orange peer"
            placeholder=""
          />
          <label
            for="desktopSize"
            class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Style ikony (desktop)
          </label>

          <div class="text-red-500 text-xs min-h-4 min-w-full">
            <ErrorMessage name="desktopSize" />
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
            Klasa ikony (zachowanie na hover)
          </label>

          <div class="text-red-500 text-xs min-h-4 min-w-full">
            <ErrorMessage name="iconClass" />
          </div>
        </div>
        <!-- </slot> -->
      </div>
    </transition>

    <div class="col-span-12">
      <div class="flex gap-x-2">
        <Button
          class="-backdrop-hue-rotate-180"
          @click="$emit('removeItem', listIndex)"
          :theme="Theme.Danger"
        >
          <TrashIcon />
        </Button>

        <Button
          class="h-10"
          @click="$emit('moveListItemUp', listIndex)"
          :theme="Theme.Info"
          :disabled="listIndex === 0"
        >
          ↑
        </Button>

        <Button
          class="h-10"
          @click="$emit('moveListItemDown', listIndex)"
          :theme="Theme.Info"
          :isDisabled="listIndex === lastIndex - 1"
        >
          ↓
        </Button>

        <ToggleCheckbox
          label="Widoczność na stronie"
          :value="item.isActive"
          @change="toggleLeaseStatus"
          :isLoading="false"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Theme } from "@/components/Button/Button.props";
import * as yup from "yup";

const props = defineProps<{
  item: LeaseItem;
  listIndex: number;
  lastIndex: number;
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
const { value: desktopSize } = useField("desktopSize");

const form = useForm({
  validationSchema: schema,
});

const validateForm = async (): Promise<boolean> => {
  const formValidation = await form.validate();
  return formValidation.valid;
};

// Rejestrowanie i wyrejestrowanie formularza przy montowaniu i demontowaniu
onMounted(() => {
  props.registerForm(validateForm);
});

onUnmounted(() => {
  props.unregisterForm(validateForm);
});

const isOpen = ref(false);

const toggleAccordion = () => {
  isOpen.value = !isOpen.value;
};

const toggleLeaseStatus = () => {
  props.item.isActive = !props.item.isActive;
};
</script>
