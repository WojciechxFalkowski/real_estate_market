<template>
  <PageTitle :title="pageTitle" class="mb-8" />

  <LoadingIcon v-if="isFetchingTeamMember" />

  <GenericForm
    :fields="manageTeamMemberConfiguration.fields"
    :initialValues="initialValues"
    :submitButton="{
      ...manageTeamMemberConfiguration.submitButton,
      isLoading: isUpdatingTeamMember,
    }"
    :onSubmit="editTeamMember"
    :formClass="manageTeamMemberConfiguration.formClass"
  >
    <template v-slot:underFields>
      <label
        for="dropzone-file"
        class="col-span-12 lg:col-span-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 max-h-96"
      >
        <div class="flex flex-col items-center justify-center pt-5 pb-6 h-full">
          <svg
            class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span class="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p class="text-xs text-gray-500 dark:text-gray-400">
            SVG, PNG, JPG or GIF
          </p>
        </div>

        <input
          id="dropzone-file"
          type="file"
          class="hidden"
          @change="handleFiles"
        />
      </label>

      <div class="col-span-12 lg:col-span-6">
        <div class="border rounded-lg h-96">
          <div
            v-if="image && image.src"
            class="bg-cover rounded-lg shadow-md relative h-full"
            :style="{ backgroundImage: `url(${image.src})` }"
          ></div>
        </div>

        <div class="text-red-500 text-xs min-h-4 min-w-full">
          <span v-show="isImageError">Pole jest wymagane </span>
        </div>
      </div>

      <Button
        v-if="!isNewTeamMemberPage"
        class="col-span-12 m-auto"
        @click="handleDeleteTeamMember"
        :theme="Theme.Danger"
        :isLoading="isDeletingTeamMember"
      >
        <TrashIcon />
      </Button>
    </template>
  </GenericForm>
</template>

<script setup lang="ts">
import type { ImageI, SaveTeamMemberForm } from "~/composables/useTeamMember";
import {
  HOME_ROUTE,
  NEW_TEAM_MEMBER_ROUTE,
  TEAM_MEMBERS_ROUTE,
  TEAM_MEMBER_ROUTE,
} from "../cms/homeConfiguration";
import { manageTeamMemberConfiguration } from "./config";
import { Theme } from "@/components/Button/Button.props";

const route = useRoute();
const routeId = route.params.id;
const isFetchingTeamMember = ref(true);
const isDeletingTeamMember = ref(false);

const isNewTeamMemberPage = computed(() => {
  return routeId === NEW_TEAM_MEMBER_ROUTE;
});

const routeUserId = computed(() => {
  if (Array.isArray(routeId) || isNewTeamMemberPage.value) {
    return null;
  }
  return routeId;
});

const pageTitle = computed(() => {
  const fullName = `${teamMember.value?.firstName} ${teamMember.value?.lastName}`;
  return isNewTeamMemberPage.value ? "Nowa osoba" : fullName;
});

const {
  teamMember,
  getTeamMember,
  saveTeamMember,
  createTeamMember,
  deleteTeamMember,
} = useTeamMember();

onMounted(async () => {
  if (isNewTeamMemberPage.value || !routeUserId.value) {
    isFetchingTeamMember.value = false;

    return;
  }

  isFetchingTeamMember.value = true;
  await getTeamMember({
    userId: Number(routeUserId.value),
    isAuth: true,
    isClient: true,
  });

  isFetchingTeamMember.value = false;

  updateImage();
});

const isUpdatingTeamMember = ref(false);
const isImageError = ref(false);
const { showToast } = useToast();

const updateImage = () => {
  if (teamMember.value?.image) {
    image.value = {
      src: teamMember.value?.image.url,
      file: null,
      publicId: teamMember.value.id,
    };
  }
};

const editTeamMember = async (formData: SaveTeamMemberForm) => {
  if (isNewTeamMemberPage.value) {
    createUser(formData);
  } else {
    updateUser(formData);
  }
};

const createUser = async (formData: SaveTeamMemberForm) => {
  if (!image.value) {
    isImageError.value = false;
    return;
  }

  try {
    isUpdatingTeamMember.value = true;
    const message = await createTeamMember(formData, image.value);
    updateImage();
    if (message) {
      showToast(message);
    }
    if (teamMember.value?.id) {
      navigateToNewTeamMember(teamMember.value.id);
    }
  } catch (error) {
    if (error instanceof Error) {
      showToast(error.message, false);
    }
  } finally {
    isUpdatingTeamMember.value = false;
  }
};

const updateUser = async (formData: SaveTeamMemberForm) => {
  if (!image.value) {
    isImageError.value = false;
    return;
  }

  if (!routeUserId.value) {
    return;
  }

  try {
    isUpdatingTeamMember.value = true;
    const message = await saveTeamMember(
      routeUserId.value,
      formData,
      image.value
    );
    if (teamMember.value?.image) {
      updateImage();
    }
    if (message) {
      showToast(message);
    }
  } catch (error) {
    if (error instanceof Error) {
      showToast(error.message, false);
    }
  } finally {
    isUpdatingTeamMember.value = false;
  }
};

const router = useRouter();

const navigateToNewTeamMember = async (teamMemberId: number) => {
  router.push({
    name: TEAM_MEMBER_ROUTE,
    params: { id: teamMemberId },
  });
};

const navigateToTeamMembersPage = async () => {
  router.push({
    name: HOME_ROUTE,
  });
};

const image = ref<ImageI | null>(null);
const isRemovingImage = ref(false);

function handleFiles(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    for (const file of target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        image.value = {
          src: e.target!.result as string,
          file,
          publicId: null,
        };
      };
      reader.readAsDataURL(file);
    }
  }
}

const handleDeleteTeamMember = async () => {
  if (!teamMember.value || !teamMember.value.id) {
    return;
  }

  try {
    isDeletingTeamMember.value = true;
    const message = await deleteTeamMember({
      teamMemberId: teamMember.value.id,
      isClient: true,
      isAuth: true,
    });

    showToast(message ?? "");
    navigateToTeamMembersPage();
  } catch (error) {
    if (error instanceof Error) {
      showToast(error.message, false);
    }
  } finally {
    isDeletingTeamMember.value = false;
  }
};

const initialValues = computed(() => {
  return manageTeamMemberConfiguration.fields.map((field) => {
    const fieldId = field.id;
    let teamMemberValue = "";

    if (teamMember.value && fieldId in teamMember.value) {
      teamMemberValue = (teamMember.value as any)[fieldId];
    }
    return { id: field.id, initialValue: teamMemberValue };
  });
});
</script>
