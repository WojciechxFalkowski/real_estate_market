<template>
  <div v-if="isFetchingLeases" class="flex justify-center h-full items-center">
    <LoadingIcon />
  </div>

  <div v-else class="icon-manager space-y-4">
    <div v-for="(item, index) in leaseItems" :key="item.id" class="mb-2">
      <LeaseItem
        :item="item"
        @removeItem="removeItem"
        @moveListItemUp="moveLeaseItemUp"
        @moveListItemDown="moveLeaseItemDown"
        :listIndex="index"
        class="p-2 border rounded shadow mb-8"
        :registerForm="registerForm"
        :unregisterForm="unregisterForm"
        :lastIndex="leaseItems.length"
      />
    </div>

    <Button @click="addItem" class="rounded me-2"> Dodaj element </Button>

    <Button @click="updateItems" :isLoading="isLoadingLease"> Zapisz </Button>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import LeaseItem from "./LeaseItem.vue";

const {
  leaseItems,
  fetchLeaseItems,
  addLeaseItem,
  updateLeaseItems,
  removeLeaseItem,
  moveLeaseItemUp,
  moveLeaseItemDown,
  isLoadingLease,
} = useLeaseManager();

const { showToast } = useToast();

const isFetchingLeases = ref(false);

const leaseItemForms = ref<(() => Promise<boolean>)[]>([]);

const registerForm = (formSubmit: () => Promise<boolean>) => {
  leaseItemForms.value.push(formSubmit);
};

onMounted(async () => {
  isFetchingLeases.value = true;
  await fetchLeaseItems({ isAuth: true, isClient: true });
  isFetchingLeases.value = false;
});

const addItem = () => {
  addLeaseItem({
    title: "",
    description: "",
    icon: "",
    classIcon: "",
    desktopSize: 40,
    isActive: false,
  });
};

const updateItems = async () => {
  const validationResults = await Promise.all(
    leaseItemForms.value.map((formSubmit) => formSubmit())
  );

  const allValid = validationResults.every((result) => {
    return result === true;
  });

  if (allValid) {
    await updateLeaseItems(leaseItems.value);
  } else {
    showToast("Niektóre formularze zawierają błędy.", false);
  }
};

const removeItem = (index: number) => {
  const id = leaseItems.value[index].id;
  if (id) {
    removeLeaseItem(id);
  }
};

const unregisterForm = (formSubmit: () => Promise<boolean>) => {
  const index = leaseItemForms.value.indexOf(formSubmit);
  if (index !== -1) {
    leaseItemForms.value.splice(index, 1);
  }
};
</script>
