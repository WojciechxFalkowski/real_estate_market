<template>
  <div>
    <!-- <label for="visitorIdInput">ID Użytkownika:</label>
    <input id="visitorIdInput" v-model="visitorId" placeholder="ID" /> -->
    <PageTitle
      :title="'Wyłączeni z analityki użytkownicy'"
      class="mt-8 lg:mt-16 mb-4"
      headingTag="h2"
    />

    <GenericForm
      :fields="excludeVisitorsFormConfiguration.fields"
      :initialValues="[]"
      :submitButton="{
        ...excludeVisitorsFormConfiguration.submitButton,
        isLoading: isLoading,
      }"
      :onSubmit="addVisitor"
      :formClass="excludeVisitorsFormConfiguration.formClass"
    />

    <div class="mt-8" v-if="excludedVisitors.length > 0">
      <ul>
        <li v-for="visitor in excludedVisitors" :key="visitor">
          <Button
            class="me-2"
            :theme="Theme.Danger"
            @click="removeVisitor(visitor)"
            >Remove</Button
          >
          {{ visitor }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Theme } from "@/components/Button/Button.props";
import { excludeVisitorsFormConfiguration } from "./config";
const props = defineProps<{ excludedVisitors: string[] }>();
const emit = defineEmits(["addExcludedVisitor", "removeExcludedVisitor"]);
const isLoading = ref(false);

const addVisitor = (formData: { visitorId: string }) => {
  const { visitorId } = formData;
  if (visitorId && !props.excludedVisitors.includes(visitorId)) {
    emit("addExcludedVisitor", visitorId);
  }
};

const removeVisitor = (visitor: string) => {
  emit("removeExcludedVisitor", visitor);
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
}
</style>
