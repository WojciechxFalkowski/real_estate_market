<template>
  <div v-if="isFetchingFaq" class="flex justify-center h-full items-center">
    <LoadingIcon />
  </div>

  <div v-else>
    <PageTitle title="Konfiguracja FAQ" headingTag="h2" class="mt-16 mb-8" />

    <div
      v-for="(item, index) in faqCollection"
      :key="index"
      class="p-4 border rounded shadow"
      :class="`mb-${faqCollection.length - 1 === index ? '16' : '8'}`"
    >
      <div v-if="item.type === 'section'">
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
            Tytuł sekcji
          </label>

          <div class="text-red-500 text-xs min-h-4 min-w-full">
            <ErrorMessage name="title" />
          </div>
        </div>

        <div class="relative mt-4">
          <Field
            name="description"
            id="description"
            as="textarea"
            v-model="item.description"
            v-slot="{ field }"
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
      </div>

      <div v-else-if="item.type === 'list'">
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
            Tytuł sekcji
          </label>

          <div class="text-red-500 text-xs min-h-4 min-w-full">
            <ErrorMessage name="title" />
          </div>
        </div>

        <div class="relative col-span-12">
          <Field
            name="title"
            id="title"
            type="text"
            v-model="item.listTitle"
            class="block px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-orange peer"
            placeholder=""
          />
          <label
            for="title"
            class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Tytuł listy
          </label>

          <div class="text-red-500 text-xs min-h-4 min-w-full">
            <ErrorMessage name="title" />
          </div>
        </div>

        <ul class="space-y-2 my-4 col-span-12">
          <li
            v-for="(listItem, listIndex) in item.list"
            :key="listIndex"
            class="flex faqCollection-center flex-wrap items-baseline sm:space-x-2"
          >
            <div class="relative flex-grow">
              <Field
                name="title"
                id="title"
                type="text"
                :value="listItem"
                @input="updateListItem(index, listIndex, $event)"
                class="block px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-orange peer"
                placeholder=""
              />
              <label
                for="title"
                class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              >
                {{ listIndex + 1 }}. Element listy
              </label>

              <div class="text-red-500 text-xs min-h-4 min-w-full">
                <ErrorMessage name="title" />
              </div>
            </div>

            <div class="flex gap-2">
              <Button
                @click="removeListItem(index, listIndex)"
                :theme="Theme.Danger"
              >
                <TrashIcon />
              </Button>

              <Button
                @click="moveListItemUp(index, listIndex)"
                :theme="Theme.Info"
                :disabled="listIndex === 0"
              >
                ↑
              </Button>

              <Button
                v-if="item.list"
                @click="moveListItemDown(index, listIndex)"
                :theme="Theme.Info"
                :disabled="listIndex === item.list.length - 1"
              >
                ↓
              </Button>
            </div>
          </li>
        </ul>
        <Button @click="addItemToList(index)" :theme="Theme.Info">
          Dodaj element do listy
        </Button>
      </div>

      <div class="gap-2 my-4 flex flex-wrap">
        <Button :theme="Theme.Danger" @click="removeItem(index)">
          <TrashIcon />
        </Button>

        <Button
          @click="moveItemUp(index)"
          :theme="Theme.Info"
          :disabled="index === 0"
        >
          ↑
        </Button>

        <Button
          :theme="Theme.Info"
          @click="moveItemDown(index)"
          :isDisabled="index === faqCollection.length - 1"
        >
          ↓
        </Button>

        <ToggleCheckbox
          class=""
          label="Widoczność na stronie"
          :value="item.isActive"
          @change="() => toggleFaqStatus(index)"
          :isLoading="false"
        />
      </div>
    </div>

    <div class="space-x-2">
      <Button :theme="Theme.Info" @click="addSection">Dodaj sekcję</Button>
      <Button :theme="Theme.Info" @click="addList">Dodaj listę</Button>
      <Button :theme="Theme.Primary" @click="save" :isLoading="isUpdatingFaq"
        >Zapisz zmiany</Button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { Theme } from "@/components/Button/Button.props";
const { updateFaq, getFaq, faqCollection } = useFaq();
const isFetchingFaq = ref(false);

onMounted(async () => {
  isFetchingFaq.value = true;
  await getFaq({ isAuth: false, isClient: true });
  isFetchingFaq.value = false;
});

function addSection() {
  faqCollection.value.push({
    type: "section",
    title: "",
    description: "",
    isActive: true,
  });
}

function addList() {
  faqCollection.value.push({
    type: "list",
    listTitle: "",
    list: [],
    isActive: true,
  });
}

function addItemToList(index: number) {
  const element = faqCollection.value[index].list;
  if (!element) {
    return;
  }
  element.push("");
}

function updateListItem(sectionIndex: number, listIndex: number, event: Event) {
  const target = event.target as HTMLInputElement;
  const element = faqCollection.value[sectionIndex].list;
  if (!element || !target) {
    return;
  }

  element[listIndex] = target.value;
}

function removeListItem(sectionIndex: number, listIndex: number) {
  const element = faqCollection.value[sectionIndex].list;
  if (!element) {
    return;
  }
  element.splice(listIndex, 1);
}

function moveListItemUp(sectionIndex: number, listIndex: number) {
  const element = faqCollection.value[sectionIndex].list;
  if (!element) {
    return;
  }

  if (listIndex > 0) {
    const item = element.splice(listIndex, 1)[0];
    element.splice(listIndex - 1, 0, item);
  }
}

function moveListItemDown(sectionIndex: number, listIndex: number) {
  const element = faqCollection.value[sectionIndex].list;
  if (!element) {
    return;
  }

  if (listIndex < element.length - 1) {
    const item = element.splice(listIndex, 1)[0];
    element.splice(listIndex + 1, 0, item);
  }
}

function moveItemUp(index: number) {
  if (index > 0) {
    const item = faqCollection.value.splice(index, 1)[0];
    faqCollection.value.splice(index - 1, 0, item);
  }
}

function moveItemDown(index: number) {
  if (index < faqCollection.value.length - 1) {
    const item = faqCollection.value.splice(index, 1)[0];
    faqCollection.value.splice(index + 1, 0, item);
  }
}

function removeItem(index: number) {
  faqCollection.value.splice(index, 1);
}

const toggleFaqStatus = (index: number) => {
  const element = faqCollection.value[index];
  if (!element) {
    return;
  }

  element.isActive = !element.isActive;
};

const isUpdatingFaq = ref(false);
const { showToast } = useToast();

const save = async () => {
  try {
    isUpdatingFaq.value = true;
    const data = await updateFaq(faqCollection.value);
    if (!data) {
      return;
    }
    showToast(data.message);
  } catch (error) {
    if (error instanceof Error) {
      showToast(error.message, false);
    }
  } finally {
    isUpdatingFaq.value = false;
  }
};
</script>

<style></style>
