<template>
  <div v-if="isFetchingFaq" class="flex justify-center h-full items-center">
    <LoadingIcon />
  </div>

  <div v-else>
    <div
      v-for="(item, index) in faqCollection"
      :key="index"
      class="p-4 border rounded shadow"
      :class="`mb-${faqCollection.length - 1 === index ? '16' : '8'}`"
    >
      <div v-if="item.type === 'section'">
        <!-- <input
          
          placeholder="Tytuł sekcji"
          class="p-2 mb-2 w-full border"
        /> -->

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

        <!-- <textarea
          v-model="item.description"
          placeholder="Opis"
          class="p-2 w-full border min-h-64 md:min-h-32"
        ></textarea> -->
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
        <!-- <input
          v-model="item.title"
          placeholder="Tytuł sekcji"
          class="p-2 mb-2 w-full border"
        /> -->
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
        <!-- <input
          v-model="item.listTitle"
          placeholder="Tytuł listy"
          class="p-2 w-full border"
        /> -->
        <ul class="space-y-2 my-4 col-span-12">
          <!-- flex-wrap -->
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
            <!-- <input
              :value="listItem"
              @input="updateListItem(index, listIndex, $event)"
              class="p-2 w-full border"
            /> -->
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

// const faqCollection = ref<FaqElement[]>([
//   {
//     type: "list",
//     listTitle: "Co wchodzi w zakres usługi zarządzania najmem?",
//     list: [
//       "przygotowanie nieruchomości do wynajmu: organizacja sprzątania, ewentualny zakup dodatkowego wyposażenia.",
//       "organizacja kompleksowego umeblowania lokalu",
//       "podpisywanie umów najmu zgodnie z uprzednio zaakceptowanymi przez Właściciela warunkami",
//       "przekazanie nieruchomości w imieniu Właściciela",
//       "sporządzanie protokołów zdawczych i odbiorczych, również w formie zdjęciowej",
//       "przeprowadzanie przynajmniej co półrocznych inspekcji lokalu",
//       "organizowanie i nadzorowanie napraw, obciążających najemcę lub właściciela, w zależności o przyczyny usterki",
//       "pobieranie czynszu oraz regulowanie płatności związanych z lokalem (opłaty eksploatacyjne, prąd, gaz – zgodnie z zapisami umowy najmu)",
//       "rozliczanie zużycia mediów przez Najemcę",
//       "raportowanie stanu rozliczeń między Najemcą a Właścicielem",
//       "renegocjacja umów pod koniec okresu najmu",
//       "rozliczanie depozytu",
//     ],
//   },
//   {
//     type: "section",
//     title: "Ile kosztuje zarządzanie najmem?",
//     description:
//       "Koszt usługi szacowany jest indywidualnie, po zapoznaniu się z nieruchomością oraz ustaleniu zakresu działań jakim ma ona być objęta.",
//   },
//   {
//     type: "section",
//     title: "Jak możemy załatwić formalności?",
//     description:
//       "Naszą dewizą jest budowanie zaufania i długofalowej relacji z klientem, powierzającym nam swój majątek. W związku z tym proponujemy niezobowiązujące spotkanie, w idealnym wariancie połączone z wizytą w nieruchomości, która ma być otoczona opieką. Zależy nam na poznaniu Państwa potrzeb, dlatego to rozmowa jest dla nas podstawą do nawiązania potencjalnej współpracy. Jeżeli nasz model działania wzbudzi zaufanie, wówczas prezentujemy wzory dokumentów niezbędnych do objęcia mieszkania usługą zarządzania. Po zapoznaniu się z nimi i złożeniu podpisów do lokalu przydzielany zostaje indywidualny opiekun, który od tej pory kontaktuje się z właścicielem we wszystkich sprawach związanych z daną nieruchomością.",
//   },
//   {
//     type: "section",
//     title: "Na jaki czas zawierana jest umowa?",
//     description:
//       "Umowa zawierana jest standardowo na czas nieokreślony, z 3-miesięcznym wypowiedzeniem.",
//   },
//   {
//     type: "section",
//     title: "Czy doradzacie w zakresie zakupu nieruchomości?",
//     description:
//       "Tak, oferujemy naszą pomoc także w zakresie doradztwa inwestycyjnego w obszarze nieruchomości. Bazując na bogatym portfolio, budowanym przez ponad 10 lat oraz realnych stopach zwrotu uzyskiwanych z najmu, wskazujemy najtrafniejsze kierunki inwestycyjne dla Państwa środków.",
//   },
//   {
//     type: "section",
//     title: "Czy pomagacie w znalezieniu najemcy?",
//     description:
//       "Tak, na podstawie osobnej umowy, świadczymy usługę pośrednictwa w wynajmie. Nie jest ona jednak warunkiem koniecznym, abyśmy mogli przejąć mieszkanie w zarządzanie – nasi klienci mają w tej materii swobodę działania.",
//   },
//   {
//     type: "section",
//     title: "Jak często odwiedzane są mieszkania znajdujące się pod opieką?",
//     description:
//       "Mieszkania znajdujące się pod nasza opieką odwiedzamy minimum raz na 6 miesięcy z takiej wizyty sporządzany jest oficjalny protokół, który następnie wraz z komentarzem jest przesyłany do właściciela. dzięki czemu na bieżąco monitorujemy czy są jakieś zniszczenia i czy lokator dba o mieszkanie.",
//   },
//   {
//     type: "section",
//     title:
//       "Jak staracie się zabezpieczyć nieruchomość przed nieuczciwym najemcą?",
//     description:
//       "Nie wydajemy mieszkania bez otrzymanej kaucji. Przeprowadzamy weryfikację najemcy nie tylko na podstawie ogólnodostępnych źródeł, ale także poprzez kontakt z pośrednikami w obrocie nieruchomościami. Znamy od podszewki procedury związane z najmem okazjonalnym i rekomendujemy ich wdrożenie właścicielom, a następnie przeprowadzamy ich przez ten proces.",
//   },
//   {
//     type: "section",
//     title: "Czy zajmują się Państwo najmem krótkoterminowym?",
//     description:
//       "W tym momencie pod naszą pieczą znajdują się mieszkania przeznaczone na najem długoterminowy, jednakże współpracujemy z podmiotami oferującymi wsparcie w zakresie najmu krótkoterminowego.",
//   },
// ]);

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
  const target = event.target as HTMLInputElement; // Type casting
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
