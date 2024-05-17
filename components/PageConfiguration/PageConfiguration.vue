<template>
  <div>
    <PageTitle
      title="Konfiguracja strony"
      class="mb-8"
      headingTag="h2"
    ></PageTitle>

    <LoadingIcon v-if="isFetchingPageConfiguration" class="m-auto" />

    <GenericForm
      v-else
      :fields="formConfiguration.fields"
      :initialValues="[]"
      :submitButton="{
        ...formConfiguration.submitButton,
        isLoading: isUpdatingPageConfiguration,
      }"
      :onSubmit="editPageConfiguration"
      :formClass="formConfiguration.formClass"
    />
  </div>
</template>

<script setup lang="ts">
import type { GenericFormObject } from "../GenericForm/contracts";

const props = defineProps({
  formConfiguration: {
    type: Object as PropType<GenericFormObject>,
    required: true,
  },
});

const isFetchingPageConfiguration = ref(false);
const isUpdatingPageConfiguration = ref(false);
const { showToast } = useToast();

const { getPageConfiguration, pageConfiguration, updatePageConfiguration } =
  usePageConfiguration();

onMounted(async () => {
  await fetchPageConfiguration();
});

const fetchPageConfiguration = async () => {
  try {
    isFetchingPageConfiguration.value = true;

    await getPageConfiguration({
      isAuth: true,
      isClient: true,
    });

    if (!pageConfiguration.value) {
      return;
    }

    const fieldProperties: PageConfiguration = pageConfiguration.value;

    props.formConfiguration.fields.forEach((field) => {
      const fieldId = field.id;

      if (!fieldProperties) {
        return;
      }

      const fieldValue = fieldProperties[fieldId];

      field.initialValue = fieldValue;
    });
  } catch (error) {
    showToast("Wystąpił błąd podczas pobrania danych!", false);
  } finally {
    isFetchingPageConfiguration.value = false;
  }
};

const editPageConfiguration = async (formData: any) => {
  try {
    isUpdatingPageConfiguration.value = true;

    const data = await updatePageConfiguration({
      configurationData: formData,
      isAuth: true,
      isClient: true,
    });

    if (!data?.message) {
      return;
    }
    showToast(data.message);
  } catch (error) {
  } finally {
    isUpdatingPageConfiguration.value = false;
  }
};
</script>
