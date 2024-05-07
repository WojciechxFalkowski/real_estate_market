<template>
  <Button
    :componentType="ComponentType.Button"
    :theme="Theme.Danger"
    :isLoading="isLoading"
    @click="confirmDelete"
  >
    Usuń mieszkanie
  </Button>

  <transition
    name="fade"
    @before-enter="blockScroll"
    @after-leave="allowScroll"
  >
    <div
      v-if="showConfirm"
      class="fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300"
    >
      <div class="bg-white rounded shadow-lg p-4 text-center z-10">
        <p>Czy na pewno chcesz usunąć mieszkanie?</p>
        <div class="mt-4 flex justify-center space-x-4">
          <Button :theme="Theme.Danger" @click="deleteFlatHandler">
            Tak
          </Button>
          <Button :theme="Theme.Grey" @click="cancel"> Nie </Button>
        </div>
      </div>

      <div class="fixed inset-0 bg-black opacity-50"></div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Theme, ComponentType } from "@/components/Button/Button.props";
const props = defineProps({
  flatUrl: {
    type: undefined as unknown as PropType<string | undefined>,
    required: true,
  },
});

const { deleteFlat } = useFlat();

const isLoading = ref(false);
const showConfirm = ref(false);
const { showToast } = useToast();
const router = useRouter();

function confirmDelete() {
  showConfirm.value = true;
}

const goBack = () => {
  router.replace({ name: "cms-mieszkania" });
};

const deleteFlatHandler = async () => {
  if (!props.flatUrl) {
    return;
  }
  try {
    isLoading.value = true;
    showConfirm.value = false;

    const response = await deleteFlat(props.flatUrl);

    if (!response?.message) {
      return;
    }

    showToast(response.message);
    goBack();
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      showToast(error.message, false);
    }
  } finally {
    isLoading.value = false;
  }
};

function cancel() {
  showConfirm.value = false;
}

function blockScroll() {
  const scrollbarWidth =
    window.innerWidth - document.documentElement.clientWidth;
  document.body.style.overflow = "hidden";
  document.body.style.paddingRight = `${scrollbarWidth}px`;
}

function allowScroll() {
  document.body.style.overflow = "";
  document.body.style.paddingRight = "";
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 300ms;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
